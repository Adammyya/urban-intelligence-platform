import { Activity, Radio, AlertTriangle, Zap, Wind, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Traffic Flow', value: 84, color: 'text-traffic-cyan', bg: 'bg-traffic-cyan', icon: Activity },
  { label: 'Emergency Load', value: 12, color: 'text-alert-crimson', bg: 'bg-alert-crimson', icon: AlertTriangle },
  { label: 'Power Grid', value: 98, color: 'text-warn-amber', bg: 'bg-warn-amber', icon: Zap },
  { label: 'Air Quality', value: 92, color: 'text-infra-emerald', bg: 'bg-infra-emerald', icon: Wind },
  { label: 'Sensor Network', value: 100, color: 'text-ai-violet', bg: 'bg-ai-violet', icon: Radio },
  { label: 'AI Confidence', value: 95, color: 'text-white', bg: 'bg-white', icon: ShieldCheck },
];

const CityHealthModule = () => {
  return (
    <div className="bg-os-panel border border-os-border rounded-2xl p-6 shadow-2xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Activity className="w-32 h-32 text-traffic-cyan" />
      </div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">City Health Index</h2>
          <p className="text-xs text-gray-500 font-mono mt-1">REAL-TIME SYSTEM METRICS</p>
        </div>
        <div className="px-3 py-1 rounded border border-infra-emerald/30 bg-infra-emerald/10 text-infra-emerald font-mono text-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-infra-emerald animate-pulse"></span>
          OPTIMAL
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10 overflow-y-auto custom-scrollbar pr-2">
        {metrics.map((metric, i) => (
          <div key={metric.label} className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <metric.icon className="w-4 h-4" />
                <span>{metric.label}</span>
              </div>
              <span className={`font-mono font-medium ${metric.color}`}>{metric.value}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-[#111] rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.value}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className={`h-full ${metric.bg} shadow-[0_0_10px_currentColor]`}
                style={{ opacity: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityHealthModule;
