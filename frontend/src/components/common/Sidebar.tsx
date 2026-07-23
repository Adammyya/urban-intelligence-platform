import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';
import { 
  LayoutDashboard, 
  Map, 
  Activity, 
  Radio, 
  BrainCircuit, 
  BarChart3, 
  AlertTriangle, 
  Settings, 
  FileText
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Live Map', path: '/map', icon: Map },
  { name: 'Traffic', path: '/traffic', icon: Activity },
  { name: 'Sensors', path: '/sensors', icon: Radio },
  { name: 'Predictions', path: '/predictions', icon: BrainCircuit },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Incidents', path: '/incidents', icon: AlertTriangle },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const isSidebarOpen = useUIStore(state => state.isSidebarOpen);

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-64 h-full bg-sidebar border-r border-gray-800/50 flex flex-col shadow-2xl z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-800/50">
        <div className="flex items-center gap-3 text-cyber-blue font-bold text-xl tracking-wider">
          <BrainCircuit className="w-6 h-6" />
          <span>SYNAPSE</span>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800/50">
        <div className="glass-panel p-4 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-success-green animate-pulse"></div>
          <div className="text-xs text-gray-400 font-mono">
            <div>SYSTEM: <span className="text-success-green">ONLINE</span></div>
            <div>LATENCY: 12ms</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
