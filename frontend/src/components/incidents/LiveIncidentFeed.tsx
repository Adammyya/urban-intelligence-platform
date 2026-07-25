import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, MapPin, ShieldAlert } from 'lucide-react';
import { useIncidentStore } from '../../store/useIncidentStore';

const LiveIncidentFeed = () => {
  const incidents = useIncidentStore(state => state.incidents);

  // In a real app with a backend, we would fetch here.
  // For now, we rely on the mock data in the Zustand store.
  useEffect(() => {
    // Component mounted
  }, []);

  return (
    <div className="bg-os-panel border border-os-border rounded-2xl p-6 shadow-2xl relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <ShieldAlert className="w-32 h-32 text-alert-crimson" />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h2 className="text-xl font-medium text-white tracking-wide">Incident Command</h2>
          <p className="text-xs text-gray-500 font-mono mt-1">ACTIVE TIMELINE</p>
        </div>
        <div className="px-3 py-1 rounded border border-alert-crimson/30 bg-alert-crimson/10 text-alert-crimson font-mono text-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-alert-crimson animate-pulse"></span>
          {incidents.length} ACTIVE
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 relative z-10">
        <AnimatePresence>
          {incidents.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="text-center text-gray-500 font-mono text-sm py-10"
             >
               NO ACTIVE INCIDENTS DETECTED
             </motion.div>
          ) : (
            incidents.map((incident, index) => {
              const isHighSeverity = incident.severity === 'HIGH' || incident.severity === 'CRITICAL';
              const colorClass = isHighSeverity ? 'text-alert-crimson' : 'text-warn-amber';
              const bgClass = isHighSeverity ? 'bg-alert-crimson/10 border-alert-crimson/30' : 'bg-warn-amber/10 border-warn-amber/30';
              
              return (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border ${bgClass} backdrop-blur-md hover:bg-os-border transition-colors group cursor-pointer relative overflow-hidden`}
                >
                  {/* Holographic scanning line effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[scan_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />

                  <div className="flex justify-between items-start mb-2 relative z-10">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={`w-4 h-4 ${colorClass}`} />
                      <span className={`font-mono text-xs font-bold tracking-wider ${colorClass}`}>
                        {incident.type.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      LIVE
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3 relative z-10">{incident.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-mono relative z-10">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">Lat: {incident.lat.toFixed(4)}, Lng: {incident.lng.toFixed(4)}</span>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveIncidentFeed;
