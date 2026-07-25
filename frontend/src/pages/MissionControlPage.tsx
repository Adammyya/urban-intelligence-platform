import DigitalTwinSphere from '../components/3d/DigitalTwinSphere';
import LiveIncidentFeed from '../components/incidents/LiveIncidentFeed';
import AICoreVisualizer from '../components/ai/AICoreVisualizer';
import CityHealthModule from '../components/dashboard/CityHealthModule';
import SystemTopology from '../components/dashboard/SystemTopology';
import AmbientParticles from '../components/common/AmbientParticles';
import { useCityEventStore } from '../store/useCityEventStore';
import { useUIStore } from '../store/useUIStore';
import { useEffect } from 'react';

const MissionControlPage = () => {
  const aiStateOverride = useCityEventStore(state => state.aiStateOverride);
  const setAIState = useUIStore(state => state.setAIState);

  // Connected reactivity: Event Bus drives AI Core state
  useEffect(() => {
    if (aiStateOverride) {
      setAIState(aiStateOverride as any);
    } else {
      setAIState('MONITORING');
    }
  }, [aiStateOverride, setAIState]);

  return (
    <div className="absolute inset-0 bg-os-graphite overflow-hidden font-sans flex items-center justify-center">
      
      {/* 3D Holographic Digital Twin Sphere (Centerpiece) */}
      <div className="absolute inset-0 z-0">
        <DigitalTwinSphere />
      </div>

      {/* Ambient Floating Particles */}
      <AmbientParticles />

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

          {/* System Topology (Right) */}
          <div className="col-span-4 h-full flex flex-col min-h-0 bg-os-panel/40 border border-os-border rounded-2xl shadow-2xl p-4 relative overflow-hidden backdrop-blur-md pointer-events-auto">
            <SystemTopology />
          </div>

        </div>
        
      </div>

      {/* Ambient Vignette overlay for depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(5,5,5,0.8)] z-20"></div>

    </div>
  );
};

export default MissionControlPage;
