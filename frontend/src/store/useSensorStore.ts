import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export interface Sensor {
  id: string;
  type: string;
  lat: number;
  lng: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'MAINTENANCE';
  battery: number;
}

interface SensorState {
  sensors: Sensor[];
  selectedSensor: Sensor | null;
  isLoading: boolean;
  socket: Socket | null;
  setSensors: (sensors: Sensor[]) => void;
  setSelectedSensor: (sensor: Sensor | null) => void;
  setLoading: (loading: boolean) => void;
  initializeUplink: () => void;
}

export const useSensorStore = create<SensorState>((set, get) => ({
  sensors: [],
  selectedSensor: null,
  isLoading: true,
  socket: null,
  
  setSensors: (sensors) => set({ sensors }),
  setSelectedSensor: (sensor) => set({ selectedSensor: sensor }),
  setLoading: (loading) => set({ isLoading: loading }),

  initializeUplink: () => {
    // Prevent multiple connections
    if (get().socket) return;

    set({ isLoading: true });
    
    // Connect to the lightweight Node.js Event Broker
    const WS_URL = import.meta.env.VITE_WS_BROKER_URL || 'http://localhost:4000';
    const newSocket = io(WS_URL);

    newSocket.on('connect', () => {
      console.log('[SYNAPSE UI] Uplink established to Event Broker.');
    });

    // Initial sync
    newSocket.on('telemetry_sync', (data: Sensor[]) => {
      set({ sensors: data, isLoading: false });
    });

    // Live updates (every 2 seconds)
    newSocket.on('telemetry_update', (data: Sensor[]) => {
      set({ sensors: data });
    });

    set({ socket: newSocket });
  }
}));
