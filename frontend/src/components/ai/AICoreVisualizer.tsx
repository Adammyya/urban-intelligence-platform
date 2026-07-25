import { motion } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';
import { useCityEventStore } from '../../store/useCityEventStore';
import { useState, useEffect } from 'react';

const reasoningSteps = [
  'Scanning traffic telemetry...',
  'Correlating sensor grid data...',
  'Analyzing pedestrian density...',
  'Cross-referencing weather vectors...',
  'Evaluating infrastructure load...',
  'Computing prediction matrix...',
  'Generating risk assessment...',
  'Finalizing neural inference...',
];

const AICoreVisualizer = () => {
  const aiState = useUIStore(state => state.aiState);
  const latestEvent = useCityEventStore(state => state.latestEvent);
  const events = useCityEventStore(state => state.events);
  
  const [confidence, setConfidence] = useState(88);
  const [activeStep, setActiveStep] = useState(0);
  const [inferenceTime, setInferenceTime] = useState(12);

  // Cycle through reasoning steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % reasoningSteps.length);
      setInferenceTime(Math.floor(Math.random() * 20) + 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // React to events — shift confidence
  useEffect(() => {
    if (!latestEvent) return;
    if (latestEvent.severity === 'CRITICAL') {
      setConfidence(prev => Math.max(40, prev - Math.floor(Math.random() * 12) - 5));
    } else if (latestEvent.type === 'PREDICTION') {
      setConfidence(prev => Math.min(99, prev + Math.floor(Math.random() * 5) + 1));
    } else {
      // Slight drift
      setConfidence(prev => Math.min(99, Math.max(50, prev + (Math.random() > 0.5 ? 1 : -1))));
    }
  }, [latestEvent]);

  const stateConfig = {
    IDLE: { color: '#6b7280', pulseDuration: 4, rotateDuration: 30 },
    MONITORING: { color: '#a020f0', pulseDuration: 2, rotateDuration: 20 },
    ANALYZING: { color: '#00f0ff', pulseDuration: 1.5, rotateDuration: 10 },
    PREDICTING: { color: '#ff9900', pulseDuration: 1, rotateDuration: 5 },
    EMERGENCY: { color: '#ff2a2a', pulseDuration: 0.5, rotateDuration: 2 },
  };

  const config = stateConfig[aiState];

  const getConfidenceColor = (v: number) => {
    if (v >= 80) return '#10b981';
    if (v >= 60) return '#ff9900';
    return '#ff2a2a';
  };

  return (
    <div className="relative flex flex-col items-center justify-between w-full h-full p-4">
      
      {/* Reactor Core (Upper Section) */}
      <div className="relative flex items-center justify-center w-full flex-1 min-h-0">
        
        {/* Outer Holographic Glow */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 15px 0px ${config.color}30`,
              `0 0 40px 8px ${config.color}50`,
              `0 0 15px 0px ${config.color}30`,
            ]
          }}
          transition={{ duration: config.pulseDuration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[140px] h-[140px] rounded-full blur-[30px] z-0"
          style={{ backgroundColor: `${config.color}15` }}
        />

        {/* SVG Reactor */}
        <div className="relative z-10 w-[140px] h-[140px]">
          
          {/* Outer Ring */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: config.rotateDuration, repeat: Infinity, ease: "linear" }}
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
          >
            <circle cx="50" cy="50" r="48" fill="none" stroke={config.color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="46" fill="none" stroke={config.color} strokeWidth="1" strokeDasharray="10 20 40 10" />
            <path d="M 50 2 L 50 8 M 98 50 L 92 50 M 50 98 L 50 92 M 2 50 L 8 50" stroke={config.color} strokeWidth="2" strokeLinecap="round" />
          </motion.svg>

          {/* Middle Ring */}
          <motion.svg
            animate={{ rotate: -360 }}
            transition={{ duration: config.rotateDuration * 0.8, repeat: Infinity, ease: "linear" }}
            viewBox="0 0 100 100"
            className="absolute inset-0 w-[100px] h-[100px] m-auto"
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke={config.color} strokeWidth="0.5" opacity="0.5" />
            <circle cx="50" cy="50" r="42" fill="none" stroke={config.color} strokeWidth="2" strokeDasharray="4 8" />
          </motion.svg>

          {/* Inner Data Nodes */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: config.rotateDuration * 1.5, repeat: Infinity, ease: "linear" }}
            viewBox="0 0 100 100"
            className="absolute inset-0 w-[70px] h-[70px] m-auto"
          >
            <circle cx="50" cy="50" r="40" fill="none" stroke={config.color} strokeWidth="1" strokeDasharray="20 10" />
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 40 * Math.cos(rad);
              const y = 50 + 40 * Math.sin(rad);
              return <circle key={angle} cx={x} cy={y} r="3" fill={config.color} />;
            })}
          </motion.svg>

          {/* Central Core Pulse */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: config.pulseDuration, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 m-auto w-[36px] h-[36px] rounded-full border border-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden"
            style={{ 
              background: `radial-gradient(circle, ${config.color}80 0%, transparent 70%)`,
              boxShadow: `inset 0 0 15px ${config.color}`
            }}
          >
            <div className="w-[16px] h-[16px] rounded-full bg-white blur-[2px] opacity-80" />
          </motion.div>
        </div>

        {/* State Label */}
        <div className="absolute bottom-0 font-mono text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: config.color, textShadow: `0 0 8px ${config.color}` }}>
          [ {aiState} ]
        </div>
      </div>

      {/* AI Reasoning Panel (Lower Section) */}
      <div className="w-full mt-2 border-t border-white/5 pt-3 space-y-2.5">
        
        {/* Confidence */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Confidence</span>
          <motion.span 
            key={confidence}
            initial={{ scale: 1.3, color: getConfidenceColor(confidence) }}
            animate={{ scale: 1 }}
            className="text-sm font-mono font-bold"
            style={{ color: getConfidenceColor(confidence) }}
          >
            {confidence}%
          </motion.span>
        </div>
        
        {/* Confidence Bar */}
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full rounded-full"
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ backgroundColor: getConfidenceColor(confidence), boxShadow: `0 0 8px ${getConfidenceColor(confidence)}` }}
          />
        </div>

        {/* Current Reasoning Step */}
        <div className="flex items-start gap-2">
          <div className="w-1 h-1 rounded-full mt-1.5 shrink-0 animate-pulse" style={{ backgroundColor: config.color }}></div>
          <motion.p 
            key={activeStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] text-gray-400 font-mono leading-relaxed"
          >
            {reasoningSteps[activeStep]}
          </motion.p>
        </div>

        {/* Model Info */}
        <div className="flex items-center justify-between text-[9px] text-gray-600 font-mono">
          <span>MODEL: XGBoost_v4</span>
          <span>{inferenceTime}ms</span>
        </div>

        {/* Recent Events Processed Counter */}
        <div className="flex items-center justify-between text-[9px] text-gray-600 font-mono pt-1 border-t border-white/5">
          <span>EVENTS PROCESSED</span>
          <span style={{ color: config.color }}>{events.length}</span>
        </div>
      </div>
    </div>
  );
};

export default AICoreVisualizer;
