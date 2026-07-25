import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Zap, Share2 } from 'lucide-react';
import AICoreVisualizer from '../components/ai/AICoreVisualizer';

const PredictionsPage = () => {
  return (
    <div className="h-full w-full p-8 flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="p-3 bg-ai-violet/10 rounded-xl border border-ai-violet/20">
          <BrainCircuit className="w-8 h-8 text-ai-violet" />
        </div>
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">Predictive Analysis</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">XGBOOST ML ENGINE</p>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* Left: AI Core & Status */}
        <div className="w-1/3 flex flex-col gap-6 shrink-0">
          <div className="h-64 bg-os-panel border border-os-border rounded-xl shadow-2xl relative overflow-hidden flex items-center justify-center">
            <AICoreVisualizer />
          </div>

          <div className="flex-1 bg-os-panel border border-os-border rounded-xl p-6 shadow-2xl overflow-y-auto custom-scrollbar">
            <h2 className="text-sm font-medium text-white mb-6 font-mono tracking-widest">NEURAL INFERENCES</h2>
            <div className="space-y-4">
              {[
                { label: 'Traffic Anomaly', confidence: 94, time: '+30m', color: 'text-warn-amber' },
                { label: 'Grid Surge', confidence: 88, time: '+2h', color: 'text-alert-crimson' },
                { label: 'Air Quality Drop', confidence: 91, time: '+4h', color: 'text-infra-emerald' }
              ].map((infer, i) => (
                <div key={infer.label} className="p-4 bg-os-graphite border border-os-border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm">{infer.label}</span>
                    <span className={`font-mono text-xs ${infer.color}`}>T{infer.time}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-1 flex-1 bg-black rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${infer.confidence}%` }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className="h-full bg-ai-violet shadow-[0_0_8px_currentColor]"
                      />
                    </div>
                    <span className="text-xs text-ai-violet font-mono">{infer.confidence}% CONF</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Decision Matrix */}
        <div className="flex-1 bg-os-panel border border-os-border rounded-xl p-8 relative overflow-hidden shadow-2xl flex flex-col">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <Cpu className="w-64 h-64 text-ai-violet" />
          </div>

          <h2 className="text-xl font-medium text-white tracking-wide mb-1 relative z-10">Decision Matrix</h2>
          <p className="text-xs text-gray-500 font-mono mb-8 relative z-10">RECOMMENDED ACTIONS BASED ON INFERENCES</p>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-4 relative z-10">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-6 border border-ai-violet/30 bg-ai-violet/5 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-ai-violet/20 text-ai-violet rounded-lg"><Zap className="w-5 h-5"/></div>
                <div>
                  <h3 className="text-lg text-white mb-2">Reroute Sector 7 Traffic</h3>
                  <p className="text-sm text-gray-400 mb-4">High probability (94%) of congestion developing on Main St within 30 minutes due to stadium event.</p>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-ai-violet/20 text-ai-violet border border-ai-violet/50 rounded-lg text-sm font-mono hover:bg-ai-violet/30 transition-colors">EXECUTE</button>
                    <button className="px-4 py-2 bg-os-graphite text-gray-400 border border-os-border rounded-lg text-sm font-mono hover:text-white transition-colors">DISMISS</button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-6 border border-os-border bg-os-graphite rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-os-panel text-gray-400 rounded-lg"><Share2 className="w-5 h-5"/></div>
                <div>
                  <h3 className="text-lg text-white mb-2">Pre-dispatch Maintenance to Grid Substation 4</h3>
                  <p className="text-sm text-gray-400 mb-4">Voltage fluctuations indicate 88% chance of failure during peak load in 2 hours.</p>
                  <div className="flex gap-4">
                    <button className="px-4 py-2 bg-os-panel text-gray-300 border border-os-border rounded-lg text-sm font-mono hover:bg-gray-800 transition-colors">AUTHORIZE</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PredictionsPage;
