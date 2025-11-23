import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Thermometer, Activity, Zap, Beaker } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Language } from '../types';
import { TRANSLATIONS, MOCK_SENSOR_DATA } from '../constants';

interface IoTProps {
  language: Language;
}

const IoT: React.FC<IoTProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  // Mock NPK Data
  const npkData = [
    { label: t.nitrogen, value: '45 mg/kg', status: 'Good', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: t.phosphorus, value: '12 mg/kg', status: 'Low', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { label: t.potassium, value: '180 mg/kg', status: 'High', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  ];

  const otherSensors = [
     { label: t.acidity, value: '6.5 pH', icon: <Beaker className="w-5 h-5" />, color: 'text-purple-500' },
     { label: 'EC', value: '1.2 mS/cm', icon: <Zap className="w-5 h-5" />, color: 'text-amber-500' },
     { label: t.temp, value: '28°C', icon: <Thermometer className="w-5 h-5" />, color: 'text-red-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t.serviceIoT}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t.serviceIoTDesc}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Irrigation Status Card */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
           <div className="flex items-center justify-between mb-6">
             <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
               <Droplets className="w-5 h-5 text-sky-500" />
               {t.irrigationDashboard}
             </h3>
             <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold uppercase">Active</span>
           </div>

           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20">
                 <p className="text-sm text-sky-600 dark:text-sky-400 mb-1">{t.soilMoisture}</p>
                 <p className="text-3xl font-bold text-gray-900 dark:text-white">62%</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                 <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t.lastWatered}</p>
                 <p className="text-xl font-semibold text-gray-900 dark:text-white">08:30 AM</p>
              </div>
           </div>

           {/* Chart */}
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={MOCK_SENSOR_DATA}>
                 <defs>
                   <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                     <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                 <XAxis dataKey="time" hide />
                 <YAxis hide domain={[0, 100]} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                 />
                 <Area type="monotone" dataKey="moisture" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorMoisture)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </motion.div>

        {/* NPK & Environment Dashboard */}
        <div className="space-y-8">
           
           {/* NPK Cards */}
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }} 
             className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
           >
             <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2">
               <Activity className="w-5 h-5 text-agri-600" />
               {t.npkDashboard}
             </h3>
             <div className="grid grid-cols-3 gap-4">
                {npkData.map((item, idx) => (
                   <div key={idx} className={`text-center p-4 rounded-xl ${item.bg}`}>
                      <p className={`font-bold text-lg ${item.color}`}>{item.label.split(' ')[0]}</p>
                      <p className="text-gray-900 dark:text-white font-semibold my-1">{item.value}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/20 ${item.color}`}>
                        {item.status}
                      </span>
                   </div>
                ))}
             </div>
           </motion.div>

           {/* Other Sensors */}
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
           >
              {otherSensors.map((sensor, idx) => (
                 <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
                    <div className={`mb-2 p-2 rounded-full bg-gray-50 dark:bg-gray-700 ${sensor.color}`}>
                      {sensor.icon}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{sensor.label}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{sensor.value}</p>
                 </div>
              ))}
           </motion.div>
        </div>

      </div>
    </div>
  );
};

export default IoT;
