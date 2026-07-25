import { Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

const PredictionConfidenceWidget = () => {
  // In a real scenario, this would come from the prediction service store.
  // For now, we simulate a changing confidence score.
  const [confidence, setConfidence] = useState(87);

  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newScore = prev + change;
        return Math.min(Math.max(newScore, 0), 100);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getColorClass = (score: number) => {
    if (score < 40) return 'text-success-green stroke-success-green';
    if (score < 75) return 'text-warning-orange stroke-warning-orange';
    return 'text-alert-red stroke-alert-red';
  };

  const colorClass = getColorClass(confidence);
  const circumference = 2 * Math.PI * 40; // r=40
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className="glass-panel p-4 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-neon-purple" />
        <h3 className="text-gray-200 font-medium tracking-wide">AI Prediction</h3>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Radial Progress Gauge */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90 absolute">
            <circle
              cx="64"
              cy="64"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-800"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${colorClass} transition-all duration-1000 ease-in-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold font-mono ${colorClass.split(' ')[0]}`}>
              {confidence}%
            </span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Congestion Probability</p>
          <p className="text-xs text-cyber-blue mt-1 font-mono">Model: XGBoost_v2</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionConfidenceWidget;
