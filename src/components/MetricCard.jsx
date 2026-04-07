import { motion } from 'framer-motion';

const MetricCard = ({ title, value, unit, icon, accent, gradientFrom, gradientTo, delay = 0, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-white/80 group cursor-default"
    >
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradientFrom} ${gradientTo}`} />

      {/* Background glow blob */}
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}
      />

      <div className="p-5 lg:p-6 relative z-10">
        {/* Icon + Title Row */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
            <span className="text-white">{icon}</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">{title}</p>
            {subtitle && <p className="text-xs text-slate-300 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {/* Value */}
        <div className="flex items-end gap-2">
          <span className="text-4xl font-black text-slate-800 tracking-tight leading-none">
            {value !== undefined && value !== null ? Number(value).toFixed(2) : '--'}
          </span>
          <span className={`text-lg font-bold mb-0.5 ${accent}`}>{unit}</span>
        </div>

        {/* Status bar */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo} transition-all duration-1000`}
              style={{ width: value > 0 ? '100%' : '0%' }}
            />
          </div>
          <span className="text-xs font-bold text-emerald-500">LIVE</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
