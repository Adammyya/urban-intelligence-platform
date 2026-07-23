import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';
import { useUIStore } from '../store/useUIStore';

const DashboardLayout = () => {
  const isDarkMode = useUIStore(state => state.isDarkMode);

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${isDarkMode ? 'bg-background-dark text-white' : 'bg-gray-100 text-gray-900'} font-sans`}>
      <Sidebar />
      <div className="flex flex-col flex-1 relative">
        <TopBar />
        <main className="flex-1 overflow-y-auto relative">
          {/* Outlet renders the matched child route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
