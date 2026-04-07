import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, CheckCircle2, AlertTriangle, Bell, Search } from 'lucide-react';

const Alerts = ({ latestData }) => {
  const alerts = [
    { id: 1, type: 'critical', title: 'High Temperature Detected', desc: `Operating temperature exceeded 50°C. Peak reached: ${latestData?.temperature || 55}°C.`, time: '10 mins ago', status: 'Active' },
    { id: 2, type: 'warning', title: 'Voltage Fluctuation', desc: 'Voltage dropped below 210V for 5 minutes during peak load.', time: '2 hours ago', status: 'Resolved' },
    { id: 3, type: 'info', title: 'Routine Maintenance', desc: 'System performed auto-diagnostic checks. All sensors normal.', time: '1 day ago', status: 'Logged' }
  ];

  return (
    <div className="flex-1 min-h-screen bg-slate-900 p-6 lg:p-8 ml-0 lg:ml-64 overflow-x-hidden pt-20 lg:pt-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">System Alerts</h1>
            <p className="text-slate-400">Manage rules and monitor critical events</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 min-h-4 min-w-4 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input type="text" placeholder="Search alerts..." className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64" />
          </div>
        </header>

        <div className="space-y-4">
          {alerts.map((alert, idx) => (
            <motion.div 
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between relative overflow-hidden bg-slate-800/80 hover:bg-slate-800 transition-colors ${
                alert.type === 'critical' ? 'border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' :
                alert.type === 'warning' ? 'border-yellow-500/30' : 'border-slate-700'
              }`}
            >
              <div className="flex gap-4 items-start">
                <div className={`mt-1 p-2 rounded-full ${
                  alert.type === 'critical' ? 'bg-red-500/20 text-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'
                }`}>
                  {alert.type === 'critical' && <AlertOctagon size={24} />}
                  {alert.type === 'warning' && <AlertTriangle size={24} />}
                  {alert.type === 'info' && <Bell size={24} />}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${alert.type === 'critical' ? 'text-red-400' : 'text-white'}`}>{alert.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{alert.desc}</p>
                  <p className="text-slate-500 text-xs mt-2 font-medium">{alert.time}</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  alert.status === 'Active' ? 'bg-red-500/10 text-red-500 border-red-500/30 animate-pulse' :
                  alert.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                  'bg-slate-700 text-slate-300 border-slate-600'
                }`}>
                  {alert.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
