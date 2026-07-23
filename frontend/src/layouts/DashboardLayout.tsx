import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopBar from '../components/common/TopBar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-dark text-white font-sans">
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
