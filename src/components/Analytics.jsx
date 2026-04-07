import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { DownloadIcon, FilterIcon, Calendar } from 'lucide-react';

const Analytics = ({ data }) => {
  // We'll prepare some aggregated data out of `data` (which is ThingSpeak feeds limit=50)
  // For UI sake, we display energy distribution, average power, etc.

  const currentAvg = data.length > 0 ? (data.reduce((acc, curr) => acc + curr.current, 0) / data.length).toFixed(2) : 0;
  const powerAvg = data.length > 0 ? (data.reduce((acc, curr) => acc + curr.power, 0) / data.length).toFixed(0) : 0;
  const tempAvg = data.length > 0 ? (data.reduce((acc, curr) => acc + curr.temperature, 0) / data.length).toFixed(1) : 0;

  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  const distributionData = [
    { name: 'Lighting', value: 400 },
    { name: 'Cooling/Heating', value: 300 },
    { name: 'Appliances', value: 300 },
    { name: 'Idle/Vampire', value: 200 }
  ];

  return (
    <div className="flex-1 min-h-screen bg-slate-900 p-6 lg:p-8 ml-0 lg:ml-64 overflow-x-hidden pt-20 lg:pt-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Deep Analytics</h1>
            <p className="text-slate-400">Comprehensive power utilization and historical trends</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg border border-slate-700 transition-colors text-sm font-medium">
              <Calendar size={16} /> Last 24 Hours
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium shadow-lg shadow-blue-500/20">
              <DownloadIcon size={16} /> Export Report
            </button>
          </div>
        </header>

        {/* Top summary stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
             <p className="text-slate-400 text-sm font-medium mb-1 relative z-10">Average Power Rating</p>
             <h3 className="text-3xl font-bold text-white relative z-10">{powerAvg} <span className="text-sm font-medium text-slate-400">W</span></h3>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
             <p className="text-slate-400 text-sm font-medium mb-1 relative z-10">Mean Current Load</p>
             <h3 className="text-3xl font-bold text-white relative z-10">{currentAvg} <span className="text-sm font-medium text-slate-400">A</span></h3>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
             <p className="text-slate-400 text-sm font-medium mb-1 relative z-10">Thermal Average</p>
             <h3 className="text-3xl font-bold text-white relative z-10">{tempAvg} <span className="text-sm font-medium text-slate-400">°C</span></h3>
          </motion.div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-6">Power & Energy Area Profile</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="created_at" stroke="#64748b" tick={{ fontSize: 12 }} tickMargin={10} minTickGap={30} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="power" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPower)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
             <h3 className="text-lg font-bold text-white mb-6">Predicted Load Distribution</h3>
             <div className="h-64 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={distributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="flex flex-wrap justify-center gap-3 mt-4">
                {distributionData.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PIE_COLORS[idx] }}></span>
                    {entry.name}
                  </div>
                ))}
             </div>
          </motion.div>
        </div>

        {/* Data Table */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/80">
            <h3 className="text-lg font-bold text-white">Latest Data Points</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"><FilterIcon size={14}/> Filter</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-900/50 text-slate-300 font-medium">
                <tr>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Voltage (V)</th>
                  <th className="px-6 py-4">Current (A)</th>
                  <th className="px-6 py-4">Power (W)</th>
                  <th className="px-6 py-4">Temp (°C)</th>
                  <th className="px-6 py-4">P. Factor</th>
                </tr>
              </thead>
              <tbody>
                {data.slice().reverse().slice(0, 5).map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-4 text-white">{row.created_at}</td>
                    <td className="px-6 py-4">{row.voltage.toFixed(2)}</td>
                    <td className="px-6 py-4">{row.current.toFixed(2)}</td>
                    <td className="px-6 py-4">{row.power.toFixed(2)}</td>
                    <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.temperature > 50 ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>{row.temperature.toFixed(2)} °C</span></td>
                    <td className="px-6 py-4">{row.pf.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
