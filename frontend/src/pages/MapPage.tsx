import { motion } from 'framer-motion';
import { Map as MapIcon, Layers, Target, EyeOff } from 'lucide-react';
import LiveMapWidget from '../components/map/LiveMapWidget';

const MapPage = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden relative">
      
      {/* HUD Header Overlay */}
      <div className="absolute top-8 left-8 z-20 pointer-events-auto flex items-center gap-4 bg-os-panel/80 backdrop-blur-xl p-4 rounded-xl border border-os-border shadow-2xl">
        <div className="p-3 bg-ai-violet/10 rounded-xl border border-ai-violet/20">
          <MapIcon className="w-6 h-6 text-ai-violet" />
        </div>
        <div>
          <h1 className="text-xl font-light text-white tracking-wide">Live Map Engine</h1>
          <p className="text-xs text-gray-400 font-mono mt-1">GLOBAL SENSOR TOPOLOGY</p>
        </div>
      </div>

      {/* Map Controls Overlay */}
      <div className="absolute top-8 right-8 z-20 pointer-events-auto flex flex-col gap-2">
        <button className="p-3 bg-os-panel/80 backdrop-blur-xl border border-os-border rounded-xl text-gray-400 hover:text-white transition-colors">
          <Layers className="w-5 h-5" />
        </button>
        <button className="p-3 bg-os-panel/80 backdrop-blur-xl border border-os-border rounded-xl text-gray-400 hover:text-white transition-colors">
          <Target className="w-5 h-5" />
        </button>
        <button className="p-3 bg-os-panel/80 backdrop-blur-xl border border-os-border rounded-xl text-gray-400 hover:text-white transition-colors">
          <EyeOff className="w-5 h-5" />
        </button>
      </div>

      {/* Fullscreen Map */}
      <div className="absolute inset-0 z-10">
        <LiveMapWidget />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(5,5,5,1)] z-20"></div>
    </div>
  );
};

export default MapPage;
