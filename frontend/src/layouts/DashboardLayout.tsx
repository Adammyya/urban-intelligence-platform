import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';
import CommandPalette from '../components/common/CommandPalette';
import BootSequence from '../components/common/BootSequence';
import { useUIStore } from '../store/useUIStore';
import { useSensorStore } from '../store/useSensorStore';
import { useIncidentStore } from '../store/useIncidentStore';
import { startCitySimulation, stopCitySimulation } from '../store/useCityEventStore';

const DashboardLayout = () => {
  const isDarkMode = useUIStore(state => state.isDarkMode);
  const initializeUplink = useSensorStore(state => state.initializeUplink);
  const fetchIncidents = useIncidentStore(state => state.fetchIncidents);
  
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    initializeUplink();
    fetchIncidents();
    startCitySimulation(); // Begin generating live city events
    return () => stopCitySimulation();
  }, [initializeUplink, fetchIncidents]);

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${isDarkMode ? 'dark bg-os-graphite text-white' : 'bg-gray-50 text-gray-900'} font-sans relative`}>
      {booting && <BootSequence onComplete={() => setBooting(false)} />}
      
      {!booting && (
        <>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <TopBar />
            <main className="flex-1 overflow-hidden relative">
              <Outlet />
            </main>
          </div>
          <CommandPalette />
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
