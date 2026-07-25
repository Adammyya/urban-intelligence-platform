import { Activity, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Prediction {
  id: string;
  model: string;
  target: string;
  probability: number;
  impact: string;
  description: string;
}

const PredictionConfidenceWidget = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const API_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/v1/predict`);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        
        // Grab the most critical or just the first prediction
        if (data.inferences && data.inferences.length > 0) {
          // Sort by highest probability
          const sorted = data.inferences.sort((a: Prediction, b: Prediction) => b.probability - a.probability);
          setPrediction(sorted[0]);
          setError(false);
        }
      } catch (err) {
        console.error('[SYNAPSE AI ENGINE] Failed to fetch neural inference:', err);
        setError(true);
      }
    };

    fetchPrediction();
    const interval = setInterval(fetchPrediction, 5000);
    return () => clearInterval(interval);
  }, []);

  const confidence = prediction ? Math.round(prediction.probability * 100) : 0;

  const getColorClass = (score: number) => {
    if (score < 40) return 'text-success-green stroke-success-green';
    if (score < 75) return 'text-warning-orange stroke-warning-orange';
    return 'text-alert-red stroke-alert-red';
  };

  const colorClass = error ? 'text-gray-600 stroke-gray-600' : getColorClass(confidence);
  const circumference = 2 * Math.PI * 40; // r=40
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className="glass-panel p-4 flex flex-col h-full relative group overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Activity className={`w-5 h-5 ${error ? 'text-gray-600' : 'text-neon-purple'}`} />
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
              strokeDashoffset={error ? circumference : strokeDashoffset}
              className={`${colorClass} transition-all duration-1000 ease-in-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            {error ? (
              <AlertTriangle className="w-8 h-8 text-gray-600" />
            ) : (
              <span className={`text-3xl font-bold font-mono ${colorClass.split(' ')[0]}`}>
                {confidence}%
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-center w-full px-2">
          {error ? (
             <p className="text-gray-500 text-xs font-mono">NEURAL UPLINK FAILED</p>
          ) : prediction ? (
            <>
              <p className="text-gray-300 text-xs font-medium truncate">{prediction.target}</p>
              <p className="text-[10px] text-ai-violet mt-1 font-mono uppercase tracking-wider">{prediction.model}</p>
              
              {/* Tooltip for full description */}
              <div className="absolute inset-0 bg-os-graphite/95 backdrop-blur-md p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 rounded-xl">
                <span className={`text-[10px] font-mono px-2 py-1 border rounded mb-2 ${
                   prediction.impact === 'CRITICAL' ? 'border-alert-crimson text-alert-crimson' : 
                   prediction.impact === 'WARNING' ? 'border-warning-orange text-warning-orange' : 'border-success-green text-success-green'
                }`}>
                  IMPACT: {prediction.impact}
                </span>
                <p className="text-xs text-gray-300 text-center leading-relaxed">
                  {prediction.description}
                </p>
              </div>
            </>
          ) : (
             <p className="text-gray-500 text-xs font-mono">ANALYZING...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionConfidenceWidget;
