import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Map as MapIcon, Database, Key, Monitor, User } from 'lucide-react';
import { useState } from 'react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General OS', icon: Monitor },
    { id: 'security', label: 'Security & Auth', icon: Shield },
    { id: 'map', label: 'Map Engine', icon: MapIcon },
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
                      <select defaultValue="Balanced" className="bg-os-panel border border-os-border rounded-lg text-white text-sm p-2 outline-none focus:border-ai-violet/50">
                        <option value="Aggressive">Aggressive (75%+)</option>
                        <option value="Balanced">Balanced (85%+)</option>
                        <option value="Conservative">Conservative (95%+)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl text-white mb-2">Security & Authentication</h2>
                  <p className="text-sm text-gray-500 mb-6">Manage access controls and session policies.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Require Multi-Factor Authentication</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">ENFORCE MFA FOR ALL ADMINS</div>
                      </div>
                      <div className="w-12 h-6 bg-traffic-cyan/20 rounded-full border border-traffic-cyan flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-traffic-cyan rounded-full translate-x-6 shadow-[0_0_10px_currentColor]"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Session Timeout</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">AUTO-LOGOUT AFTER INACTIVITY</div>
                      </div>
                      <select defaultValue="30m" className="bg-os-panel border border-os-border rounded-lg text-white text-sm p-2 outline-none focus:border-ai-violet/50">
                        <option value="15m">15 Minutes</option>
                        <option value="30m">30 Minutes</option>
                        <option value="1h">1 Hour</option>
                        <option value="never">Never (Not Recommended)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'map' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl text-white mb-2">Map Engine Settings</h2>
                  <p className="text-sm text-gray-500 mb-6">Customize the Digital Twin geospatial layer.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Default Map Style</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">TILESET PROVIDER</div>
                      </div>
                      <select defaultValue="dark-matter" className="bg-os-panel border border-os-border rounded-lg text-white text-sm p-2 outline-none focus:border-ai-violet/50">
                        <option value="dark-matter">Dark Matter (CARTO)</option>
                        <option value="satellite">Satellite (High Res)</option>
                        <option value="wireframe">Wireframe Matrix</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Radar Sweep Overlay</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">HOLOGRAPHIC SCAN EFFECT</div>
                      </div>
                      <div className="w-12 h-6 bg-traffic-cyan/20 rounded-full border border-traffic-cyan flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-traffic-cyan rounded-full translate-x-6 shadow-[0_0_10px_currentColor]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl text-white mb-2">Alert Routing</h2>
                  <p className="text-sm text-gray-500 mb-6">Manage how and when SYNAPSE sends notifications.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Critical Incident Sounds</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">AUDIO ALARM ON RED ALERTS</div>
                      </div>
                      <div className="w-12 h-6 bg-os-graphite rounded-full border border-os-border flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Email Digest</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">DAILY SYSTEM HEALTH REPORT</div>
                      </div>
                      <div className="w-12 h-6 bg-traffic-cyan/20 rounded-full border border-traffic-cyan flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-traffic-cyan rounded-full translate-x-6 shadow-[0_0_10px_currentColor]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl text-white mb-2">Data Pipeline</h2>
                  <p className="text-sm text-gray-500 mb-6">Manage Kafka streams and database ingestion rates.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div>
                        <div className="text-white text-sm">Telemetry Sync Rate</div>
                        <div className="text-xs text-gray-500 font-mono mt-1">WEBSOCKET POLLING INTERVAL</div>
                      </div>
                      <select defaultValue="100ms" className="bg-os-panel border border-os-border rounded-lg text-white text-sm p-2 outline-none focus:border-ai-violet/50">
                        <option value="10ms">Real-time (10ms)</option>
                        <option value="100ms">Fast (100ms)</option>
                        <option value="1000ms">Standard (1s)</option>
                      </select>
                    </div>
                    <div className="p-4 bg-ai-violet/10 border border-ai-violet/30 rounded-xl">
                      <div className="text-ai-violet font-mono text-sm mb-2">KAFKA CONNECTION: STABLE</div>
                      <div className="text-xs text-gray-400 font-sans">Currently connected to primary cluster (US-EAST-1).</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl text-white mb-2">API Keys</h2>
                  <p className="text-sm text-gray-500 mb-6">Manage external integrations and service tokens.</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div className="text-white text-sm mb-2">Google Maps Platform</div>
                      <div className="flex items-center gap-2">
                        <input type="password" value="************************" readOnly className="flex-1 bg-os-panel border border-os-border rounded-lg px-3 py-2 text-sm text-gray-400 font-mono" />
                        <button className="px-4 py-2 bg-os-panel border border-os-border text-gray-400 rounded-lg hover:text-white transition-colors text-sm font-mono">REGENERATE</button>
                      </div>
                    </div>
                    <div className="p-4 bg-os-graphite rounded-xl border border-os-border">
                      <div className="text-white text-sm mb-2">OpenAI / Claude Inference Endpoint</div>
                      <div className="flex items-center gap-2">
                        <input type="password" value="sk-************************" readOnly className="flex-1 bg-os-panel border border-os-border rounded-lg px-3 py-2 text-sm text-gray-400 font-mono" />
                        <button className="px-4 py-2 bg-os-panel border border-os-border text-gray-400 rounded-lg hover:text-white transition-colors text-sm font-mono">REGENERATE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
