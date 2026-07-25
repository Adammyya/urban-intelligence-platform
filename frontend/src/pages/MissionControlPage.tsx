import DigitalTwinSphere from '../components/3d/DigitalTwinSphere';
import LiveIncidentFeed from '../components/incidents/LiveIncidentFeed';
import AICoreVisualizer from '../components/ai/AICoreVisualizer';
import CityHealthModule from '../components/dashboard/CityHealthModule';

const MissionControlPage = () => {
  return (
    <div className="absolute inset-0 bg-os-graphite overflow-hidden font-sans flex items-center justify-center">
      
      {/* 3D Holographic Digital Twin Sphere (Centerpiece) */}
      <div className="absolute inset-0 z-0">
        <DigitalTwinSphere />
      </div>

      {/* Foreground Holographic Interface Layer (Glassmorphism HUD) */}
      <div className="absolute inset-0 p-6 pointer-events-none flex flex-col z-10 justify-between">
        
        {/* Top Section */}
        <div className="grid grid-cols-12 gap-6 h-[40%]">
          
          {/* AI Core (Left) */}
          <div className="col-span-3 pointer-events-auto relative group">
             <div className="absolute inset-0 bg-os-panel/40 border border-os-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
               <AICoreVisualizer />
             </div>
          </div>

          {/* Spacer to let the 3D Sphere shine through */}
          <div className="col-span-6 pointer-events-none flex items-start justify-center pt-8">
             <div className="px-6 py-2 bg-os-panel/40 backdrop-blur-md border border-white/10 rounded-full flex flex-col items-center">
                <span className="text-white text-lg font-light tracking-[0.2em] uppercase">Synapse V1.5</span>
                <span className="text-[10px] text-ai-violet font-mono tracking-widest uppercase">Digital Twin Active • Live</span>
             </div>
          </div>

          {/* City Health (Right) */}
          <div className="col-span-3 pointer-events-auto h-full overflow-hidden">
             <div className="h-full bg-os-panel/40 backdrop-blur-md border border-os-border rounded-2xl p-4 overflow-y-auto custom-scrollbar">
                <CityHealthModule />
             </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-12 gap-6 h-[40%]">
          
          {/* Incident Timeline (Left) */}
          <div className="col-span-4 h-full pointer-events-auto bg-os-panel/40 backdrop-blur-md border border-os-border rounded-2xl overflow-hidden">
            <LiveIncidentFeed />
          </div>

          {/* Center Space for 3D Interaction */}
          <div className="col-span-4 pointer-events-none"></div>

          {/* Analytics / Custom Module (Right) */}
          <div className="col-span-4 h-full bg-os-panel/40 border border-os-border rounded-2xl shadow-2xl p-6 relative overflow-hidden backdrop-blur-md pointer-events-auto">
            <h2 className="text-xl font-medium text-white tracking-wide mb-1">System Topology</h2>
            <p className="text-xs text-gray-500 font-mono mb-4">NODE CONNECTIONS</p>
            <div className="flex-1 w-full h-full flex flex-col items-center justify-center text-gray-600 font-mono text-sm border border-dashed border-white/10 rounded-lg bg-black/20 p-4 text-center">
              <span>[ TOPOLOGY MAP ACTIVE ]</span>
              <span className="text-[10px] mt-2 text-traffic-cyan">Routing 14,024 packets/sec</span>
            </div>
          </div>

        </div>
        
      </div>

      {/* Ambient Vignette overlay for depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(5,5,5,0.8)] z-20"></div>

    </div>
  );
};

export default MissionControlPage;
