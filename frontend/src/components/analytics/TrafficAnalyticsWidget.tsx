import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

const mockData = [
  { time: '00:00', density: 1200 },
  { time: '04:00', density: 800 },
  { time: '08:00', density: 4500 },
  { time: '12:00', density: 3800 },
  { time: '16:00', density: 5200 },
  { time: '20:00', density: 2900 },
  { time: '24:00', density: 1500 },
];

const TrafficAnalyticsWidget = () => {
  return (
    <div className="glass-panel p-4 flex flex-col h-[280px] w-[400px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyber-blue" />
          <h3 className="text-gray-200 font-medium tracking-wide">Traffic Density (24h)</h3>
        </div>
        <span className="px-2 py-1 bg-cyber-blue/10 text-cyber-blue text-xs rounded-full font-mono">
          City-wide Average
        </span>
      </div>

      <div className="flex-1 w-full h-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#a020f0" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#141625', borderColor: '#00f0ff', borderRadius: '8px' }}
              itemStyle={{ color: '#00f0ff', fontWeight: 'bold' }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Area type="monotone" dataKey="density" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorDensity)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficAnalyticsWidget;
