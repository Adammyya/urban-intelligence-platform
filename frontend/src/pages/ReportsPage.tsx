import { motion } from 'framer-motion';
import { Globe, RefreshCw, ExternalLink, AlertTriangle, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
}

const ReportsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // BBC World News via RSS2JSON (Free, No CORS, No API Key)
      const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/news/world/rss.xml');
      const data = await res.json();
      
      if (data.status === 'ok') {
        setNews(data.items);
        if (data.items.length > 0) {
          setSelectedArticle(data.items[0]);
        }
      } else {
        throw new Error('Failed to parse news feed');
      }
    } catch (err: any) {
      setError(err.message || 'Connection to Intel Feed lost.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh the feed every 5 minutes
    const interval = setInterval(() => {
      fetchNews();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Helper to format date
  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleString('en-US', { 
      month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false 
    });
  };

  return (
    <div className="h-full w-full p-8 flex flex-col gap-6 overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0 mb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-ai-violet/10 rounded-xl border border-ai-violet/20">
            <Globe className="w-8 h-8 text-ai-violet" />
          </div>
          <div>
            <h1 className="text-3xl font-light text-white tracking-wide">Global Intel Feed</h1>
            <p className="text-sm text-gray-500 font-mono mt-1">LIVE BBC WORLD NEWS STREAM</p>
          </div>
        </div>
        
        <button 
          onClick={fetchNews}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-os-panel border border-os-border rounded-lg text-sm text-gray-300 hover:text-white transition-colors font-mono disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-ai-violet' : ''}`} />
          {loading ? 'SYNCING...' : 'SYNC FEED'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 bg-os-panel border border-os-border rounded-2xl shadow-2xl overflow-hidden flex">
        
        {/* Left: Article List */}
        <div className="w-1/3 border-r border-os-border bg-os-graphite/30 p-4 flex flex-col gap-4 relative">
          
          <div className="relative shrink-0">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
             <input 
               type="text" 
               placeholder="Filter Intel..." 
               className="w-full bg-os-panel border border-os-border rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-ai-violet/50 transition-colors font-mono"
             />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {loading && news.length === 0 && (
               <div className="flex flex-col items-center justify-center h-48 text-gray-500 font-mono text-sm gap-4">
                 <RefreshCw className="w-6 h-6 animate-spin text-ai-violet" />
                 ESTABLISHING UPLINK...
               </div>
            )}

            {error && (
               <div className="flex flex-col items-center justify-center h-48 text-alert-crimson font-mono text-sm gap-4 text-center px-4">
                 <AlertTriangle className="w-8 h-8" />
                 {error}
               </div>
            )}

            {!loading && !error && news.map((article, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={article.guid} 
                onClick={() => setSelectedArticle(article)}
                className={`p-4 border rounded-xl cursor-pointer transition-colors group ${
                  selectedArticle?.guid === article.guid 
                    ? 'bg-ai-violet/10 border-ai-violet/50 shadow-[inset_4px_0_0_rgba(160,32,240,1)]' 
                    : 'bg-os-panel border-os-border hover:border-gray-500'
                }`}
              >
                <div className={`text-sm mb-2 line-clamp-2 ${selectedArticle?.guid === article.guid ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {article.title}
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 tracking-wider">
                  <span>{formatDate(article.pubDate)}</span>
                  <span className="uppercase px-1.5 py-0.5 bg-os-graphite rounded border border-os-border text-ai-violet/80">GLOBAL</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Article Preview */}
        <div className="flex-1 p-8 bg-[#0a0a0a] relative overflow-y-auto custom-scrollbar">
          
          {selectedArticle ? (
            <motion.div 
              key={selectedArticle.guid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto flex flex-col gap-6"
            >
              <div className="flex justify-between items-start border-b border-os-border pb-6">
                <div>
                  <h1 className="text-2xl font-light text-white mb-2 leading-tight">{selectedArticle.title}</h1>
                  <div className="text-xs text-ai-violet font-mono tracking-widest uppercase">
                    INTERCEPTED: {formatDate(selectedArticle.pubDate)}
                  </div>
                </div>
              </div>
              
              {selectedArticle.thumbnail && (
                <div className="w-full h-64 rounded-xl overflow-hidden border border-os-border">
                  <img 
                    src={selectedArticle.thumbnail} 
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="text-gray-300 leading-relaxed font-sans text-sm p-6 bg-os-panel border border-os-border rounded-xl">
                {/* RSS2JSON provides HTML description sometimes, we strip it out for safety or just render text */}
                <p dangerouslySetInnerHTML={{ __html: selectedArticle.description }}></p>
              </div>

              <div className="mt-4 flex justify-end">
                <a 
                  href={selectedArticle.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-ai-violet/20 border border-ai-violet/50 text-ai-violet rounded-lg font-mono text-sm hover:bg-ai-violet transition-colors hover:text-white"
                >
                  <ExternalLink className="w-4 h-4" />
                  READ SOURCE DOCUMENT
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 font-mono gap-4 opacity-50">
              <Globe className="w-16 h-16" />
              SELECT AN INTEL BRIEFING
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ReportsPage;
