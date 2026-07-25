const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-Memory Database Simulation
const incidents = [
  { id: "INC-991", type: "POWER_GRID_FAILURE", severity: "CRITICAL", lat: 40.7128, lng: -74.0060, description: "Sector 7 Substation cascading failure detected. 40,000 without power.", timestamp: Date.now() },
  { id: "INC-992", type: "TRAFFIC_COLLISION", severity: "WARNING", lat: 40.7300, lng: -73.9900, description: "Multi-vehicle collision blocking 3 lanes on Route 4.", timestamp: Date.now() },
  { id: "INC-993", type: "AIR_TOXICITY", severity: "CRITICAL", lat: 40.7145, lng: -74.0080, description: "Chemical spill detected at industrial park. PM2.5 levels exceeding safe limits.", timestamp: Date.now() }
];

app.get('/api/v1/incidents', (req, res) => {
  res.json(incidents);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`[SYNAPSE CORE BACKEND] REST API running natively on port ${PORT}`);
  console.log(`[SYNAPSE CORE BACKEND] Seeded mock incidents into in-memory store.`);
});
