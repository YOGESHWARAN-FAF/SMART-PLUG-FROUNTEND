import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings2, Save, Database, Key } from 'lucide-react';

const Settings = () => {
  const [configs, setConfigs] = useState({
    channelId: '',
    readApiKey: ''
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Load existing settings
    const storedChannel = localStorage.getItem('ts_channel_id') || '3325660';
    const storedApiKey = localStorage.getItem('ts_read_key') || 'YTW9OE3XCWDSG0WZ';
    setConfigs({ channelId: storedChannel, readApiKey: storedApiKey });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('ts_channel_id', configs.channelId);
    localStorage.setItem('ts_read_key', configs.readApiKey);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      window.location.reload(); // Reload to fetch fresh data
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 min-h-screen bg-slate-50 p-6 lg:p-10 ml-0 lg:ml-64 overflow-x-hidden pt-20 lg:pt-10 transition-colors duration-500"
    >
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-lg">Configure your ThingSpeak connection and application preferences.</p>
        </header>

        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-green-100 border border-green-50 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-300">
                <Database className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">ThingSpeak Integration</h2>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1 flex items-center gap-2">
                  <Database className="w-4 h-4 text-yellow-500" /> Channel ID
                </label>
                <input 
                  type="text" 
                  required 
                  value={configs.channelId} 
                  onChange={(e) => setConfigs({...configs, channelId: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all placeholder-slate-400 font-medium" 
                  placeholder="e.g., 3325660" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1 flex items-center gap-2">
                  <Key className="w-4 h-4 text-green-500" /> Read API Key
                </label>
                <input 
                  type="text" 
                  required 
                  value={configs.readApiKey} 
                  onChange={(e) => setConfigs({...configs, readApiKey: e.target.value})} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all placeholder-slate-400 font-medium font-mono" 
                  placeholder="e.g., YTW9OE3XCWDSG0WZ" 
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="mt-8 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 text-lg"
              >
                {isSaved ? (
                  <><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Save className="w-5 h-5" /></motion.div> Configuration Saved!</>
                ) : (
                  <><Settings2 className="w-5 h-5" /> Save Configuration</>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;
