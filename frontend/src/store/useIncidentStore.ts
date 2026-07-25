import { create } from 'zustand';

export interface Incident {
  id: string;
  type: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  lat: number;
  lng: number;
  description: string;
  timestamp: number;
}

interface IncidentState {
  incidents: Incident[];
  selectedIncident: Incident | null;
  isLoading: boolean;
  error: string | null;
  setIncidents: (incidents: Incident[]) => void;
  setSelectedIncident: (incident: Incident | null) => void;
  fetchIncidents: () => Promise<void>;
}

export const useIncidentStore = create<IncidentState>((set) => ({
  incidents: [],
  selectedIncident: null,
  isLoading: false,
  error: null,
  
  setIncidents: (incidents) => set({ incidents }),
  setSelectedIncident: (incident) => set({ selectedIncident: incident }),
  
  fetchIncidents: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetching from the Core Backend REST API
      const API_URL = import.meta.env.VITE_CORE_API_URL || 'http://localhost:8080';
      const res = await fetch(`${API_URL}/api/v1/incidents`);
      if (!res.ok) throw new Error('Failed to fetch incidents from Core Backend');
      
      const data = await res.json();
      set({ incidents: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      console.error('[SYNAPSE UI] Backend connection failed:', err);
    }
  }
}));
