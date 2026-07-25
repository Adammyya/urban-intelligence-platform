import LiveMapWidget from '../components/map/LiveMapWidget';
import LiveIncidentFeed from '../components/incidents/LiveIncidentFeed';
import AICoreVisualizer from '../components/ai/AICoreVisualizer';
import CityHealthModule from '../components/dashboard/CityHealthModule';

const DashboardPage = () => {
  return (
    <div className="absolute inset-0 bg-os-graphite overflow-hidden font-sans">
      
      {/* Background Interactive Map */}
      <div className="absolute inset-0 opacity-80 mix-blend-screen pointer-events-auto">
        <LiveMapWidget />
      </div>

      {/* Foreground Holographic Interface Layer */}
      <div className="absolute inset-0 p-6 pointer-events-none flex flex-col z-10">
        
        {/* Top Section: AI Core & Health */}
        <div className="grid grid-cols-12 gap-6 h-[45%] mb-6">
          
          {/* AI Core (Left) */}
          <div className="col-span-3 pointer-events-auto relative group">
             <div className="absolute inset-0 bg-os-panel border border-os-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
               <AICoreVisualizer />
             </div>
          </div>

          {/* Spacer for Map Visibility */}
          <div className="col-span-4 pointer-events-none"></div>

          {/* City Health (Right) */}
          <div className="col-span-5 pointer-events-auto">
            <CityHealthModule />
          </div>

        </div>

        {/* Bottom Section: Incidents & Analytics */}
        <div className="grid grid-cols-12 gap-6 h-[45%] pointer-events-auto">
          
          {/* Incident Timeline (Left) */}
          <div className="col-span-4 h-full">
            <LiveIncidentFeed />
          </div>

          {/* Map Focus Area (Center) */}
          <div className="col-span-4 pointer-events-none h-full relative">
            {/* Minimal HUD overlay for map focus */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-traffic-cyan/20 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-traffic-cyan rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Analytics / Custom Module (Right) */}
          <div className="col-span-4 h-full bg-os-panel border border-os-border rounded-2xl shadow-2xl p-6 relative overflow-hidden backdrop-blur-xl">
            <h2 className="text-xl font-medium text-white tracking-wide mb-1">System Topology</h2>
            <p className="text-xs text-gray-500 font-mono mb-4">NODE CONNECTIONS</p>
            <div className="flex-1 w-full h-full flex items-center justify-center text-gray-600 font-mono text-sm border border-dashed border-white/5 rounded-lg">
              [ TOPOLOGY MAP OFFLINE ]
            </div>
          </div>

        </div>
        
      </div>

      {/* Ambient Vignette overlay for depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(5,5,5,1)] z-20"></div>

    </div>
  );
};

export default DashboardPage;
