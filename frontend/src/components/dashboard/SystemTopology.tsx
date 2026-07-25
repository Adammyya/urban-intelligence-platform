import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Cpu, Database, BrainCircuit, Radio, Globe } from 'lucide-react';

interface TopoNode {
  id: string;
  label: string;
  icon: any;
  x: number;
  y: number;
  color: string;
}

interface TopoLink {
  from: string;
  to: string;
}

const nodes: TopoNode[] = [
  { id: 'frontend', label: 'React OS', icon: Globe, x: 160, y: 30, color: '#00f0ff' },
  { id: 'api', label: 'REST API', icon: Database, x: 70, y: 100, color: '#10b981' },
  { id: 'broker', label: 'Event Broker', icon: Network, x: 250, y: 100, color: '#ff9900' },
  { id: 'ai', label: 'AI Engine', icon: BrainCircuit, x: 70, y: 170, color: '#a020f0' },
  { id: 'sensors', label: 'Sensors', icon: Radio, x: 250, y: 170, color: '#3b82f6' },
  { id: 'kafka', label: 'Kafka', icon: Cpu, x: 160, y: 230, color: '#ff2a2a' },
];

const links: TopoLink[] = [
  { from: 'frontend', to: 'api' },
  { from: 'frontend', to: 'broker' },
  { from: 'api', to: 'ai' },
  { from: 'broker', to: 'sensors' },
  { from: 'ai', to: 'kafka' },
  { from: 'kafka', to: 'sensors' },
  { from: 'kafka', to: 'broker' },
  { from: 'api', to: 'kafka' },
];

const SystemTopology = () => {
  const [packetPhases, setPacketPhases] = useState<number[]>(links.map(() => Math.random()));
  const [latencies, setLatencies] = useState<number[]>(links.map(() => Math.floor(Math.random() * 15) + 2));

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketPhases(prev => prev.map(p => (p + 0.02) % 1));
      // Occasionally update latencies
      if (Math.random() > 0.7) {
        setLatencies(prev => prev.map(l => Math.max(1, l + Math.floor(Math.random() * 5) - 2)));
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <h2 className="text-lg font-medium text-white tracking-wide">System Topology</h2>
          <p className="text-[10px] text-gray-500 font-mono">MICROSERVICE NETWORK</p>
        </div>
        <div className="px-2.5 py-1 rounded border border-traffic-cyan/30 bg-traffic-cyan/10 text-traffic-cyan font-mono text-[10px] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-traffic-cyan animate-pulse"></span>
          ONLINE
        </div>
      </div>

      <div className="flex-1 relative min-h-0 w-full flex items-center justify-center">
        <svg className="w-full h-full max-h-full" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet">
          {/* Animated Links */}
          {links.map((link, i) => {
            const from = getNode(link.from);
            const to = getNode(link.to);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            // Packet position along line
            const px = from.x + (to.x - from.x) * packetPhases[i];
            const py = from.y + (to.y - from.y) * packetPhases[i];

            return (
              <g key={`${link.from}-${link.to}`}>
                {/* Connection line */}
                <line
                  x1={from.x} y1={from.y}
                  x2={to.x} y2={to.y}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* Traveling packet */}
                <circle
                  cx={px} cy={py}
                  r="2"
                  fill="#00f0ff"
                  style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}
                />
                {/* Latency label */}
                <text x={midX} y={midY - 5} textAnchor="middle" fill="#4b5563" fontSize="6" fontFamily="monospace">
                  {latencies[i]}ms
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => (
            <g key={node.id}>
              {/* Glow */}
              <circle cx={node.x} cy={node.y} r="18" fill={`${node.color}10`} stroke={`${node.color}30`} strokeWidth="0.5" />
              {/* Core circle */}
              <circle
                cx={node.x} cy={node.y} r="12"
                fill="#0a0a0a"
                stroke={node.color}
                strokeWidth="1"
                style={{ filter: `drop-shadow(0 0 4px ${node.color})` }}
              />
              {/* Label */}
              <text x={node.x} y={node.y + 28} textAnchor="middle" fill={node.color} fontSize="7" fontFamily="monospace" fontWeight="bold">
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default SystemTopology;
