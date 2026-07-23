import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  activePanel: 'MAP' | 'ANALYTICS' | 'SETTINGS' | 'SENSORS';
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  setActivePanel: (panel: 'MAP' | 'ANALYTICS' | 'SETTINGS' | 'SENSORS') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  isDarkMode: true,
  activePanel: 'MAP',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setActivePanel: (panel) => set({ activePanel: panel })
}));
