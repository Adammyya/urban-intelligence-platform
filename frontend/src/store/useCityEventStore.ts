import { create } from 'zustand';

export type CityEventType = 
  | 'INCIDENT'
  | 'SENSOR_ALERT'
  | 'PREDICTION'
  | 'TRAFFIC'
  | 'EMERGENCY_DISPATCH'
  | 'WEATHER'
  | 'AI_OBSERVATION'
  | 'INFRASTRUCTURE';

export interface CityEvent {
  id: string;
  type: CityEventType;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  lat: number;
  lng: number;
  timestamp: number;
}

interface CityEventState {
  events: CityEvent[];
  latestEvent: CityEvent | null;
  // Reactive flags that components can subscribe to
  emergencyPulseActive: boolean;
  aiStateOverride: string | null;
  pushEvent: (event: Omit<CityEvent, 'id' | 'timestamp'>) => void;
  clearEvents: () => void;
}

let eventCounter = 0;

export const useCityEventStore = create<CityEventState>((set, get) => ({
  events: [],
  latestEvent: null,
  emergencyPulseActive: false,
  aiStateOverride: null,

  pushEvent: (eventData) => {
    const newEvent: CityEvent = {
      ...eventData,
      id: `evt-${++eventCounter}`,
      timestamp: Date.now(),
    };

    set(state => ({
      events: [newEvent, ...state.events].slice(0, 50), // Keep last 50 events
      latestEvent: newEvent,
      emergencyPulseActive: eventData.severity === 'CRITICAL',
      aiStateOverride: eventData.severity === 'CRITICAL' ? 'EMERGENCY' : 
                       eventData.type === 'PREDICTION' ? 'PREDICTING' :
                       eventData.type === 'AI_OBSERVATION' ? 'ANALYZING' : null,
    }));

    // Auto-clear emergency pulse after 3 seconds
    if (eventData.severity === 'CRITICAL') {
      setTimeout(() => {
        set({ emergencyPulseActive: false });
      }, 3000);
    }

    // Auto-clear AI state override after 5 seconds
    if (get().aiStateOverride) {
      setTimeout(() => {
        set({ aiStateOverride: null });
      }, 5000);
    }
  },

  clearEvents: () => set({ events: [], latestEvent: null }),
}));

// Auto-generate simulated city events to make the system feel alive
let simulationInterval: ReturnType<typeof setInterval> | null = null;

export const startCitySimulation = () => {
  if (simulationInterval) return;

  const eventTemplates: Omit<CityEvent, 'id' | 'timestamp'>[] = [
    { type: 'TRAFFIC', severity: 'INFO', title: 'Congestion detected', description: 'Route 4 experiencing 12min delays. Rerouting recommended.', lat: 40.73, lng: -73.99 },
    { type: 'AI_OBSERVATION', severity: 'INFO', title: 'Pattern anomaly', description: 'Unusual pedestrian density in Sector 7. Monitoring escalated.', lat: 40.75, lng: -73.97 },
    { type: 'SENSOR_ALERT', severity: 'WARNING', title: 'Sensor degradation', description: 'Air quality station AQ-14 reporting intermittent readings.', lat: 40.71, lng: -74.01 },
    { type: 'PREDICTION', severity: 'WARNING', title: 'Grid stress forecast', description: 'Power grid load predicted to exceed 92% within 45 minutes.', lat: 40.74, lng: -73.98 },
    { type: 'EMERGENCY_DISPATCH', severity: 'CRITICAL', title: 'Emergency response', description: 'Fire unit dispatched to industrial zone. ETA 4 minutes.', lat: 40.72, lng: -74.00 },
    { type: 'WEATHER', severity: 'INFO', title: 'Weather advisory', description: 'Wind speed increasing to 35mph. Infrastructure alert raised.', lat: 40.76, lng: -73.96 },
    { type: 'INFRASTRUCTURE', severity: 'INFO', title: 'Maintenance window', description: 'Water main inspection scheduled for District 3 at 0400.', lat: 40.70, lng: -74.02 },
    { type: 'AI_OBSERVATION', severity: 'WARNING', title: 'Behavioral deviation', description: 'Traffic pattern 14% outside normal bounds. Cross-referencing CCTV.', lat: 40.73, lng: -73.95 },
  ];

  simulationInterval = setInterval(() => {
    const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
    // Add slight coordinate randomization
    const event = {
      ...template,
      lat: template.lat + (Math.random() - 0.5) * 0.02,
      lng: template.lng + (Math.random() - 0.5) * 0.02,
    };
    useCityEventStore.getState().pushEvent(event);
  }, 8000); // New event every 8 seconds
};

export const stopCitySimulation = () => {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
};
