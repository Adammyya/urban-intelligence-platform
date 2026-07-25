import { motion } from 'framer-motion';
import { AlertTriangle, Clock, MapPin, Filter, Download } from 'lucide-react';
import LiveIncidentFeed from '../components/incidents/LiveIncidentFeed';
import { useIncidentStore } from '../store/useIncidentStore';

const IncidentsPage = () => {
  const incidents = useIncidentStore(state => state.incidents);

  return (
    <div className="h-full w-full p-8 flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-ai-violet/10 rounded-xl border border-ai-violet/20">
            <AlertTriangle className="w-8 h-8 text-ai-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-light text-white tracking-wide">Incident Command</h1>
            <p className="text-sm text-gray-500 font-mono mt-1">EMERGENCY OPERATIONS CENTER</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-os-panel border border-os-border rounded-lg text-sm text-gray-400 hover:text-white transition-colors font-mono">
            <Filter className="w-4 h-4" />
            FILTER
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-os-panel border border-os-border rounded-lg text-sm text-gray-400 hover:text-white transition-colors font-mono">
            <Download className="w-4 h-4" />
            EXPORT LOG
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* Left: Feed Widget */}
        <div className="w-1/3 h-full shrink-0">
          <LiveIncidentFeed />
        </div>

        {/* Right: Detailed Table / Grid */}
        <div className="flex-1 bg-os-panel border border-os-border rounded-xl p-6 overflow-y-auto custom-scrollbar relative shadow-2xl">
          <h2 className="text-lg text-white mb-6 font-medium">Historical Incident Log</h2>
          
          <div className="space-y-4">
            {incidents.map((incident, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={`log-${incident.id}`} 
                className="p-4 bg-os-graphite border border-os-border rounded-xl flex items-center justify-between hover:border-ai-violet/50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    incident.severity === 'CRITICAL' ? 'bg-alert-crimson/20 text-alert-crimson border border-alert-crimson/50' : 'bg-warn-amber/20 text-warn-amber border border-warn-amber/50'
                  }`}>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{incident.type}</div>
                    <div className="text-sm text-gray-400">{incident.description}</div>
                  </div>
                </div>

                <div className="flex gap-12 font-mono text-sm text-gray-500">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600">SEVERITY</span>
                    <span className={incident.severity === 'CRITICAL' ? 'text-alert-crimson' : 'text-warn-amber'}>{incident.severity}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600">LOCATION</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {incident.lat.toFixed(2)}, {incident.lng.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600">TIME</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default IncidentsPage;
