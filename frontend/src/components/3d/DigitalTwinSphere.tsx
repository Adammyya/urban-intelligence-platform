import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { useSensorStore } from '../../store/useSensorStore';

// Converts lat/lng to 3D Cartesian coordinates on a sphere
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new THREE.Vector3(x, y, z);
};

// The main rotating globe component
const HolographicGlobe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sensors = useSensorStore(state => state.sensors);

  // Slowly rotate the entire globe
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core solid sphere (dark, slight glow) */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          emissive="#111111"
          transparent 
          opacity={0.8}
        />
      </Sphere>

      {/* Outer wireframe sphere (Holographic grid) */}
      <Sphere args={[2.02, 32, 32]}>
        <meshBasicMaterial 
          color="#00f0ff" // traffic-cyan
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial 
          color="#a020f0" // ai-violet
          transparent 
          opacity={0.05} 
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Sensor Data Points mapped to the globe surface */}
      {sensors.map((sensor) => {
        // Map realistic NY coordinates to the globe (scale them so they don't all cluster in one tiny spot)
        // Since all mock sensors are clustered around NY (Lat 40.7, Lng -74.0), 
        // we'll multiply them out slightly just for visual dramatic effect on the globe.
        const visualLat = (sensor.lat - 40.7) * 50 + 40; 
        const visualLng = (sensor.lng + 74.0) * 50 - 74;

        const pos = latLngToVector3(visualLat, visualLng, 2.03);
        const isCritical = sensor.battery < 20;

        return (
          <mesh key={sensor.id} position={pos}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial 
              color={isCritical ? "#ff2a2a" : "#00f0ff"} 
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};

const DigitalTwinSphere = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a020f0" />
        
        {/* Starfield background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <HolographicGlobe />
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default DigitalTwinSphere;
