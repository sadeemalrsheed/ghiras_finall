import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Leaf } from 'lucide-react';
import { Language, RegionData } from '../types';
import { TRANSLATIONS, SAUDI_REGIONS } from '../constants';

interface CropsProps {
  language: Language;
}

const Crops: React.FC<CropsProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleRegionSelect = (id: string) => {
    const region = SAUDI_REGIONS.find(r => r.id === id);
    if (region) setSelectedRegion(region);
  };

  const handleGeolocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mock logic: Map coordinates to a region roughly
          // For demo, we'll pick Central region or random
          const { latitude, longitude } = position.coords;
          // Simple mock assignment for demo purposes
          setTimeout(() => {
             setSelectedRegion(SAUDI_REGIONS[0]); // Default to central for demo
             setIsLocating(false);
          }, 1500);
        },
        (error) => {
          console.error("Geo Error", error);
          setIsLocating(false);
          // Fallback or alert
        }
      );
    } else {
      setIsLocating(false);
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.serviceCrops}</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t.serviceCropsDesc}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar / Region Selector */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-agri-600" />
              {t.selectRegion}
            </h3>
            
            <div className="space-y-2">
              {SAUDI_REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegion(region)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    selectedRegion?.id === region.id
                      ? 'bg-agri-600 text-white shadow-md shadow-agri-200 dark:shadow-none'
                      : 'bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {language === 'ar' ? region.nameAr : region.nameEn}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={handleGeolocation}
                disabled={isLocating}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-agri-400 text-agri-600 dark:text-agri-400 hover:bg-agri-50 dark:hover:bg-agri-900/20 transition-colors"
              >
                 {isLocating ? (
                   <span className="animate-pulse">{t.detecting}</span>
                 ) : (
                   <>
                     <Navigation className="w-4 h-4" />
                     {t.detectLocation}
                   </>
                 )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content / Results */}
        <div className="lg:col-span-8">
          {selectedRegion ? (
            <motion.div
              key={selectedRegion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-agri-600 rounded-2xl p-8 text-white mb-8 relative overflow-hidden shadow-lg">
                 <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">
                      {language === 'ar' ? selectedRegion.nameAr : selectedRegion.nameEn}
                    </h2>
                    <p className="opacity-90">
                      {language === 'ar' 
                        ? 'بناءً على المناخ والتربة، هذه هي المحاصيل المثالية لمنطقتك.' 
                        : 'Based on climate and soil data, these are optimal crops for your area.'}
                    </p>
                 </div>
                 <Leaf className="absolute -bottom-8 -right-8 w-48 h-48 text-white opacity-10" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {selectedRegion.crops.map((crop, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 group"
                  >
                    <div className="h-48 overflow-hidden">
                       <img 
                         src={crop.image} 
                         alt={crop.nameEn} 
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                       />
                    </div>
                    <div className="p-5">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                         {language === 'ar' ? crop.nameAr : crop.nameEn}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                         <span className="w-2 h-2 bg-agri-500 rounded-full"></span>
                         {crop.season}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12">
               <MapPin className="w-16 h-16 mb-4 opacity-20" />
               <p className="text-lg">{t.selectRegion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Crops;
