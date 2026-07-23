# SYNAPSE UI Wireframes

The SYNAPSE Command Center utilizes a modern, edge-to-edge layout designed for high-density information display.

## Layout Overview

```text
+-----------------------------------------------------------------------------------------+
| [LOGO] SYNAPSE | Search Location/Sensor...       | Weather: 72°F | 14:05:22 | [BELL] [USER] |
+----------------+------------------------------------------------------------------------+
| Dashboard      |                                                                        |
| Live Map       |  +------------------------------------------------------------------+  |
| Traffic        |  |                                                                  |  |
| Sensors        |  |                                                                  |  |
| Predictions    |  |                      LIVE MAP WIDGET                             |  |
| Analytics      |  |                (Interactive Leaflet Map)                         |  |
| Incidents      |  |                - Heatmap Overlays                                |  |
| AI Models      |  |                - Sensor Ping Markers                             |  |
| Reports        |  |                - Incident Polygons                               |  |
| Alerts         |  |                                                                  |  |
| Settings       |  +------------------------------------------------------------------+  |
|                |                                                                        |
|                |  +-----------------+ +-----------------+ +--------------------------+  |
|                |  | AI PREDICTION   | | ACTIVE ALERT    | | SYSTEM HEALTH            |  |
|                |  | Congestion Prob | | Route 101 Crash | | API: 99.9% Up            |  |
|                |  | 87% (+12%)      | | Severity: HIGH  | | ML Engine: Optimal       |  |
|                |  | [Chart Line]    | | [Action Needed] | | Sensors: 1042/1050 On    |  |
|                |  +-----------------+ +-----------------+ +--------------------------+  |
+----------------+------------------------------------------------------------------------+
```

## Component Breakdowns

### 1. Left Sidebar
- **Behavior**: Collapsible to maximize map space.
- **Style**: Deep dark translucent background (Glassmorphism), active state highlighted with Neon Purple accent bar.

### 2. Top Navigation Bar
- **Search**: Global search for sensors, intersections, or incident IDs.
- **Weather Module**: Real-time integration (vital for traffic prediction).
- **Clock**: High-precision system time (important for incident chronologies).

### 3. Main Stage (Live Map)
- **Base Layer**: Dark-mode vector tiles (similar to Mapbox dark).
- **Overlays**: 
  - Dynamic traffic congestion paths (Green/Yellow/Orange/Neon Red).
  - Glowing node points for active IoT sensors.
  - Pulsing markers for active incidents.

### 4. Intelligence Panels (Bottom Row)
- **Glassmorphism Cards**: Hovering slightly over the map background, blurred backdrop.
- **Prediction Card**: Shows the immediate AI output for the currently focused region.
- **Alert Card**: Real-time WebSocket pushed alerts requiring Operator attention.
- **System Health**: Quick diagnostic view of the microservices.
