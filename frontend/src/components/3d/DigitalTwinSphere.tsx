import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useSensorStore } from '../../store/useSensorStore';
import { useCityEventStore } from '../../store/useCityEventStore';

const GLOBE_RADIUS = 2;

// ─── Utility ─────────────────────────────────────────────
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// ─── Road Network (Animated Arcs) ─────────────────────────
const cityNodes = [
  { lat: 40.71, lng: -74.00 },  // Downtown
  { lat: 40.75, lng: -73.98 },  // Midtown
  { lat: 40.78, lng: -73.96 },  // Upper East
  { lat: 40.73, lng: -73.94 },  // East Side
  { lat: 40.69, lng: -74.02 },  // Industrial
  { lat: 40.76, lng: -74.00 },  // West Side
  { lat: 40.80, lng: -73.95 },  // Uptown
  { lat: 40.70, lng: -73.97 },  // South District
];

const routes = [
  [0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 5], [2, 6], [3, 7],
  [4, 5], [5, 6], [6, 7], [7, 4], [0, 6], [1, 3], [4, 2], [5, 7],
];

const RoadNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);

  const arcGeometries = useMemo(() => {
    return routes.map(([fromIdx, toIdx]) => {
      const from = cityNodes[fromIdx];
      const to = cityNodes[toIdx];
      // Spread coordinates across the globe for visual impact
      const fromVec = latLngToVector3((from.lat - 40.7) * 80 + 20, (from.lng + 74.0) * 80 - 40, GLOBE_RADIUS + 0.02);
      const toVec = latLngToVector3((to.lat - 40.7) * 80 + 20, (to.lng + 74.0) * 80 - 40, GLOBE_RADIUS + 0.02);

      // Create arc via midpoint elevated above the sphere
      const mid = fromVec.clone().add(toVec).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + 0.15); // Lift arc above surface

      const curve = new THREE.QuadraticBezierCurve3(fromVec, mid, toVec);
      const points = curve.getPoints(32);
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  return (
    <group ref={groupRef}>
      {arcGeometries.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial color="#00f0ff" transparent opacity={0.12} />
        </line>
      ))}
    </group>
  );
};

// ─── Traffic Packets (Moving along arcs) ──────────────────
const TrafficPackets = () => {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const progressRef = useRef<number[]>(routes.map(() => Math.random()));

  const curves = useMemo(() => {
    return routes.map(([fromIdx, toIdx]) => {
      const from = cityNodes[fromIdx];
      const to = cityNodes[toIdx];
      const fromVec = latLngToVector3((from.lat - 40.7) * 80 + 20, (from.lng + 74.0) * 80 - 40, GLOBE_RADIUS + 0.02);
      const toVec = latLngToVector3((to.lat - 40.7) * 80 + 20, (to.lng + 74.0) * 80 - 40, GLOBE_RADIUS + 0.02);
      const mid = fromVec.clone().add(toVec).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(GLOBE_RADIUS + 0.15);
      return new THREE.QuadraticBezierCurve3(fromVec, mid, toVec);
    });
  }, []);

  useFrame((_, delta) => {
    curves.forEach((curve, i) => {
      progressRef.current[i] = (progressRef.current[i] + delta * (0.15 + i * 0.01)) % 1;
      const mesh = meshRefs.current[i];
      if (mesh) {
        const pos = curve.getPoint(progressRef.current[i]);
        mesh.position.copy(pos);
      }
    });
  });

  return (
    <>
      {curves.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) meshRefs.current[i] = el; }}
        >
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshBasicMaterial color="#00f0ff" toneMapped={false} />
        </mesh>
      ))}
    </>
  );
};

// ─── Sensor Pulse Rings ───────────────────────────────────
const SensorPulse = ({ position, isCritical }: { position: THREE.Vector3; isCritical: boolean }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const phaseRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (ringRef.current) {
      const t = (Math.sin(state.clock.elapsedTime * 2 + phaseRef.current) + 1) * 0.5;
      ringRef.current.scale.setScalar(1 + t * 0.8);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 * (1 - t);
    }
  });

  const color = isCritical ? '#ff2a2a' : '#00f0ff';

  return (
    <group position={position}>
      {/* Core dot */}
      <mesh>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      {/* Expanding pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.03, 0.045, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
};

// ─── Prediction Scan Wave (Radar Sweep) ───────────────────
const PredictionScanWave = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[GLOBE_RADIUS + 0.03, 64, 64, 0, Math.PI * 0.15, 0, Math.PI]} />
      <meshBasicMaterial
        color="#a020f0"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// ─── Emergency Ripple ─────────────────────────────────────
const EmergencyRipple = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  const emergencyPulse = useCityEventStore(state => state.emergencyPulseActive);
  const scaleRef = useRef(0);

  useFrame((_, delta) => {
    if (ringRef.current) {
      if (emergencyPulse) {
        scaleRef.current = Math.min(scaleRef.current + delta * 2, 3);
      } else {
        scaleRef.current = Math.max(scaleRef.current - delta * 1.5, 0);
      }
      ringRef.current.scale.setScalar(1 + scaleRef.current);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 * (1 - scaleRef.current / 3);
    }
  });

  return (
    <mesh ref={ringRef}>
      <sphereGeometry args={[GLOBE_RADIUS + 0.05, 32, 32]} />
      <meshBasicMaterial
        color="#ff2a2a"
        transparent
        opacity={0}
        side={THREE.FrontSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// ─── Floating Particle Field ──────────────────────────────
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = GLOBE_RADIUS + 0.3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a020f0"
        size={0.008}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// ─── District Breathing Sectors ───────────────────────────
const DistrictSectors = () => {
  const refs = useRef<THREE.Mesh[]>([]);

  const sectors = useMemo(() => {
    // Create 6 sectors at different positions around the globe
    return [0, 1, 2, 3, 4, 5].map(i => {
      const phiStart = (i / 6) * Math.PI * 2;
      return { phiStart, phiLength: Math.PI * 0.28, thetaStart: Math.PI * 0.3, thetaLength: Math.PI * 0.4 };
    });
  }, []);

  useFrame((state) => {
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        const breathe = Math.sin(state.clock.elapsedTime * 0.5 + i * 1.2) * 0.5 + 0.5;
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0.02 + breathe * 0.04;
      }
    });
  });

  const colors = ['#00f0ff', '#a020f0', '#10b981', '#ff9900', '#ff2a2a', '#3b82f6'];

  return (
    <>
      {sectors.map((s, i) => (
        <mesh key={i} ref={(el) => { if (el) refs.current[i] = el; }}>
          <sphereGeometry args={[GLOBE_RADIUS + 0.01, 32, 32, s.phiStart, s.phiLength, s.thetaStart, s.thetaLength]} />
          <meshBasicMaterial
            color={colors[i]}
            transparent
            opacity={0.03}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
};

// ─── The Complete Globe Assembly ──────────────────────────
const HolographicGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sensors = useSensorStore(state => state.sensors);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0008;
    }
  });

  const sensorPositions = useMemo(() => {
    return sensors.map(sensor => ({
      id: sensor.id,
      position: latLngToVector3(
        (sensor.lat - 40.7) * 50 + 40,
        (sensor.lng + 74.0) * 50 - 74,
        GLOBE_RADIUS + 0.03
      ),
      isCritical: sensor.battery < 20,
    }));
  }, [sensors]);

  return (
    <group ref={groupRef}>
      {/* Core Dark Sphere */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshStandardMaterial color="#080808" emissive="#0a0a0a" transparent opacity={0.9} />
      </Sphere>

      {/* Primary Wireframe Grid */}
      <Sphere args={[GLOBE_RADIUS + 0.005, 48, 48]}>
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.06} />
      </Sphere>

      {/* Secondary Fine Grid */}
      <Sphere args={[GLOBE_RADIUS + 0.01, 24, 24]}>
        <meshBasicMaterial color="#a020f0" wireframe transparent opacity={0.03} />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere args={[GLOBE_RADIUS + 0.12, 32, 32]}>
        <meshBasicMaterial color="#a020f0" transparent opacity={0.04} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </Sphere>

      {/* District Breathing Sectors */}
      <DistrictSectors />

      {/* Road Network */}
      <RoadNetwork />

      {/* Traffic Packets */}
      <TrafficPackets />

      {/* Sensor Pulse Nodes */}
      {sensorPositions.map(s => (
        <SensorPulse key={s.id} position={s.position} isCritical={s.isCritical} />
      ))}

      {/* Prediction Scan Wave */}
      <PredictionScanWave />

      {/* Emergency Ripple */}
      <EmergencyRipple />
    </group>
  );
};

// ─── Main Export ──────────────────────────────────────────
const DigitalTwinSphere = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#050505']} />

        {/* Cinematic Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#a020f0" />
        <pointLight position={[0, 10, -5]} intensity={0.3} color="#10b981" />

        {/* Starfield */}
        <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={0.8} />

        {/* The Living Globe */}
        <HolographicGlobe />

        {/* Ambient Particle Cloud */}
        <ParticleField />

        {/* Post-Processing: Bloom for volumetric glow */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default DigitalTwinSphere;
