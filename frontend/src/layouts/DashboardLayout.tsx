import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';
import CommandPalette from '../components/common/CommandPalette';
import { useUIStore } from '../store/useUIStore';
import { useSensorStore } from '../store/useSensorStore';
import { useIncidentStore } from '../store/useIncidentStore';

const DashboardLayout = () => {
  const isDarkMode = useUIStore(state => state.isDarkMode);
  const initializeUplink = useSensorStore(state => state.initializeUplink);
  const fetchIncidents = useIncidentStore(state => state.fetchIncidents);

  useEffect(() => {
    // Connect to the Event Broker when the OS shell boots
    initializeUplink();
    // Fetch persistent data from the Core Backend REST API
    fetchIncidents();
  }, [initializeUplink, fetchIncidents]);

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${isDarkMode ? 'dark bg-os-graphite text-white' : 'bg-gray-50 text-gray-900'} font-sans`}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar />
        <main className="flex-1 overflow-auto relative z-0">
          <Outlet />
        </main>
      </div>
      
      {/* Global Command Palette */}
      <CommandPalette />
    </div>
  );
};

export default DashboardLayout;
