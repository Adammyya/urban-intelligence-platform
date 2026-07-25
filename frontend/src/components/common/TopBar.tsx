import { Menu, Bell, Search, Cloud, Activity, BrainCircuit } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';

import NotificationCenter from './NotificationCenter';

const TopBar = () => {
  const toggleSidebar = useUIStore(state => state.toggleSidebar);
  const user = useAuthStore(state => state.user);
  
  // Real-time clock simulation
  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });

  return (
    <header className="h-16 bg-os-graphite border-b border-os-border flex items-center justify-between px-4 z-30 shrink-0">
      
      {/* Left: Sidebar Toggle & City Context */}
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-os-border transition-colors focus:outline-none"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-4 border-l border-os-border pl-6 h-8">
          <div className="flex items-center gap-2 text-sm font-mono text-gray-300">
            <span className="w-2 h-2 rounded-full bg-traffic-cyan shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
            SECTOR: <span className="text-white font-medium">METRO-PRIME</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono text-gray-400 ml-4">
            <Cloud className="w-4 h-4 text-gray-500" />
            <span>72°F / CLR</span>
          </div>
        </div>
      </div>

      {/* Middle: Command Palette Trigger */}
      <div className="flex-1 max-w-xl px-8 hidden lg:block">
        <button 
          className="w-full bg-os-panel border border-os-border hover:border-gray-700 text-gray-500 rounded-lg py-2 px-4 flex items-center justify-between transition-all group"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 group-hover:text-traffic-cyan transition-colors" />
            <span className="text-sm font-sans tracking-wide">Search coordinates, sensors, or commands...</span>
          </div>
          <div className="flex gap-1">
            <kbd className="px-2 py-0.5 rounded bg-os-graphite border border-os-border text-xs font-mono">CTRL</kbd>
            <kbd className="px-2 py-0.5 rounded bg-os-graphite border border-os-border text-xs font-mono">K</kbd>
          </div>
        </button>
      </div>

      {/* Right: System Status & User */}
      <div className="flex items-center gap-6">
        
        {/* System Vitals */}
        <div className="hidden xl:flex items-center gap-6 border-r border-os-border pr-6">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <Activity className="w-4 h-4 text-infra-emerald" />
            <div className="flex flex-col">
              <span className="uppercase text-[10px] text-gray-600">Latency</span>
              <span className="text-infra-emerald">12ms</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <BrainCircuit className="w-4 h-4 text-ai-violet" />
            <div className="flex flex-col">
              <span className="uppercase text-[10px] text-gray-600">AI Core</span>
              <span className="text-ai-violet animate-pulse">MONITORING</span>
            </div>
          </div>
        </div>

        {/* Clock */}
        <div className="hidden md:block font-mono text-sm tracking-wider text-gray-300">
          {time}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <NotificationCenter />
          
          <button 
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-os-border transition-colors"
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
