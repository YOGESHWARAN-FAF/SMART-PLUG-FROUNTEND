import { motion } from 'framer-motion';
import { Zap, Activity, BatteryCharging, Flame, Waves, Wind, AlertCircle, Cpu } from 'lucide-react';
import MetricCard from './MetricCard';
import ChartSection from './ChartSection';

const Dashboard = ({ data, latestData, loading, error, refetch }) => {
  if (loading && !latestData) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-[#f0fdf4] ml-0 lg:ml-64">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 border-4 border-emerald-100 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-emerald-500 border-r-yellow-400 border-b-transparent border-l-transparent rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="text-emerald-500 w-8 h-8" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-emerald-700 font-bold text-lg tracking-wide">Syncing Live Data...</p>
            <p className="text-slate-400 text-sm mt-1">Connecting to ThingSpeak</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !latestData) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-[#f0fdf4] ml-0 lg:ml-64">
        <div className="bg-white border border-red-100 p-8 rounded-3xl flex flex-col items-center gap-4 text-center max-w-md shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800">Connection Error</h2>
          <p className="text-slate-500 font-medium">{error}</p>
          <button
            onClick={refetch}
            className="mt-2 px-8 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white rounded-2xl transition-all shadow-md shadow-red-200 font-bold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-[#f0fdf4] via-emerald-50/40 to-yellow-50/20 p-4 lg:p-10 ml-0 lg:ml-64 transition-all overflow-x-hidden pt-20 lg:pt-10">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 lg:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow">
                <Zap size={14} className="text-white" />
              </div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">AI Smart Plug</p>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">System Overview</h1>
            <p className="text-slate-500 font-medium mt-1 text-sm lg:text-base">Real-time IoT monitoring via ThingSpeak</p>
          </div>

          {/* Live Badge */}
          <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-2xl border border-emerald-100 shadow-sm self-start">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Live</span>
          </div>
        </motion.header>

        {/* ── Metric Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-10 lg:mb-14">
          <MetricCard title="Voltage"      value={latestData?.voltage}     unit="V"   icon={<Zap className="w-5 h-5" />}            accent="text-yellow-500"  gradientFrom="from-yellow-400"  gradientTo="to-amber-500"   delay={0.05} subtitle="AC Supply"       />
          <MetricCard title="Current"      value={latestData?.current}     unit="A"   icon={<Activity className="w-5 h-5" />}       accent="text-blue-500"    gradientFrom="from-blue-400"    gradientTo="to-blue-600"    delay={0.1}  subtitle="RMS Load"        />
          <MetricCard title="Power"        value={latestData?.power}       unit="W"   icon={<BatteryCharging className="w-5 h-5" />} accent="text-emerald-500" gradientFrom="from-emerald-400" gradientTo="to-green-600"   delay={0.15} subtitle="Active Power"    />
          <MetricCard title="Energy"       value={latestData?.energy}      unit="kWh" icon={<Cpu className="w-5 h-5" />}            accent="text-purple-500"  gradientFrom="from-purple-400"  gradientTo="to-indigo-600"  delay={0.2}  subtitle="Cumulative"      />
          <MetricCard title="Frequency"    value={latestData?.frequency}   unit="Hz"  icon={<Waves className="w-5 h-5" />}          accent="text-cyan-500"    gradientFrom="from-cyan-400"    gradientTo="to-teal-500"    delay={0.25} subtitle="AC Frequency"    />
          <MetricCard title="Power Factor" value={latestData?.pf}          unit="PF"  icon={<Wind className="w-5 h-5" />}           accent="text-indigo-500"  gradientFrom="from-indigo-400"  gradientTo="to-violet-600"  delay={0.3}  subtitle="Efficiency Ratio"/>
          <MetricCard title="Temperature"  value={latestData?.temperature} unit="°C"  icon={<Flame className="w-5 h-5" />}          accent="text-red-500"     gradientFrom="from-orange-400"  gradientTo="to-red-600"     delay={0.35} subtitle="Sensor Temp"     />
        </div>

        {/* ── Charts Section ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Trend Analysis</p>
          <h2 className="text-2xl lg:text-3xl font-black text-slate-800 mb-8 tracking-tight">
            Historical Data — <span className="gradient-text">All 7 Parameters</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pb-16">
          <ChartSection data={data} dataKey="voltage"     title="Voltage"       color="#f59e0b" delay={0.1}  />
          <ChartSection data={data} dataKey="current"     title="Current"       color="#3b82f6" delay={0.15} />
          <ChartSection data={data} dataKey="power"       title="Power"         color="#10b981" delay={0.2}  />
          <ChartSection data={data} dataKey="energy"      title="Energy"        color="#8b5cf6" delay={0.25} />
          <ChartSection data={data} dataKey="frequency"   title="Frequency"     color="#06b6d4" delay={0.3}  />
          <ChartSection data={data} dataKey="pf"          title="Power Factor"  color="#f43f5e" delay={0.35} />
          <ChartSection data={data} dataKey="temperature" title="Temperature"   color="#ef4444" delay={0.4}  />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
