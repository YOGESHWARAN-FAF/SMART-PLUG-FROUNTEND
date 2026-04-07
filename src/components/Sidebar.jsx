import { LayoutDashboard, Settings, X, ActivitySquare, BarChart3, Zap, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard',  name: 'Dashboard',       icon: <LayoutDashboard size={20} />,  desc: 'Live Overview' },
    { id: 'prediction', name: 'Appliance Health', icon: <ActivitySquare size={20} />,  desc: 'ML Diagnosis' },
    { id: 'history',    name: 'History Analytics',icon: <BarChart3 size={20} />,        desc: 'Trend Analysis' },
    { id: 'settings',   name: 'Settings',          icon: <Settings size={20} />,         desc: 'Configuration' },
  ];

  return (
    <>
      {/* Desktop + Mobile Sidebar */}
      <div
        className={`glass-sidebar fixed inset-y-0 left-0 w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-500 ease-in-out z-30 shadow-2xl lg:shadow-none flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-emerald-50">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 20, scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-200"
            >
              <Zap className="text-white" size={22} />
            </motion.div>
            <div className="leading-tight">
              <p className="text-slate-800 font-black text-base tracking-tight">AI Smart</p>
              <p className="text-emerald-500 font-bold text-xs tracking-widest uppercase">Plug System</p>
            </div>
          </div>
          <button
            className="lg:hidden text-slate-400 hover:text-emerald-600 transition p-1 rounded-lg hover:bg-emerald-50"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Label */}
        <p className="px-6 pt-6 pb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Main Menu</p>

        {/* Navigation */}
        <nav className="px-4 space-y-1 flex-1">
          {menuItems.map((item) => {
            const active = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setActiveTab(item.id); setIsOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left ${
                  active
                    ? 'nav-active text-white shadow-lg shadow-emerald-200'
                    : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <div>
                  <p className={`text-sm font-bold leading-none ${active ? 'text-white' : ''}`}>{item.name}</p>
                  <p className={`text-xs mt-0.5 ${active ? 'text-emerald-100' : 'text-slate-400'}`}>{item.desc}</p>
                </div>
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="ml-auto w-2 h-2 rounded-full bg-white/70"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer Status */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-md">
              <Wifi size={18} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">System Online</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                <p className="text-xs font-semibold text-emerald-600">ThingSpeak Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
