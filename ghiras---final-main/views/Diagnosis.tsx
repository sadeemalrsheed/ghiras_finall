import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader2, CheckCircle, AlertCircle, Image as ImageIcon, X } from 'lucide-react';
import { Language, PlantDiagnosisResult } from '../types';
import { TRANSLATIONS } from '../constants';
import { analyzePlantImage } from '../services/geminiService';

interface DiagnosisProps {
  language: Language;
}

const Diagnosis: React.FC<DiagnosisProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<PlantDiagnosisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    
    try {
      // Remove the prefix data:image/...;base64, for the API if necessary
      // But gemini 2.5 flash typically handles standard base64 strings in inlineData
      const base64Data = image.split(',')[1]; 
      const data = await analyzePlantImage(base64Data);
      setResult(data);
    } catch (err) {
      setError(language === 'ar' ? 'فشل التحليل. الرجاء المحاولة مرة أخرى.' : 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
       <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t.serviceDiagnosis}</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t.serviceDiagnosisDesc}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
          {!image ? (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-agri-500 transition-colors relative group cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center text-gray-500 group-hover:text-agri-600 dark:text-gray-400 dark:group-hover:text-agri-400 transition-colors">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:bg-agri-50 dark:group-hover:bg-agri-900/30">
                  <Upload className="w-8 h-8" />
                </div>
                <p className="font-medium text-lg mb-1">{t.uploadImage}</p>
                <p className="text-sm text-gray-400">JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <img src={image} alt="Uploaded Plant" className="w-full h-64 object-cover" />
              <button 
                onClick={clearImage}
                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className={`mt-6 w-full py-3 px-4 rounded-xl font-bold text-white shadow-lg transition-all 
              ${!image || loading 
                ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed' 
                : 'bg-agri-600 hover:bg-agri-700 hover:shadow-agri-600/30 transform hover:-translate-y-1'}`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {t.analyzing}
              </div>
            ) : (
              t.analyzeBtn
            )}
          </button>
          
          {error && (
             <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm flex items-center gap-2">
               <AlertCircle className="w-4 h-4" />
               {error}
             </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result ? (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
             >
               <div className={`p-6 ${result.isHealthy ? 'bg-green-50 dark:bg-green-900/20' : 'bg-rose-50 dark:bg-rose-900/20'} border-b border-gray-100 dark:border-gray-700`}>
                 <div className="flex items-center justify-between mb-2">
                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{result.plantName}</h3>
                   <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 
                     ${result.isHealthy ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'}`}>
                     {result.isHealthy ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                     {result.isHealthy ? t.healthy : t.infected}
                   </span>
                 </div>
                 <p className="text-sm text-gray-500 dark:text-gray-400">
                   {t.confidence}: <span className="font-bold">{result.confidence}%</span>
                 </p>
                 {!result.isHealthy && result.diseaseName && (
                    <p className="mt-2 text-lg font-semibold text-rose-600 dark:text-rose-400">
                      {result.diseaseName}
                    </p>
                 )}
               </div>

               <div className="p-6 space-y-6">
                  {/* Treatments */}
                  {!result.isHealthy && result.treatments.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        {t.treatments}
                      </h4>
                      <ul className="space-y-2">
                        {result.treatments.map((treatment, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                            {treatment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tips */}
                  {result.tips.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-agri-500"></div>
                        {t.tips}
                      </h4>
                      <ul className="space-y-2">
                        {result.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
               </div>
             </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-8 min-h-[300px]">
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <p>{language === 'ar' ? 'النتائج ستظهر هنا بعد التحليل' : 'Results will appear here after analysis'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
