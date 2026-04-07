import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, ActivitySquare, AlertTriangle, ShieldCheck, Thermometer, Zap, Wrench } from 'lucide-react';

const AppliancePredictor = ({ latestData }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Fan',
    ratedPower: '1200',
    ratedVoltage: '230',
    usageHours: '8'
  });
  const [prediction, setPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setPrediction(null);
    
    try {
      const payload = {
        name: formData.name || 'Appliance',
        type: formData.type,
        ratedPower: parseFloat(formData.ratedPower),
        ratedVoltage: parseFloat(formData.ratedVoltage),
        usageHours: parseFloat(formData.usageHours),
        voltage: latestData?.voltage || 230,
        current: latestData?.current || 5,
        power: latestData?.power || 1000,
        energy: latestData?.energy || 0,
        frequency: latestData?.frequency || 50,
        temperature: latestData?.temperature || 30,
        pf: latestData?.pf || 0.9
      };

      // Ensure that loading happens for 3 seconds for beautiful UI animation
      const [response] = await Promise.all([
        fetch('https://smart-plug-ztgg.onrender.com/api/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }),
        new Promise(resolve => setTimeout(resolve, 3000))
      ]);

      if (!response.ok) throw new Error('API Error');

      const result = await response.json();
      
      setPrediction({
        efficiency: result.efficiency,
        health: result.health,
        faultStatus: result.faultStatus,
        energyAnalysis: result.energyAnalysis,
        tempWarning: result.tempWarning,
        maintenanceMsg: result.maintenanceMsg
      });
    } catch (error) {
      console.error("Prediction Error:", error);
      alert("Failed to connect to the Machine Learning Backend at http://localhost:8000");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal': return 'text-emerald-700 bg-emerald-100 border-emerald-300';
      case 'Warning': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'Faulty': return 'text-red-700 bg-red-100 border-red-300';
      default: return 'text-slate-500 bg-slate-100 border-slate-300';
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-4 lg:p-10 ml-0 lg:ml-64 overflow-x-hidden pt-20 lg:pt-10 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 lg:mb-10 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mb-2 lg:mb-3 tracking-tight">Predictive Maintenance</h1>
          <p className="text-slate-500 text-base lg:text-lg">ML-powered Appliance Health & Fault Prediction</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-3xl border border-green-50 shadow-xl shadow-green-100/50"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-200">
                <Settings2 className="text-white w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Appliance Profile</h2>
            </div>
            
            <form onSubmit={handlePredict} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-600 ml-1">Appliance Selector</label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 lg:px-5 py-3 lg:py-3.5 text-slate-800 focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all font-medium appearance-none">
                  <option>Air Conditioner (AC)</option>
                  <option>Refrigerator</option>
                  <option>Industrial Fan</option>
                  <option>Water Pump</option>
                  <option>Heater/Boiler</option>
                  <option>LED Light / Bulb</option>
                  <option>Television (TV)</option>
                  <option>Washing Machine</option>
                  <option>Microwave Oven</option>
                  <option>Computer / Server</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between ml-1 text-sm font-bold text-slate-600">
                  <label>Rated Power (W)</label>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{formData.ratedPower} W</span>
                </div>
                <input type="range" name="ratedPower" min="100" max="4000" step="50" value={formData.ratedPower} onChange={handleInputChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between ml-1 text-sm font-bold text-slate-600">
                  <label>Rated Voltage (V)</label>
                  <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-md">{formData.ratedVoltage} V</span>
                </div>
                <input type="range" name="ratedVoltage" min="110" max="250" step="5" value={formData.ratedVoltage} onChange={handleInputChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between ml-1 text-sm font-bold text-slate-600">
                  <label>Daily Usage (Hours)</label>
                  <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{formData.usageHours} hrs</span>
                </div>
                <input type="range" name="usageHours" min="1" max="24" step="1" value={formData.usageHours} onChange={handleInputChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500" />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isAnalyzing || !latestData}
                className="mt-8 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-200 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
              >
                {isAnalyzing ? (
                  <><div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div> Interrogating AI Neural Net...</>
                ) : (
                  <><ActivitySquare className="w-6 h-6" /> Run Live Diagnosis</>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Result Side */}
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-3xl border border-green-50 shadow-xl flex flex-col items-center justify-center text-center h-full min-h-[500px]"
              >
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 border-r-yellow-400 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="text-emerald-500 w-8 h-8 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Appliance</h3>
                <p className="text-slate-500 max-w-sm">Generating predictions using the Random Forest Model trained on synthetic operational data...</p>
              </motion.div>
            ) : prediction ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-8 rounded-3xl border border-green-50 shadow-xl shadow-green-100/50 relative overflow-hidden"
              >
                {/* Decorative background blurs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>

                <div className="absolute top-0 right-0 p-6 z-10">
                  <span className={`px-5 py-2 rounded-full text-sm font-extrabold border-2 shadow-sm ${getStatusColor(prediction.faultStatus)}`}>
                    Status: {prediction.faultStatus.toUpperCase()}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-800 mb-8 relative z-10">Diagnosis Report</h2>

                <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 font-bold text-sm mb-2 flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500"/> Efficiency</p>
                    <p className="text-4xl font-extrabold text-slate-800">{prediction.efficiency}%</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-slate-500 font-bold text-sm mb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-500"/> Health Score</p>
                    <p className="text-4xl font-extrabold text-slate-800">{prediction.health}%</p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="bg-green-50 border border-green-200 p-5 rounded-2xl flex gap-5">
                    <div className="mt-1"><ActivitySquare className="text-green-500 w-6 h-6" /></div>
                    <div>
                      <h4 className="text-green-800 font-bold">Energy Usage Analysis</h4>
                      <p className="text-green-700/80 mt-1">{prediction.energyAnalysis}</p>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl flex gap-5 border ${prediction.tempWarning.includes('Critical') ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <div className="mt-1"><Thermometer className={`${prediction.tempWarning.includes('Critical') ? 'text-red-500' : 'text-yellow-500'} w-6 h-6`} /></div>
                    <div>
                      <h4 className={`${prediction.tempWarning.includes('Critical') ? 'text-red-800' : 'text-yellow-800'} font-bold`}>Temperature Assessment</h4>
                      <p className={`${prediction.tempWarning.includes('Critical') ? 'text-red-700/80' : 'text-yellow-700/80'} mt-1`}>{prediction.tempWarning}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl flex gap-5">
                    <div className="mt-1"><Wrench className="text-slate-500 w-6 h-6" /></div>
                    <div>
                      <h4 className="text-slate-800 font-bold">Maintenance Suggestion</h4>
                      <p className="text-slate-600 mt-1">{prediction.maintenanceMsg}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center h-full min-h-[500px]"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
                  <AlertTriangle className="text-slate-400 w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-3">Awaiting Assessment</h3>
                <p className="text-slate-500 max-w-sm text-lg leading-relaxed">
                  Configure the parameters using the sliders and run the diagnosis to generate an AI-powered health report based on real-time parameters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AppliancePredictor;
