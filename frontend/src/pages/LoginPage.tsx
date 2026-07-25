import { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('admin@synapse.os');
  const [password, setPassword] = useState('admin');
  const login = useAuthStore(state => state.login);
  const isLoading = useAuthStore(state => state.isLoading);
  const error = useAuthStore(state => state.error);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    // If login is successful, the ProtectedRoute will handle the redirect, 
    // or we can force it here just in case.
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-ai-violet/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-traffic-cyan/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md p-8 relative"
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl"></div>
        
        <div className="relative z-20">
          <div className="flex flex-col items-center justify-center mb-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ai-violet/20 to-traffic-cyan/20 border border-ai-violet/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(160,32,240,0.2)]"
            >
              <BrainCircuit className="w-8 h-8 text-traffic-cyan" />
            </motion.div>
            <h1 className="text-3xl font-light text-white tracking-[0.2em]">SYNAPSE <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-ai-violet to-traffic-cyan">OS</span></h1>
            <p className="text-gray-400 text-sm mt-2 font-mono tracking-widest uppercase">Urban Intelligence System</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-alert-crimson/10 border border-alert-crimson/30 rounded-lg p-3 mb-6 flex items-center gap-3 text-alert-crimson text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-mono uppercase tracking-wider ml-1">Operator ID / Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-traffic-cyan transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-traffic-cyan/50 focus:ring-1 focus:ring-traffic-cyan/50 transition-all placeholder:text-gray-600"
                  placeholder="operator@synapse.os"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-mono uppercase tracking-wider ml-1">Access Code</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-ai-violet transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111111] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-ai-violet/50 focus:ring-1 focus:ring-ai-violet/50 transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-ai-violet/80 to-traffic-cyan/80 hover:from-ai-violet hover:to-traffic-cyan text-white rounded-lg py-3 font-medium tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(160,32,240,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>INITIALIZE UPLINK</span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-600 font-mono flex items-center justify-between">
            <span>SECURE ENCLAVE ACTIVE</span>
            <span>v2.0.0</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
