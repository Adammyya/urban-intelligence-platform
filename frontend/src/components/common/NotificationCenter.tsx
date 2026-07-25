import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, BrainCircuit, Info } from 'lucide-react';
import { useIncidentStore } from '../../store/useIncidentStore';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const incidents = useIncidentStore(state => state.incidents);
  const unreadCount = incidents.filter(i => i.status === 'ACTIVE').length;
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-os-panel border border-os-border text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-alert-red rounded-full border border-os-graphite animate-pulse"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-80 bg-os-panel border border-os-border rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
          >
            <div className="p-4 border-b border-os-border flex justify-between items-center bg-black/20">
              <h3 className="text-sm font-medium text-white tracking-wide">Notifications</h3>
              <span className="text-xs text-traffic-cyan font-mono">{unreadCount} UNREAD</span>
            </div>
            
            <div className="max-h-80 overflow-y-auto custom-scrollbar p-2 space-y-1">
              {incidents.length > 0 ? (
                incidents.slice(0, 5).map(incident => (
                  <div key={incident.id} className="p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      {incident.severity === 'CRITICAL' ? (
                        <AlertTriangle className="w-4 h-4 text-alert-red" />
                      ) : (
                        <Info className="w-4 h-4 text-traffic-cyan" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-200 font-medium group-hover:text-white transition-colors line-clamp-1">{incident.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{incident.description}</p>
                      <p className="text-[10px] text-gray-600 font-mono mt-2 uppercase">{incident.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500 text-sm">
                  No active alerts.
                </div>
              )}
            </div>
            
            <div className="p-2 border-t border-os-border">
              <button className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors text-center font-medium rounded-lg hover:bg-white/5">
                Mark all as read
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
