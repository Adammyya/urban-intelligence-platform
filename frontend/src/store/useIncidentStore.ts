import { create } from 'zustand';

export interface Incident {
  id: string;
  type: 'CONGESTION' | 'ACCIDENT' | 'MAINTENANCE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  lat: number;
  lng: number;
  description: string;
  isActive: boolean;
}

interface IncidentState {
  incidents: Incident[];
  activeIncident: Incident | null;
  setIncidents: (incidents: Incident[]) => void;
  setActiveIncident: (incident: Incident | null) => void;
}

export const useIncidentStore = create<IncidentState>((set) => ({
  incidents: [
    {
      id: 'INC-991',
      type: 'CONGESTION',
      severity: 'HIGH',
      lat: 40.7135,
      lng: -74.0070,
      description: 'Heavy traffic buildup detected.',
      isActive: true
    }
  ],
  activeIncident: null,
  setIncidents: (incidents) => set({ incidents }),
  setActiveIncident: (incident) => set({ activeIncident: incident })
}));
