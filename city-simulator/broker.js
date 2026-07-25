const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Initial Mock State
let sensors = [
  { id: 'S-101', type: 'TRAFFIC_CAMERA', lat: 40.7128, lng: -74.0060, status: 'ACTIVE', battery: 95 },
  { id: 'S-102', type: 'AIR_QUALITY', lat: 40.7145, lng: -74.0080, status: 'ACTIVE', battery: 82 },
  { id: 'S-103', type: 'GRID_MONITOR', lat: 40.7160, lng: -74.0120, status: 'ACTIVE', battery: 100 },
  { id: 'S-104', type: 'WATER_LEVEL', lat: 40.7100, lng: -74.0000, status: 'MAINTENANCE', battery: 15 },
  { id: 'S-105', type: 'TRAFFIC_CAMERA', lat: 40.7300, lng: -73.9900, status: 'ERROR', battery: 0 }
];

io.on('connection', (socket) => {
  console.log(`[+] Client connected: ${socket.id}`);

  // Send initial state immediately upon connection
  socket.emit('telemetry_sync', sensors);

  socket.on('disconnect', () => {
    console.log(`[-] Client disconnected: ${socket.id}`);
  });
});

// Telemetry Simulator Loop
setInterval(() => {
  // Simulate live data changes
  sensors = sensors.map(sensor => {
    // Only update active sensors
    if (sensor.status !== 'ACTIVE') return sensor;

    // Simulate minor GPS drift for mobile sensors (e.g., drones) or just data fluctuation
    const newLat = sensor.lat + (Math.random() - 0.5) * 0.0001;
    const newLng = sensor.lng + (Math.random() - 0.5) * 0.0001;
    
    // Simulate battery drain
    const newBattery = Math.max(0, sensor.battery - Math.random() * 0.5);

    return { ...sensor, lat: newLat, lng: newLng, battery: newBattery };
  });

  // Broadcast the update to all connected frontend clients
  io.emit('telemetry_update', sensors);
}, 2000); // Blast data every 2 seconds

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`[SYNAPSE EVENT BROKER] Running on port ${PORT}`);
  console.log(`[SYNAPSE EVENT BROKER] Broadcasting telemetry at 2000ms intervals...`);
});
