import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Map, Activity, Radio, 
  BrainCircuit, BarChart3, AlertTriangle, 
  FileText, Settings, Brain 
} from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Live Map', href: '/map', icon: Map },
  { name: 'Traffic', href: '/traffic', icon: Activity },
  { name: 'Sensors', href: '/sensors', icon: Radio },
  { name: 'Predictions', href: '/predictions', icon: BrainCircuit },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Incidents', href: '/incidents', icon: AlertTriangle },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar = () => {
  const isSidebarOpen = useUIStore(state => state.isSidebarOpen);

  return (
    <motion.aside
      animate={{ width: isSidebarOpen ? 240 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full bg-os-graphite border-r border-os-border flex flex-col z-40 shadow-[4px_0_24px_rgba(0,0,0,0.5)] overflow-hidden"
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-center border-b border-os-border flex-shrink-0">
        <motion.div 
          animate={{ scale: isSidebarOpen ? 1 : 1.2 }}
          className="flex items-center gap-3 text-traffic-cyan"
        >
          <Brain className="w-8 h-8" />
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-bold text-xl tracking-widest text-white"
            >
              SYNAPSE
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => `
              relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group
              ${isActive 
                ? 'bg-gradient-to-r from-ai-violet/20 to-transparent text-white' 
                : 'text-gray-500 hover:text-white hover:bg-os-border'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {/* Active Glow Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-ai-violet rounded-full shadow-[0_0_10px_rgba(160,32,240,0.8)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
                
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-ai-violet drop-shadow-[0_0_8px_rgba(160,32,240,0.8)]' : 'group-hover:text-traffic-cyan'}`} />
                
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-medium tracking-wide whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Hook (Bottom) */}
      <div className="p-4 border-t border-os-border">
        <div className={`flex items-center gap-3 ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}>
          <div className="w-10 h-10 rounded-full bg-os-panel border border-os-border overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=Admin&background=00f0ff&color=050505" alt="User" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Central Admin</span>
              <span className="text-xs text-ai-violet font-mono">ID: SYN-001</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
