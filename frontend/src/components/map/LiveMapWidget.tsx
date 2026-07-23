import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSensorStore } from '../../store/useSensorStore';
import { useIncidentStore } from '../../store/useIncidentStore';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons using standard Leaflet DivIcon for styling via Tailwind
const createPulsingIcon = (colorClass: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-4 h-4 rounded-full ${colorClass} shadow-[0_0_15px_currentColor] animate-pulse"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const sensorIcon = createPulsingIcon('bg-cyber-blue text-cyber-blue');
const incidentIcon = createPulsingIcon('bg-alert-red text-alert-red');

const LiveMapWidget = () => {
  const sensors = useSensorStore(state => state.sensors);
  const incidents = useIncidentStore(state => state.incidents);
  const setSelectedSensor = useSensorStore(state => state.setSelectedSensor);
  const setActiveIncident = useIncidentStore(state => state.setActiveIncident);

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer 
        center={[40.7128, -74.0060]} // NYC
        zoom={14} 
        zoomControl={false}
        className="w-full h-full bg-background-dark"
      >
        {/* Dark theme tile layer - CartoDB Dark Matter */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Render sensors from Zustand global store */}
        {sensors.map(sensor => (
          <Marker 
            key={`sensor-${sensor.id}`} 
            position={[sensor.lat, sensor.lng]} 
            icon={sensorIcon}
            eventHandlers={{
              click: () => setSelectedSensor(sensor)
            }}
          >
            <Popup className="custom-popup">
              <div className="bg-panel-glass p-2 text-white border border-cyber-blue/30 rounded">
                <strong className="text-cyber-blue block mb-1">{sensor.id}</strong>
                Type: {sensor.type}<br/>
                Status: {sensor.status}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render incidents from Zustand global store */}
        {incidents.map(incident => (
          <Marker 
            key={`incident-${incident.id}`} 
            position={[incident.lat, incident.lng]} 
            icon={incidentIcon}
            eventHandlers={{
              click: () => setActiveIncident(incident)
            }}
          >
            <Popup className="custom-popup">
              <div className="bg-panel-glass p-2 text-white border border-alert-red/30 rounded">
                <strong className="text-alert-red block mb-1">Incident Alert</strong>
                Type: {incident.type}<br/>
                Severity: {incident.severity}
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Mock Heatmap overlay representation using circles */}
        <CircleMarker center={[40.7128, -74.0060]} radius={80} pathOptions={{ color: '#ff9900', fillColor: '#ff9900', fillOpacity: 0.1, stroke: false }} />
        <CircleMarker center={[40.7150, -74.0100]} radius={50} pathOptions={{ color: '#ff2a2a', fillColor: '#ff2a2a', fillOpacity: 0.2, stroke: false }} />

      </MapContainer>
    </div>
  );
};

export default LiveMapWidget;
