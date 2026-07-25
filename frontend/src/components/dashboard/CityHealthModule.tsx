import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useCityEventStore } from '../../store/useCityEventStore';

interface HealthRing {
  label: string;
  value: number;
  color: string;
  radius: number;
}

const baseMetrics: HealthRing[] = [
  { label: 'Traffic', value: 84, color: '#00f0ff', radius: 90 },
  { label: 'Infrastructure', value: 96, color: '#10b981', radius: 78 },
  { label: 'Power Grid', value: 91, color: '#ff9900', radius: 66 },
  { label: 'Water', value: 97, color: '#3b82f6', radius: 54 },
  { label: 'Emergency', value: 15, color: '#ff2a2a', radius: 42 },
  { label: 'AI Confidence', value: 88, color: '#a020f0', radius: 30 },
];

const CityHealthModule = () => {
  const [metrics, setMetrics] = useState(baseMetrics);
  const latestEvent = useCityEventStore(state => state.latestEvent);
  const animFrameRef = useRef(0);

  // React to the global event bus — shift health values based on events
  useEffect(() => {
    if (!latestEvent) return;

    setMetrics(prev => prev.map(m => {
      let delta = 0;
      if (latestEvent.severity === 'CRITICAL') {
        if (m.label === 'Emergency') delta = Math.floor(Math.random() * 8) + 3;
        if (m.label === 'AI Confidence') delta = -(Math.floor(Math.random() * 5) + 2);
        if (m.label === 'Traffic') delta = -(Math.floor(Math.random() * 4));
      } else if (latestEvent.type === 'TRAFFIC') {
        if (m.label === 'Traffic') delta = -(Math.floor(Math.random() * 6) + 1);
      } else if (latestEvent.type === 'PREDICTION') {
        if (m.label === 'AI Confidence') delta = Math.floor(Math.random() * 3) + 1;
      } else if (latestEvent.type === 'INFRASTRUCTURE') {
        if (m.label === 'Infrastructure') delta = -(Math.floor(Math.random() * 3));
      }

      const newValue = Math.min(100, Math.max(0, m.value + delta));
      return { ...m, value: newValue };
    }));
  }, [latestEvent]);

  // Subtle continuous breathing animation on values
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => {
        const drift = (Math.random() - 0.5) * 2; // -1 to +1
        const newValue = Math.min(100, Math.max(0, m.value + drift));
        return { ...m, value: Math.round(newValue * 10) / 10 };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const overallHealth = Math.round(
    metrics.reduce((sum, m) => {
      // Emergency is inverted — lower is better
      const effective = m.label === 'Emergency' ? 100 - m.value : m.value;
      return sum + effective;
    }, 0) / metrics.length
  );

  const getOverallColor = (v: number) => {
    if (v >= 80) return '#10b981';
    if (v >= 60) return '#ff9900';
    return '#ff2a2a';
  };

  const svgSize = 220;
  const center = svgSize / 2;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-medium text-white tracking-wide">City Health</h2>
          <p className="text-[10px] text-gray-500 font-mono">REAL-TIME DIAGNOSTICS</p>
        </div>
        <div 
          className="px-2.5 py-1 rounded border font-mono text-[10px] flex items-center gap-1.5"
          style={{ 
            borderColor: `${getOverallColor(overallHealth)}40`,
            backgroundColor: `${getOverallColor(overallHealth)}15`,
            color: getOverallColor(overallHealth)
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: getOverallColor(overallHealth) }}></span>
          {overallHealth}%
        </div>
      </div>

      {/* Radial Ring Visualization */}
      <div className="flex-1 flex items-center justify-center">
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`} className="drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {metrics.map((metric, i) => {
            const circumference = 2 * Math.PI * metric.radius;
            const effectiveValue = metric.label === 'Emergency' ? 100 - metric.value : metric.value;
            const strokeDashoffset = circumference - (effectiveValue / 100) * circumference;
            const strokeWidth = 6;

            return (
              <g key={metric.label}>
                {/* Background ring */}
                <circle
                  cx={center}
                  cy={center}
                  r={metric.radius}
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth={strokeWidth}
                />
                {/* Animated value ring */}
                <motion.circle
                  cx={center}
                  cy={center}
                  r={metric.radius}
                  fill="none"
                  stroke={metric.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  style={{
                    filter: `drop-shadow(0 0 4px ${metric.color})`,
                    transform: 'rotate(-90deg)',
                    transformOrigin: `${center}px ${center}px`,
                  }}
                />
              </g>
            );
          })}

          {/* Center text */}
          <text x={center} y={center - 6} textAnchor="middle" fill={getOverallColor(overallHealth)} fontSize="22" fontWeight="bold" fontFamily="monospace">
            {overallHealth}%
          </text>
          <text x={center} y={center + 12} textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="monospace" letterSpacing="2">
            CITY HEALTH
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
        {metrics.map(m => (
          <div key={m.label} className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }}></span>
              <span className="text-gray-400">{m.label}</span>
            </div>
            <span className="font-mono" style={{ color: m.color }}>
              {m.label === 'Emergency' ? `${Math.round(m.value)}` : `${Math.round(m.value)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityHealthModule;
