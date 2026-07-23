import LiveMapWidget from '../components/map/LiveMapWidget';

const DashboardPage = () => {
  return (
    <div className="absolute inset-0 bg-[#050505]">
      {/* Interactive React Leaflet Map */}
      <LiveMapWidget />

      {/* Floating UI Elements */}
      <div className="absolute inset-0 p-6 pointer-events-none flex flex-col justify-end">
        
        {/* Bottom Row Intelligence Panels */}
        <div className="grid grid-cols-3 gap-6 pointer-events-auto">
          
          {/* Panel 1: Prediction */}
          <div className="glass-panel p-5 relative overflow-hidden group hover:border-cyber-blue/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue to-neon-purple opacity-50"></div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4 flex items-center justify-between">
              <span>AI Prediction</span>
              <span className="text-xs text-cyber-blue px-2 py-1 bg-cyber-blue/10 rounded-full">XGBoost_v2</span>
            </h3>
            <div className="flex items-end gap-4">
              <div>
                <div className="text-3xl font-mono font-bold text-white">87<span className="text-lg text-gray-500">%</span></div>
                <div className="text-xs text-warning-orange mt-1">Congestion Probability</div>
              </div>
              <div className="flex-1 h-12 flex items-end justify-between gap-1 opacity-70">
                {/* Mock Chart Bars */}
                {[40, 50, 45, 60, 75, 87].map((h, i) => (
                  <div key={i} className="w-full bg-gradient-to-t from-neon-purple to-cyber-blue rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 2: Alerts */}
          <div className="glass-panel p-5 relative overflow-hidden group hover:border-alert-red/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-alert-red opacity-50"></div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4 flex items-center justify-between">
              <span>Active Alerts</span>
              <span className="text-xs text-alert-red px-2 py-1 bg-alert-red/10 rounded-full animate-pulse">1 Critical</span>
            </h3>
            <div className="bg-alert-red/10 border border-alert-red/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-alert-red font-medium mb-1">
                <span className="w-2 h-2 rounded-full bg-alert-red"></span>
                Accident - Route 101 North
              </div>
              <div className="text-xs text-gray-300">Multiple vehicles involved. Expect delays up to 45 mins. AI Recommending re-route to Arterial 4.</div>
            </div>
          </div>

          {/* Panel 3: System Health */}
          <div className="glass-panel p-5 relative overflow-hidden group hover:border-success-green/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-success-green opacity-50"></div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Platform Health
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-gray-300">API Gateway</span>
                <span className="text-success-green">99.9% UP</span>
              </div>
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-gray-300">Kafka Stream</span>
                <span className="text-success-green">14k msg/s</span>
              </div>
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-gray-300">Sensors Active</span>
                <span className="text-cyber-blue">1,042 / 1,050</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
