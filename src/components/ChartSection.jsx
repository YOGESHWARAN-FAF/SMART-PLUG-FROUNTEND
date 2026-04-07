import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-green-100 p-4 rounded-xl shadow-2xl">
        <p className="text-slate-500 font-bold mb-2 text-xs uppercase tracking-wider">{`Time: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-base font-extrabold flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            {`${entry.name}: ${entry.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartSection = ({ data, dataKey, title, color, delay }) => {
  const gradientId = `color${dataKey}`;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-3xl p-6 lg:p-8 border border-green-50 shadow-xl shadow-green-100/30 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <div className="w-32 h-32 rounded-full blur-3xl" style={{ backgroundColor: color }}></div>
      </div>
      
      <h3 className="text-xl font-extrabold text-slate-800 mb-6 relative z-10">{title} Trend Analysis</h3>
      <div className="h-64 lg:h-72 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} opacity={0.6} />
            <XAxis 
              dataKey="created_at" 
              stroke="#94a3b8" 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} 
              tickMargin={12}
              axisLine={false}
              tickLine={false}
              minTickGap={30}
            />
            <YAxis 
              stroke="#94a3b8" 
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
              domain={['auto', 'auto']}
              tickFormatter={(value) => value.toFixed(1)}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              name={title}
              stroke={color} 
              strokeWidth={4}
              fillOpacity={1} 
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 6, fill: '#ffffff', stroke: color, strokeWidth: 3 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ChartSection;
