import { create } from 'zustand';

export interface Sensor {
  id: string;
  type: string;
  lat: number;
  lng: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  lastReading: any;
}

interface SensorState {
  sensors: Sensor[];
  selectedSensor: Sensor | null;
  isLoading: boolean;
  setSensors: (sensors: Sensor[]) => void;
  setSelectedSensor: (sensor: Sensor | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useSensorStore = create<SensorState>((set) => ({
  sensors: [
    {
      id: 'S-101',
      type: 'TRAFFIC_CAMERA',
      lat: 40.7128,
      lng: -74.0060,
      status: 'ACTIVE',
      lastReading: { flow: 'High', congestion: 0.85 }
    },
    {
      id: 'S-102',
      type: 'AIR_QUALITY',
      lat: 40.7145,
      lng: -74.0080,
      status: 'ACTIVE',
      lastReading: { aqi: 45, pm25: 12.5 }
    }
  ], // Initialized with mock data for now
  selectedSensor: null,
  isLoading: false,
  setSensors: (sensors) => set({ sensors }),
  setSelectedSensor: (sensor) => set({ selectedSensor: sensor }),
  setLoading: (loading) => set({ isLoading: loading })
}));
