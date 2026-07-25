import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Map, Activity, Radio, LayoutDashboard, BrainCircuit, AlertTriangle, FileText, Settings, X, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const commands = [
  { id: 'dashboard', name: 'Open Mission Control', icon: Globe, path: '/mission-control' },
  { id: 'map', name: 'View Live Map', icon: Map, path: '/map' },
  { id: 'traffic', name: 'Analyze Traffic Flow', icon: Activity, path: '/traffic' },
  { id: 'sensors', name: 'Manage IoT Sensors', icon: Radio, path: '/sensors' },
  { id: 'predictions', name: 'AI Predictions', icon: BrainCircuit, path: '/predictions' },
  { id: 'incidents', name: 'Active Incidents', icon: AlertTriangle, path: '/incidents' },
  { id: 'reports', name: 'Generate Reports', icon: FileText, path: '/reports' },
  { id: 'settings', name: 'System Settings', icon: Settings, path: '/settings' },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-os-graphite/80 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl bg-os-graphite border border-os-border rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center border-b border-os-border p-4">
                <Search className="w-5 h-5 text-traffic-cyan ml-2 mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type a command or search (e.g. 'Traffic')..."
                  className="w-full bg-transparent text-white focus:outline-none font-sans text-lg placeholder:text-gray-600"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-1">
                    {filteredCommands.map((cmd) => (
                      <button
                        key={cmd.id}
                        onClick={() => executeCommand(cmd.path)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-os-border text-left group transition-all"
                      >
                        <div className="p-2 rounded-lg bg-os-panel group-hover:bg-traffic-cyan/10 group-hover:text-traffic-cyan text-gray-400 transition-colors">
                          <cmd.icon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white font-medium">{cmd.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500 font-mono text-sm">
                    NO DIRECTIVES FOUND FOR "{query.toUpperCase()}"
                  </div>
                )}
              </div>
              
              <div className="bg-os-panel p-3 border-t border-os-border flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                <span>SYNAPSE OS Command Interface</span>
                <div className="flex gap-4">
                  <span><kbd className="px-1.5 py-0.5 rounded bg-os-border border border-gray-800">↑↓</kbd> to navigate</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-os-border border border-gray-800">↵</kbd> to select</span>
                  <span><kbd className="px-1.5 py-0.5 rounded bg-os-border border border-gray-800">ESC</kbd> to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
