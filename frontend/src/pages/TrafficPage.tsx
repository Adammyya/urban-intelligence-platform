import { motion } from 'framer-motion';
import { Activity, Car, GitMerge, AlertTriangle } from 'lucide-react';
import TrafficAnalyticsWidget from '../components/analytics/TrafficAnalyticsWidget';

const TrafficPage = () => {
  return (
    <div className="h-full w-full p-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
      
      {/* Header */}
      <div className="flex items-center gap-4 shrink-0 mb-4">
        <div className="p-3 bg-ai-violet/10 rounded-xl border border-ai-violet/20">
          <Activity className="w-8 h-8 text-ai-violet" />
        </div>
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Traffic & Logistics</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">CITY MOBILITY ANALYSIS</p>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-6 shrink-0">
        {[
          { label: 'Active Vehicles', value: '42,105', icon: Car, color: 'text-traffic-cyan' },
          { label: 'Avg Speed', value: '34 mph', icon: Activity, color: 'text-infra-emerald' },
          { label: 'Congestion Nodes', value: '14', icon: GitMerge, color: 'text-warn-amber' },
          { label: 'Critical Blockages', value: '2', icon: AlertTriangle, color: 'text-alert-crimson' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-os-panel border border-os-border rounded-xl p-6 relative overflow-hidden"
          >
            <stat.icon className={`absolute top-6 right-6 w-8 h-8 opacity-20 ${stat.color}`} />
            <div className="text-sm text-gray-400 font-mono mb-2">{stat.label}</div>
            <div className={`text-3xl font-light ${stat.color}`}>{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="h-[400px] shrink-0 bg-os-panel border border-os-border rounded-xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Activity className="w-64 h-64 text-ai-violet" />
        </div>
        <TrafficAnalyticsWidget />
      </div>

    </div>
  );
};

export default TrafficPage;
