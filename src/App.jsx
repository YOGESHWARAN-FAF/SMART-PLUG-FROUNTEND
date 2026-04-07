import { useState, useEffect } from 'react';
import { Menu, Zap, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AppliancePredictor from './components/AppliancePredictor';
import HistoryAnalytics from './components/HistoryAnalytics';
import Settings from './components/Settings';
import { useThingSpeak } from './hooks/useThingSpeak';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, latestData, loading, error, refetch } = useThingSpeak();

  const tabTitles = {
    dashboard:  'Dashboard',
    prediction: 'Appliance Health',
    history:    'History Analytics',
    settings:   'Settings',
  };

  return (
    <div className="flex bg-[#f0fdf4] min-h-screen font-sans text-slate-800 transition-colors duration-500">

      {/* ── Mobile Top Navbar ── */}
      <div className="lg:hidden fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-emerald-100 h-16 flex items-center justify-between px-4 z-20 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-md">
            <Zap size={16} className="text-white" />
          </div>
          <div className="leading-tight">
            <span className="text-slate-800 font-black text-base tracking-tight">AI Smart Plug</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-emerald-50 rounded-xl text-emerald-700 hover:bg-emerald-500 hover:text-white transition shadow-sm"
          >
            <Menu size={20} />
          </motion.button>
        </div>
      </div>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-x-hidden pt-16 lg:pt-0">
        {activeTab === 'dashboard' && (
          <Dashboard
            data={data}
            latestData={latestData}
            loading={loading}
            error={error}
            refetch={refetch}
          />
        )}
        {activeTab === 'prediction' && (
          <AppliancePredictor latestData={latestData} />
        )}
        {activeTab === 'history' && (
          <HistoryAnalytics data={data} />
        )}
        {activeTab === 'settings' && (
          <Settings />
        )}
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-800/20 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
