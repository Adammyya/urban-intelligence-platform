import { motion } from 'framer-motion';
import { useSensorStore } from '../store/useSensorStore';
import type { Sensor } from '../store/useSensorStore';
import { Radio, Search, Filter, RefreshCw, Server, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const SensorsPage = () => {
  const sensors = useSensorStore(state => state.sensors);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE' | 'ERROR'>('ALL');

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sensor.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || sensor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Sensor['status']) => {
    switch(status) {
      case 'ACTIVE': return 'text-infra-emerald bg-infra-emerald/10 border-infra-emerald/30';
      case 'INACTIVE': return 'text-warn-amber bg-warn-amber/10 border-warn-amber/30';
      case 'ERROR': return 'text-alert-crimson bg-alert-crimson/10 border-alert-crimson/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  return (
    <div className="h-full w-full p-8 flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-ai-violet/10 rounded-xl border border-ai-violet/20">
            <Radio className="w-8 h-8 text-ai-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-light text-white tracking-wide">Sensor Fleet</h1>
            <p className="text-sm text-gray-500 font-mono mt-1">NODE MANAGEMENT CONSOLE</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-os-panel border border-os-border rounded-lg text-sm text-gray-400 font-mono">
            <Server className="w-4 h-4" />
            <span>TOTAL: {sensors.length}</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-traffic-cyan/10 border border-traffic-cyan/30 rounded-lg text-sm text-traffic-cyan hover:bg-traffic-cyan/20 transition-colors font-mono">
            <RefreshCw className="w-4 h-4" />
            SYNC
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by ID or Type..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-os-panel border border-os-border rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-ai-violet/50 transition-colors font-mono"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="appearance-none bg-os-panel border border-os-border rounded-lg py-3 pl-12 pr-10 text-gray-300 focus:outline-none focus:border-ai-violet/50 font-mono"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 bg-os-panel border border-os-border rounded-xl overflow-hidden flex flex-col shadow-2xl relative">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-os-border bg-os-graphite/50 text-xs font-mono tracking-widest text-gray-500 shrink-0">
          <div>SENSOR ID</div>
          <div>TYPE</div>
          <div>STATUS</div>
          <div>COORDINATES</div>
          <div>BATTERY / SIGNAL</div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {filteredSensors.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 font-mono">
              <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
              NO SENSORS FOUND MATCHING CRITERIA
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredSensors.map((sensor, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={sensor.id}
                  className="grid grid-cols-5 gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors items-center border border-transparent hover:border-os-border group"
                >
                  <div className="font-mono text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-os-graphite border border-os-border flex items-center justify-center text-xs group-hover:border-traffic-cyan/50 transition-colors">
                       <Radio className="w-4 h-4 text-traffic-cyan" />
                    </div>
                    {sensor.id}
                  </div>
                  
                  <div className="text-gray-400 text-sm">{sensor.type}</div>
                  
                  <div>
                    <span className={`px-2 py-1 rounded border text-[10px] font-mono tracking-wider flex items-center gap-1.5 w-max ${getStatusColor(sensor.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {sensor.status}
                    </span>
                  </div>
                  
                  <div className="text-gray-500 font-mono text-xs">
                    {sensor.lat.toFixed(4)}, {sensor.lng.toFixed(4)}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-1.5 w-16 bg-os-graphite rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${sensor.battery > 20 ? 'bg-infra-emerald' : 'bg-alert-crimson'}`} 
                        style={{ width: `${sensor.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{Math.floor(sensor.battery)}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default SensorsPage;
