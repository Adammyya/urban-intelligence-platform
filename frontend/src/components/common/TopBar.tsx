import { Search, Bell, User, CloudRain } from 'lucide-react';

const TopBar = () => {
  return (
    <header className="h-16 bg-background-dark/80 backdrop-blur-md border-b border-gray-800/50 flex items-center justify-between px-6 z-10 sticky top-0">
      
      {/* Search Bar */}
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-black/30 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue transition-colors sm:text-sm"
          placeholder="Search locations, sensors, incidents..."
        />
      </div>

      {/* Right Side Info */}
      <div className="flex items-center gap-6">
        
        {/* Weather Widget Placeholder */}
        <div className="flex items-center gap-2 text-sm text-gray-300 font-mono">
          <CloudRain className="w-5 h-5 text-cyber-blue" />
          <span>72°F | Light Rain</span>
        </div>

        {/* Time Widget */}
        <div className="text-sm font-mono text-neon-purple font-medium">
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 border-l border-gray-700 pl-6">
          <button className="text-gray-400 hover:text-cyber-blue transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-alert-red ring-2 ring-background-dark"></span>
          </button>
          
          <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-blue to-neon-purple p-[1px]">
              <div className="w-full h-full rounded-full bg-background-dark flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
            <span>Operator</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
