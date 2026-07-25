import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useIncidentStore } from '../../store/useIncidentStore';

const LiveIncidentFeed = () => {
  const incidents = useIncidentStore(state => state.incidents);
  const activeIncident = useIncidentStore(state => state.activeIncident);
  const setActiveIncident = useIncidentStore(state => state.setActiveIncident);

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-alert-red animate-pulse" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-warning-orange" />;
      default:
        return <Info className="w-5 h-5 text-cyber-blue" />;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'border-alert-red/30 bg-alert-red/5 hover:border-alert-red/60';
      case 'medium':
        return 'border-warning-orange/30 bg-warning-orange/5 hover:border-warning-orange/60';
      default:
        return 'border-cyber-blue/30 bg-cyber-blue/5 hover:border-cyber-blue/60';
    }
  };

  return (
    <div className="glass-panel p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-alert-red" />
          <h3 className="text-gray-200 font-medium tracking-wide">Active Alerts</h3>
        </div>
        <span className="px-2 py-1 bg-alert-red/20 text-alert-red text-xs rounded-full font-bold">
          {incidents.filter(i => i.severity.toLowerCase() === 'high').length} Critical
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {incidents.length === 0 ? (
          <div className="text-gray-500 text-sm text-center mt-10">No active incidents</div>
        ) : (
          incidents.map((incident) => {
            const isSelected = activeIncident?.id === incident.id;
            return (
              <div 
                key={incident.id}
                onClick={() => setActiveIncident(incident)}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${getSeverityStyle(incident.severity)} ${isSelected ? 'shadow-[0_0_10px_rgba(255,42,42,0.3)] border-alert-red scale-[1.02]' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getSeverityIcon(incident.severity)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-200">
                      {incident.type} - {incident.location || 'Unknown Location'}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {incident.description || 'Multiple vehicles involved. Expect delays up to 45 mins. AI Recommending re-route to Arterial 4.'}
                    </p>
                    <div className="text-[10px] text-gray-500 mt-2 font-mono">
                      LAT: {incident.lat.toFixed(4)} | LNG: {incident.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LiveIncidentFeed;
