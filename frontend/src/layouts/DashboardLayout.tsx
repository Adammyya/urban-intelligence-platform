import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';
import CommandPalette from '../components/common/CommandPalette';
import { useUIStore } from '../store/useUIStore';

const DashboardLayout = () => {
  const isDarkMode = useUIStore(state => state.isDarkMode);

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
