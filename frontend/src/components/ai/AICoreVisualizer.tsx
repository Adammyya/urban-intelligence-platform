import { motion } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';

const AICoreVisualizer = () => {
  const aiState = useUIStore(state => state.aiState);

  // Map AI states to colors and animation speeds
  const stateConfig = {
    IDLE: { color: '#6b7280', pulseDuration: 4, rotateDuration: 30 },
    MONITORING: { color: '#a020f0', pulseDuration: 2, rotateDuration: 20 }, // ai-violet
    ANALYZING: { color: '#00f0ff', pulseDuration: 1.5, rotateDuration: 10 }, // traffic-cyan
    PREDICTING: { color: '#ff9900', pulseDuration: 1, rotateDuration: 5 }, // warn-amber
    EMERGENCY: { color: '#ff2a2a', pulseDuration: 0.5, rotateDuration: 2 }, // alert-crimson
  };

  const config = stateConfig[aiState];

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[300px]">
      
      {/* Outer Holographic Glow */}
      <motion.div
        animate={{
          boxShadow: [
            `0 0 20px 0px ${config.color}40`,
            `0 0 60px 10px ${config.color}60`,
            `0 0 20px 0px ${config.color}40`,
          ]
        }}
        transition={{ duration: config.pulseDuration, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 m-auto w-[250px] h-[250px] rounded-full blur-[40px] z-0"
        style={{ backgroundColor: `${config.color}20` }}
      />

      {/* SVG Reactor Core */}
      <div className="relative z-10 w-[240px] h-[240px]">
        
        {/* Outer Ring */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: config.rotateDuration, repeat: Infinity, ease: "linear" }}
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke={config.color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="46" fill="none" stroke={config.color} strokeWidth="1" strokeDasharray="10 20 40 10" />
          <path d="M 50 2 L 50 8 M 98 50 L 92 50 M 50 98 L 50 92 M 2 50 L 8 50" stroke={config.color} strokeWidth="2" strokeLinecap="round" />
        </motion.svg>

        {/* Middle Ring (Rotates Opposite) */}
        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ duration: config.rotateDuration * 0.8, repeat: Infinity, ease: "linear" }}
          viewBox="0 0 100 100"
          className="absolute inset-0 w-[180px] h-[180px] m-auto"
        >
          <circle cx="50" cy="50" r="45" fill="none" stroke={config.color} strokeWidth="0.5" opacity="0.5" />
          <circle cx="50" cy="50" r="42" fill="none" stroke={config.color} strokeWidth="2" strokeDasharray="4 8" />
        </motion.svg>

        {/* Inner Data Nodes */}
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ duration: config.rotateDuration * 1.5, repeat: Infinity, ease: "linear" }}
          viewBox="0 0 100 100"
          className="absolute inset-0 w-[120px] h-[120px] m-auto"
        >
          <circle cx="50" cy="50" r="40" fill="none" stroke={config.color} strokeWidth="1" strokeDasharray="20 10" />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 40 * Math.cos(rad);
            const y = 50 + 40 * Math.sin(rad);
            return (
              <circle key={angle} cx={x} cy={y} r="3" fill={config.color} className="shadow-[0_0_8px_currentColor]" />
            );
          })}
        </motion.svg>

        {/* Central Core Pulse */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: config.pulseDuration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-auto w-[60px] h-[60px] rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden"
          style={{ 
            background: `radial-gradient(circle, ${config.color}80 0%, transparent 70%)`,
            boxShadow: `inset 0 0 20px ${config.color}`
          }}
        >
          <div className="w-[30px] h-[30px] rounded-full bg-white blur-[2px] opacity-80" />
        </motion.div>

      </div>
      
      {/* State Label */}
      <div className="absolute bottom-4 m-auto font-mono text-xs font-bold tracking-[0.2em] uppercase" style={{ color: config.color, textShadow: `0 0 10px ${config.color}` }}>
        [ {aiState} ]
      </div>
    </div>
  );
};

export default AICoreVisualizer;
