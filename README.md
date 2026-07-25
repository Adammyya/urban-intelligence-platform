<div align="center">
  <img src="https://img.shields.io/badge/STATUS-ACTIVE_DEVELOPMENT-success?style=for-the-badge&color=A020F0" alt="Status" />
  <img src="https://img.shields.io/badge/ARCHITECTURE-POLYGLOT_MICROSERVICES-blue?style=for-the-badge&color=00F0FF" alt="Architecture" />
  <img src="https://img.shields.io/badge/UI-HOLOGRAPHIC_OS-white?style=for-the-badge&color=111111" alt="UI" />
  
  <br />
  <br />
  
  <h1>S Y N A P S E</h1>
  <p><b>Enterprise-Grade Urban Intelligence Operating System</b></p>
  
  <p>
    An event-driven, full-stack microservice architecture built to monitor, predict, and manage smart-city infrastructure in real-time.
  </p>
</div>

---

## 🌐 Overview

**SYNAPSE** is a flagship portfolio project demonstrating advanced full-stack engineering, distributed systems, and real-time data streaming. 

Designed to mimic software used by governments, emergency response centers, and smart-city command hubs (e.g., Palantir Gotham, Tesla Fleet), SYNAPSE features a "Holographic OS" interface powered by a decoupled, polyglot backend.

## 🏗️ Polyglot Microservice Architecture

The platform operates on a distributed architecture consisting of 4 independent microservices communicating in real-time:

1. **The OS Shell (React + Vite)**: A stunning, dark-mode graphical user interface. Manages global state using Zustand and renders highly interactive data visualizations and maps using Framer Motion and Leaflet.
2. **The Event Broker (Node.js + WebSockets)**: A lightweight `Socket.io` pipeline that handles high-frequency telemetry. It simulates thousands of IoT sensors and blasts live coordinates and battery levels to the UI.
3. **The Core REST API (Node.js + Express)**: A dedicated backend that handles traditional HTTP requests for persistent data (e.g., historical emergency incidents and system topology).
4. **The Neural Inference Engine (Python)**: An AI microservice that consumes active city state and calculates the probability of cascading failures using heuristic ML algorithms.

---

## ✨ Key Features

- **Real-Time Telemetry Pipeline**: Watch IoT sensor battery levels deplete and GPS coordinates drift live on the screen without ever refreshing the page.
- **Dynamic AI Predictions**: Radial progress gauges fetch live impact probabilities from the Python engine, complete with glassmorphism hover-state tooltips.
- **Global Intel Feed**: Integrates with live, real-world APIs (BBC World News via RSS2JSON) to stream authentic global events directly into the OS shell.
- **Holographic UI/UX**: Built with enterprise-grade design principles. Features tailored color palettes (Graphite, Traffic Cyan, AI Violet), staggered mount animations, and deep component modularity.
- **Decoupled State Management**: The UI is entirely abstracted from the data layer using Zustand, allowing seamless swapping of backend infrastructure.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React 18 (Vite)
- **Styling**: TailwindCSS, CSS Variables (Custom Design System)
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Mapping**: Leaflet, React-Leaflet
- **Icons**: Lucide React

### Backend (Infrastructure)
- **Event Streaming**: Node.js, Express, Socket.io
- **Core API**: Node.js, Express
- **AI/ML Engine**: Python 3.8+ (http.server)

---

## 🚀 Getting Started

To run the entire SYNAPSE ecosystem locally, you will need to start all four microservices.

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)

### 1. Start the React OS Shell
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 2. Start the WebSocket Event Broker
```bash
cd city-simulator
npm install
node broker.js
# Runs on http://localhost:4000
```

### 3. Start the Core REST API
```bash
cd core-backend
npm install
node server.js
# Runs on http://localhost:8080
```

### 4. Start the Python AI Engine
```bash
cd ai-engine
python ai_engine.py
# Runs on http://localhost:5000
```

---

## 📐 AI Agent Configuration Principles
This project was strictly developed following world-class engineering roles:
- **Solution Architect**: Ensuring scalable folder structures, clean code, and microservice decoupling.
- **UI/UX Designer**: Prioritizing modern typography, micro-interactions, and premium aesthetics.
- **Performance Engineer**: Optimizing component re-renders and handling high-throughput WebSocket streams gracefully.

---
*Built as a demonstration of production-quality software engineering and modern system architecture.*
