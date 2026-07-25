import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSensorStore } from '../../store/useSensorStore';
import { useIncidentStore } from '../../store/useIncidentStore';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom semantic icons using DivIcon for Tailwind styling
const createPulsingIcon = (colorClass: string) => L.divIcon({
  className: 'custom-div-icon bg-transparent border-0',
  html: `
    <div class="relative w-6 h-6 flex items-center justify-center">
      <div class="absolute inset-0 rounded-full ${colorClass} opacity-40 animate-ping"></div>
      <div class="w-2.5 h-2.5 rounded-full ${colorClass} shadow-[0_0_12px_currentColor]"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const sensorIcon = createPulsingIcon('bg-traffic-cyan');
const incidentIcon = createPulsingIcon('bg-alert-crimson');
const userIcon = createPulsingIcon('bg-infra-emerald');

// Component to programmatically update map center
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const LiveMapWidget = () => {
  const sensors = useSensorStore(state => state.sensors);
  const incidents = useIncidentStore(state => state.incidents);
  const setSelectedSensor = useSensorStore(state => state.setSelectedSensor);
  const setActiveIncident = useIncidentStore(state => state.setActiveIncident);

  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]); // Default NYC
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: [number, number] = [position.coords.latitude, position.coords.longitude];
          setMapCenter(loc);
          setUserLocation(loc);
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-os-graphite">
      
      {/* Map Layer */}
      <MapContainer 
        center={mapCenter} 
        zoom={14} 
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full"
      >
        <MapUpdater center={mapCenter} />

        {/* Dark theme tile layer - CartoDB Dark Matter */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Render User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup className="custom-popup border-0 bg-transparent">
              <div className="bg-os-panel/90 backdrop-blur-md p-3 border border-infra-emerald/30 rounded-lg shadow-2xl">
                <strong className="text-infra-emerald block mb-1 font-mono tracking-widest text-xs">UPLINK ACTIVE</strong>
                <span className="text-white text-xs">Local GPS Node</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Render sensors */}
        {sensors.map(sensor => (
          <Marker 
            key={`sensor-${sensor.id}`} 
            position={[sensor.lat, sensor.lng]} 
            icon={sensorIcon}
            eventHandlers={{
              click: () => setSelectedSensor(sensor)
            }}
          >
            <Popup className="custom-popup border-0 bg-transparent">
              <div className="bg-os-panel/90 backdrop-blur-md p-3 border border-traffic-cyan/30 rounded-lg shadow-2xl">
                <strong className="text-traffic-cyan block mb-1 font-mono tracking-widest text-xs">{sensor.id}</strong>
                <div className="text-gray-300 text-xs">TYPE: {sensor.type}</div>
                <div className="text-gray-300 text-xs">STATUS: <span className="text-white">{sensor.status}</span></div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render incidents */}
        {incidents.map(incident => (
          <Marker 
            key={`incident-${incident.id}`} 
            position={[incident.lat, incident.lng]} 
            icon={incidentIcon}
            eventHandlers={{
              click: () => setActiveIncident(incident)
            }}
          >
            <Popup className="custom-popup border-0 bg-transparent">
              <div className="bg-os-panel/90 backdrop-blur-md p-3 border border-alert-crimson/30 rounded-lg shadow-2xl">
                <strong className="text-alert-crimson block mb-1 font-mono tracking-widest text-xs">INCIDENT {incident.id}</strong>
                <div className="text-gray-300 text-xs">TYPE: {incident.type}</div>
                <div className="text-gray-300 text-xs">SEVERITY: <span className="text-white">{incident.severity}</span></div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Mock Heatmap overlay representation using circles */}
        <CircleMarker center={[40.7128, -74.0060]} radius={150} pathOptions={{ color: '#00f0ff', fillColor: '#00f0ff', fillOpacity: 0.05, stroke: true, weight: 1, dashArray: '4 6' }} />
        <CircleMarker center={[40.7150, -74.0100]} radius={80} pathOptions={{ color: '#ff2a2a', fillColor: '#ff2a2a', fillOpacity: 0.1, stroke: false }} />

      </MapContainer>

      {/* OVERLAYS FOR DIGITAL TWIN FEEL */}
      
      {/* 1. CRT Scanline Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* 2. Horizontal Scanning Line */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 w-full h-[2px] bg-traffic-cyan/40 shadow-[0_0_20px_rgba(0,240,255,0.8)] z-10 pointer-events-none"
      />

      {/* 3. Sweeping Radar Arc (Centered) */}
      <div className="absolute inset-0 m-auto w-[600px] h-[600px] pointer-events-none z-10 rounded-full border border-traffic-cyan/10 overflow-hidden opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full rounded-full"
          style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 240, 255, 0.2) 100%)' }}
        />
        {/* Radar Rings */}
        <div className="absolute inset-0 m-auto w-[400px] h-[400px] rounded-full border border-traffic-cyan/10 border-dashed" />
        <div className="absolute inset-0 m-auto w-[200px] h-[200px] rounded-full border border-traffic-cyan/10" />
      </div>

    </div>
  );
};

export default LiveMapWidget;
