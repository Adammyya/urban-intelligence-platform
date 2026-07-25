import LiveMapWidget from '../components/map/LiveMapWidget';
import PredictionConfidenceWidget from '../components/predictions/PredictionConfidenceWidget';
import LiveIncidentFeed from '../components/incidents/LiveIncidentFeed';
import TrafficAnalyticsWidget from '../components/analytics/TrafficAnalyticsWidget';

const DashboardPage = () => {
  return (
    <div className="absolute inset-0 bg-[#050505] overflow-hidden">
      {/* Interactive React Leaflet Map */}
      <LiveMapWidget />

      {/* Floating UI Elements */}
      <div className="absolute inset-0 p-6 pointer-events-none flex flex-col justify-between z-10">
        
        {/* Top Row - Analytics (Right Aligned) */}
        <div className="w-full flex justify-end pointer-events-auto mt-16">
          <TrafficAnalyticsWidget />
        </div>

        {/* Bottom Row Intelligence Panels */}
        <div className="grid grid-cols-3 gap-6 pointer-events-auto h-64">
          
          {/* Panel 1: Prediction */}
          <div className="relative group hover:border-cyber-blue/50 transition-colors h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue to-neon-purple opacity-50 z-10 rounded-t-xl"></div>
            <PredictionConfidenceWidget />
          </div>

          {/* Panel 2: Alerts */}
          <div className="relative group hover:border-alert-red/50 transition-colors h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-alert-red opacity-50 z-10 rounded-t-xl"></div>
            <LiveIncidentFeed />
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
