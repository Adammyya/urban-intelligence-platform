import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, MapPin, ShieldAlert, BrainCircuit, Activity, Radio, Cloud, Zap, Eye } from 'lucide-react';
import { useIncidentStore } from '../../store/useIncidentStore';
import { useCityEventStore } from '../../store/useCityEventStore';
import type { CityEventType } from '../../store/useCityEventStore';

const eventConfig: Record<CityEventType, { icon: any; color: string; bgClass: string }> = {
  INCIDENT: { icon: ShieldAlert, color: '#ff2a2a', bgClass: 'bg-[#ff2a2a]/10 border-[#ff2a2a]/30' },
  EMERGENCY_DISPATCH: { icon: AlertTriangle, color: '#ff2a2a', bgClass: 'bg-[#ff2a2a]/10 border-[#ff2a2a]/30' },
  SENSOR_ALERT: { icon: Radio, color: '#10b981', bgClass: 'bg-[#10b981]/10 border-[#10b981]/30' },
  PREDICTION: { icon: BrainCircuit, color: '#a020f0', bgClass: 'bg-[#a020f0]/10 border-[#a020f0]/30' },
  TRAFFIC: { icon: Activity, color: '#ff9900', bgClass: 'bg-[#ff9900]/10 border-[#ff9900]/30' },
  AI_OBSERVATION: { icon: Eye, color: '#00f0ff', bgClass: 'bg-[#00f0ff]/10 border-[#00f0ff]/30' },
  WEATHER: { icon: Cloud, color: '#3b82f6', bgClass: 'bg-[#3b82f6]/10 border-[#3b82f6]/30' },
  INFRASTRUCTURE: { icon: Zap, color: '#ff9900', bgClass: 'bg-[#ff9900]/10 border-[#ff9900]/30' },
};

const LiveIncidentFeed = () => {
  const incidents = useIncidentStore(state => state.incidents);
  const cityEvents = useCityEventStore(state => state.events);

  // Merge incidents and city events into a unified feed
  const allEvents = [
    ...cityEvents.map(e => ({
      id: e.id,
      type: e.type as CityEventType,
      severity: e.severity,
      title: e.title,
      description: e.description,
      lat: e.lat,
      lng: e.lng,
      timestamp: e.timestamp,
      source: 'event_bus' as const,
    })),
    ...incidents.map(inc => ({
      id: inc.id,
      type: 'INCIDENT' as CityEventType,
      severity: inc.severity,
      title: inc.type.replace('_', ' '),
      description: inc.description,
      lat: inc.lat,
      lng: inc.lng,
      timestamp: inc.timestamp,
      source: 'rest_api' as const,
    })),
  ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 15);

  const criticalCount = allEvents.filter(e => e.severity === 'CRITICAL').length;

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div>
          <h2 className="text-lg font-medium text-white tracking-wide">Intelligence Stream</h2>
          <p className="text-[10px] text-gray-500 font-mono">LIVE FEED</p>
        </div>
        <div className={`px-2.5 py-1 rounded border font-mono text-[10px] flex items-center gap-1.5 ${
          criticalCount > 0 
            ? 'border-alert-crimson/30 bg-alert-crimson/10 text-alert-crimson' 
            : 'border-traffic-cyan/30 bg-traffic-cyan/10 text-traffic-cyan'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${criticalCount > 0 ? 'bg-alert-crimson' : 'bg-traffic-cyan'}`}></span>
          {allEvents.length} EVENTS
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2 min-h-0">
        <AnimatePresence initial={false}>
          {allEvents.length === 0 ? (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="text-center text-gray-500 font-mono text-sm py-10"
             >
               AWAITING INTELLIGENCE...
             </motion.div>
          ) : (
            allEvents.map((event) => {
              const config = eventConfig[event.type] || eventConfig.INCIDENT;
              const Icon = config.icon;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-xl border ${config.bgClass} backdrop-blur-md hover:bg-white/5 transition-colors group cursor-pointer relative overflow-hidden`}
                >
                  {/* Scanning line on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[scan_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />

                  <div className="flex items-start gap-2.5 relative z-10">
                    <div className="shrink-0 mt-0.5 p-1 rounded-md" style={{ backgroundColor: `${config.color}15` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[10px] font-bold tracking-wider uppercase" style={{ color: config.color }}>
                          {event.title}
                        </span>
                        <span className="text-[9px] text-gray-600 font-mono flex items-center gap-1 shrink-0 ml-2">
                          <Clock className="w-2.5 h-2.5" />
                          {formatTime(event.timestamp)}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">{event.description}</p>
                    </div>
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
