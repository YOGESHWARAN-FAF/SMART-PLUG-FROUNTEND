import { motion } from 'framer-motion';
import { Activity, Zap, Waves, Battery, Gauge, AlignCenterVertical, Flame, History, BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ChartSection from './ChartSection';

const HistoryAnalytics = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 ml-0 lg:ml-64 p-6 lg:p-10 pt-20 lg:pt-10">
        <div className="text-center bg-white p-8 rounded-3xl shadow-lg border border-slate-200">
          <History className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700">No Historical Data</h2>
          <p className="text-slate-500 mt-2">Waiting for connection to synchronize historical metrics...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const getStats = (key) => {
    const values = data.map(d => d[key]).filter(v => v !== undefined && v !== null);
    if (!values.length) return { min: 0, max: 0, avg: 0, current: 0 };
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      current: values[values.length - 1]
    };
  };

  const metrics = [
    { key: 'voltage', name: 'Voltage', unit: 'V', color: 'from-amber-400 to-yellow-500', hex: '#f59e0b', icon: <Zap className="w-5 h-5" /> },
    { key: 'current', name: 'Current', unit: 'A', color: 'from-blue-400 to-blue-600', hex: '#3b82f6', icon: <Activity className="w-5 h-5" /> },
    { key: 'power', name: 'Power', unit: 'W', color: 'from-emerald-400 to-green-600', hex: '#10b981', icon: <Battery className="w-5 h-5" /> },
    { key: 'energy', name: 'Energy', unit: 'kWh', color: 'from-purple-400 to-indigo-500', hex: '#8b5cf6', icon: <Gauge className="w-5 h-5" /> },
    { key: 'frequency', name: 'Frequency', unit: 'Hz', color: 'from-cyan-400 to-teal-500', hex: '#06b6d4', icon: <AlignCenterVertical className="w-5 h-5" /> },
    { key: 'pf', name: 'Power Factor', unit: '', color: 'from-pink-400 to-rose-500', hex: '#f43f5e', icon: <BarChart3 className="w-5 h-5" /> },
    { key: 'temperature', name: 'Temperature', unit: '°C', color: 'from-orange-400 to-red-500', hex: '#ef4444', icon: <Flame className="w-5 h-5" /> },
  ];

  const calculateOverallPerformance = () => {
    if (!data || !data.length) return 0;
    const efficiencies = data.map(d => {
      let e = d.power > 0 ? (d.power / 1200) * 100 : 0;
      return e > 100 ? 95 - (e - 100) : e;
    });
    const avgEff = efficiencies.reduce((a, b) => a + b, 0) / efficiencies.length;
    
    const temps = data.map(d => d.temperature);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    let tempPenalty = avgTemp > 40 ? (avgTemp - 40) * 1.5 : 0;
    
    let rate = 100 - tempPenalty - (100 - avgEff)*0.5;
    return Math.min(Math.max(rate, 0), 100).toFixed(1);
  };

  const performanceRate = calculateOverallPerformance();

  return (
    <div className="flex-1 min-h-screen bg-slate-50 ml-0 lg:ml-64 p-4 lg:p-10 pt-20 lg:pt-10 w-full overflow-hidden transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 lg:mb-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight flex items-center justify-center lg:justify-start gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shadow-inner">
                <History className="w-8 h-8" />
              </div>
              Performance Analytics
            </h1>
            <p className="text-slate-500 mt-3 text-lg font-medium">Detailed historical trend evaluation across all 7 sensor dimensions.</p>
          </div>

          {/* Performance Rate Box */}
          <div className="bg-white px-8 py-5 rounded-3xl shadow-xl border border-green-100 flex items-center gap-6">
            <div className="relative w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center shadow-inner">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="28" fill="none" strokeWidth="4" stroke="currentColor" className="text-slate-100" />
                <circle cx="28" cy="28" r="28" fill="none" strokeWidth="4" stroke="currentColor" strokeDasharray="175" strokeDashoffset={175 - (175 * performanceRate) / 100} className="text-emerald-500 transition-all duration-1000 ease-out" />
              </svg>
              <div className="flex flex-col text-center">
                <span className="text-emerald-600 font-extrabold">{performanceRate}%</span>
              </div>
            </div>
            <div className="text-left">
              <h4 className="text-slate-800 font-extrabold text-xl tracking-tight">System Score</h4>
              <p className="text-slate-500 text-sm font-semibold">Aggregated Analytics</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 mb-10 w-full">
          {metrics.map((metric, index) => {
            const stats = getStats(metric.key);
            const trend = stats.current > stats.avg ? 'up' : stats.current < stats.avg ? 'down' : 'stable';
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={metric.key}
                className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:-translate-y-1 transition-all w-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${metric.color} text-white shadow-lg`}>
                    {metric.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 font-bold text-sm">{metric.name}</p>
                    <p className="text-2xl font-extrabold text-slate-800">
                      {stats.current.toFixed(2)} <span className="text-sm font-semibold text-slate-400">{metric.unit}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 grid grid-cols-3 gap-2 text-center border border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-1 leading-none uppercase">Min</p>
                    <p className="text-sm font-bold text-slate-700">{stats.min.toFixed(1)}</p>
                  </div>
                  <div className="border-x border-slate-200">
                    <p className="text-xs font-bold text-slate-400 mb-1 leading-none uppercase">Avg</p>
                    <p className="text-sm font-bold text-slate-700">{stats.avg.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 mb-1 leading-none uppercase">Max</p>
                    <p className="text-sm font-bold text-slate-700">{stats.max.toFixed(1)}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Current vs Avg Trend</span>
                  {trend === 'up' && <span className="text-emerald-500 flex items-center gap-1"><TrendingUp className="w-4 h-4"/> Higher</span>}
                  {trend === 'down' && <span className="text-orange-500 flex items-center gap-1"><TrendingDown className="w-4 h-4"/> Lower</span>}
                  {trend === 'stable' && <span className="text-slate-500 flex items-center gap-1"><Minus className="w-4 h-4"/> Stable</span>}
                </div>
              </motion.div>
            );
          })}
        </div>

        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Deep Trace Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full pb-12">
          {metrics.slice(0, 4).map((metric, index) => (
             <ChartSection 
               key={metric.key} 
               data={data} 
               dataKey={metric.key} 
               title={metric.name} 
               color={metric.hex} 
               delay={0.4 + index * 0.1} 
             />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryAnalytics;
