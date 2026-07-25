import { motion } from 'framer-motion';
import { BarChart3, PieChart as PieIcon, LineChart as LineIcon } from 'lucide-react';
import TrafficAnalyticsWidget from '../components/analytics/TrafficAnalyticsWidget';

const AnalyticsPage = () => {
  return (
    <div className="h-full w-full p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="flex items-center gap-4 shrink-0 mb-4">
        <div className="p-3 bg-ai-violet/10 rounded-xl border border-ai-violet/20">
          <BarChart3 className="w-8 h-8 text-ai-violet" />
        </div>
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Global Analytics</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">DATA WAREHOUSE VISUALIZATION</p>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-2 gap-6 shrink-0 h-[400px]">
        
        {/* Chart 1 */}
        <div className="bg-os-panel border border-os-border rounded-xl p-6 relative overflow-hidden shadow-2xl flex flex-col">
          <h2 className="text-sm font-medium text-white mb-6 font-mono tracking-widest flex items-center gap-2"><LineIcon className="w-4 h-4 text-traffic-cyan"/> 24H TRAFFIC VOLUME</h2>
          <div className="flex-1 -mx-6 -mb-6">
            <TrafficAnalyticsWidget />
          </div>
        </div>

        {/* Chart 2 (Mock Bar Chart) */}
        <div className="bg-os-panel border border-os-border rounded-xl p-6 relative overflow-hidden shadow-2xl flex flex-col">
          <h2 className="text-sm font-medium text-white mb-6 font-mono tracking-widest flex items-center gap-2"><BarChart3 className="w-4 h-4 text-infra-emerald"/> INCIDENT DISTRIBUTION</h2>
          <div className="flex-1 flex items-end justify-between px-8 pb-4">
            {[40, 75, 30, 90, 55, 20, 65].map((height, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="w-8 bg-infra-emerald/80 rounded-t-sm shadow-[0_0_15px_rgba(0,255,128,0.3)] relative group hover:bg-infra-emerald transition-colors"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-white font-mono transition-opacity">{height}</div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-3 gap-6 shrink-0">
         <div className="bg-os-panel border border-os-border rounded-xl p-6 flex flex-col items-center justify-center gap-4 h-48 shadow-2xl">
           <PieIcon className="w-8 h-8 text-warn-amber mb-2" />
           <div className="text-3xl font-light text-white">42.5 TB</div>
           <div className="text-xs text-gray-500 font-mono">DATA PROCESSED (30D)</div>
         </div>
         <div className="bg-os-panel border border-os-border rounded-xl p-6 flex flex-col items-center justify-center gap-4 h-48 shadow-2xl">
           <BarChart3 className="w-8 h-8 text-ai-violet mb-2" />
           <div className="text-3xl font-light text-white">12.1 ms</div>
           <div className="text-xs text-gray-500 font-mono">AVG QUERY LATENCY</div>
         </div>
         <div className="bg-os-panel border border-os-border rounded-xl p-6 flex flex-col items-center justify-center gap-4 h-48 shadow-2xl">
           <LineIcon className="w-8 h-8 text-traffic-cyan mb-2" />
           <div className="text-3xl font-light text-white">99.99%</div>
           <div className="text-xs text-gray-500 font-mono">SYSTEM UPTIME</div>
         </div>
      </div>

    </div>
  );
};

export default AnalyticsPage;
