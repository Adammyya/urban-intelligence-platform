import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Map, Database, Key, Monitor, User } from 'lucide-react';
import { useState } from 'react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General OS', icon: Monitor },
    { id: 'security', label: 'Security & Auth', icon: Shield },
    { id: 'map', label: 'Map Engine', icon: Map },
    { id: 'notifications', label: 'Alert Routing', icon: Bell },
    { id: 'data', label: 'Data Pipeline', icon: Database },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="h-full w-full p-8 flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="p-3 bg-ai-violet/10 rounded-xl border border-ai-violet/20">
          <Settings className="w-8 h-8 text-ai-violet" />
        </div>
        <div>
          <h1 className="text-3xl font-light text-white tracking-wide">System Configuration</h1>
          <p className="text-sm text-gray-500 font-mono mt-1">OS PREFERENCES AND ROUTING</p>
        </div>
      </div>

      <div className="flex flex-1 gap-8 min-h-0 overflow-hidden mt-4">
        
        {/* Sidebar Nav */}
        <div className="w-64 shrink-0 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all font-sans text-sm ${
                activeTab === tab.id
                  ? 'bg-ai-violet/20 text-white border border-ai-violet/30 shadow-[inset_4px_0_0_rgba(160,32,240,1)]'
                  : 'text-gray-400 hover:bg-os-border hover:text-white border border-transparent'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-ai-violet' : ''}`} />
              {tab.label}
            </button>
          ))}

          <div className="mt-auto border-t border-os-border pt-4">
            <div className="bg-os-panel border border-os-border rounded-lg p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-os-graphite border border-os-border flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <div className="text-white text-sm">Central Admin</div>
                <div className="text-xs text-ai-violet font-mono">SYN-001</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-os-panel border border-os-border rounded-2xl p-8 overflow-y-auto custom-scrollbar relative shadow-2xl">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl"
          >
            {activeTab === 'general' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl text-white mb-2">Display Engine</h2>
                  <p className="text-sm text-gray-500 mb-6">Configure how SYNAPSE renders graphics and animations.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Hardware Acceleration</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">USE GPU FOR MAP RENDERING</div>
                      </div>
                      <div className="w-12 h-6 bg-traffic-cyan/20 rounded-full border border-traffic-cyan flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-traffic-cyan rounded-full translate-x-6 shadow-[0_0_10px_currentColor]"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Holographic Effects</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">ENABLE BLUR AND SCANLINES</div>
                      </div>
                      <div className="w-12 h-6 bg-traffic-cyan/20 rounded-full border border-traffic-cyan flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-traffic-cyan rounded-full translate-x-6 shadow-[0_0_10px_currentColor]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-os-border pt-8">
                  <h2 className="text-xl text-white mb-2">AI Subsystem</h2>
                  <p className="text-sm text-gray-500 mb-6">Configure the automated reasoning engine.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Predictive Analysis Strictness</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">CONFIDENCE THRESHOLD</div>
                      </div>
                      <select className="bg-os-panel border border-os-border rounded-lg text-white text-sm p-2 outline-none">
                        <option>Aggressive (75%+)</option>
                        <option selected>Balanced (85%+)</option>
                        <option>Conservative (95%+)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'general' && (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 font-mono">
                <Monitor className="w-16 h-16 mb-4 opacity-20" />
                MODULE CONSTRUCTING...
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
