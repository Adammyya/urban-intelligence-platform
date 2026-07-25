import { create } from 'zustand';

type AIState = 'IDLE' | 'MONITORING' | 'ANALYZING' | 'PREDICTING' | 'EMERGENCY';

interface UIState {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  activePanel: 'MAP' | 'ANALYTICS' | 'SETTINGS' | 'SENSORS';
  aiState: AIState;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setActivePanel: (panel: 'MAP' | 'ANALYTICS' | 'SETTINGS' | 'SENSORS') => void;
  setAIState: (state: AIState) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isDarkMode: true,
  activePanel: 'MAP',
  aiState: 'MONITORING',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setAIState: (aiState) => set({ aiState })
}));
