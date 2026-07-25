import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLogs = [
  "Initializing Urban Intelligence...",
  "Authenticating Operator Credentials...",
  "Establishing Secure WebSocket Uplink...",
  "Loading Digital Twin Physics Engine...",
  "Synchronizing AI Inference Models...",
  "Starting Kafka Streams...",
  "Monitoring Infrastructure Nodes...",
  "Mission Control Ready."
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    if (currentLogIndex < bootLogs.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, bootLogs[currentLogIndex]]);
        setCurrentLogIndex(prev => prev + 1);
      }, 400); // 400ms per log
      return () => clearTimeout(timer);
    } else {
      // Finished all logs, wait 1 second then fade out
      const completeTimer = setTimeout(() => {
        setIsBooting(false);
      }, 1000);
      return () => clearTimeout(completeTimer);
    }
  }, [currentLogIndex]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isBooting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center font-mono"
        >
          {/* Central Logo / Pulse */}
          <div className="mb-12 relative flex items-center justify-center">
            <div className="absolute w-24 h-24 border border-ai-violet/30 rounded-full animate-ping opacity-75"></div>
            <div className="w-16 h-16 bg-ai-violet/20 border border-ai-violet rounded-full flex items-center justify-center backdrop-blur-md">
              <span className="text-ai-violet text-xl font-bold tracking-widest uppercase">S</span>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="w-full max-w-lg h-48 overflow-hidden flex flex-col justify-end items-start px-8">
            <div className="flex flex-col gap-2 w-full">
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-sm tracking-wide ${i === bootLogs.length - 1 ? 'text-success-green font-bold' : 'text-gray-400'}`}
                >
                  <span className="text-ai-violet mr-2">{">"}</span>
                  {log}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 text-[10px] text-gray-600 tracking-widest">
            SYNAPSE OS v1.0.0-rc1
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
