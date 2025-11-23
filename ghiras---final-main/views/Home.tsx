
import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Sprout, Activity, ArrowRight, Cpu, Map, ShieldCheck, Leaf, MousePointerClick, Upload, CheckCircle, Droplets } from 'lucide-react';
import { Language, View } from '../types';
import { TRANSLATIONS } from '../constants';

interface HomeProps {
  language: Language;
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ language, setView }) => {
  const t = TRANSLATIONS[language];

  const services = [
    {
      id: View.DIAGNOSIS,
      title: t.serviceDiagnosis,
      desc: t.serviceDiagnosisDesc,
      icon: <Stethoscope className="w-10 h-10 text-sand-500" />,
      // Using white cards for clean look as requested
      bgClass: 'bg-white dark:bg-agri-800', 
      borderClass: 'border-b-4 border-sand-500',
    },
    {
      id: View.CROPS,
      title: t.serviceCrops,
      desc: t.serviceCropsDesc,
      icon: <Sprout className="w-10 h-10 text-agri-500" />,
      bgClass: 'bg-white dark:bg-agri-800',
      borderClass: 'border-b-4 border-agri-500',
    },
    {
      id: View.IOT,
      title: t.serviceIoT,
      desc: t.serviceIoTDesc,
      icon: <Activity className="w-10 h-10 text-ocean-500" />,
      bgClass: 'bg-white dark:bg-agri-800',
      borderClass: 'border-b-4 border-ocean-500',
    }
  ];

  const features = [
    {
      title: t.feature1Title,
      desc: t.feature1Desc,
      icon: <ShieldCheck className="w-8 h-8 text-agri-500" />,
      color: 'bg-agri-50 dark:bg-agri-700'
    },
    {
      title: t.feature2Title,
      desc: t.feature2Desc,
      icon: <Map className="w-8 h-8 text-sand-500" />,
      color: 'bg-sand-50 dark:bg-sand-900'
    },
    {
      title: t.feature3Title,
      desc: t.feature3Desc,
      icon: <Cpu className="w-8 h-8 text-ocean-500" />,
      color: 'bg-ocean-50 dark:bg-ocean-800'
    },
    {
      title: t.feature4Title,
      desc: t.feature4Desc,
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-900/30'
    },
  ];

  const steps = [
    {
      num: '01',
      title: t.step1Title,
      desc: t.step1Desc,
      icon: <MousePointerClick className="w-8 h-8 text-white" />
    },
    {
      num: '02',
      title: t.step2Title,
      desc: t.step2Desc,
      icon: <Upload className="w-8 h-8 text-white" />
    },
    {
      num: '03',
      title: t.step3Title,
      desc: t.step3Desc,
      icon: <CheckCircle className="w-8 h-8 text-white" />
    }
  ];

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-white dark:bg-agri-900">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-agri-100 dark:bg-agri-800 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-sand-100 dark:bg-sand-900 rounded-full opacity-50 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-agri-50 dark:bg-agri-800 text-agri-600 dark:text-agri-400 text-sm font-bold mb-8 shadow-sm">
              <Leaf className="w-4 h-4" />
              {language === 'ar' ? 'منصة غراس للزراعة الذكية' : 'Gharas Smart Agriculture Platform'}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-ocean-900 dark:text-sand-50 tracking-tight mb-6 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-6 text-xl text-ocean-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.heroDesc}
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button 
                onClick={scrollToServices}
                className="bg-agri-500 hover:bg-agri-600 text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-agri-500/30 transition-all hover:scale-105"
              >
                {t.startBtn}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-agri-50 dark:bg-agri-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-ocean-900 dark:text-sand-50">{t.ctaBtn}</h2>
            <div className="w-20 h-1 bg-sand-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${service.bgClass} ${service.borderClass}`}
                onClick={() => setView(service.id as View)}
              >
                <div className="w-16 h-16 rounded-2xl bg-agri-50 dark:bg-agri-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-ocean-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <div className="absolute bottom-8 flex items-center font-bold text-agri-600 dark:text-agri-400">
                  {t.startBtn} 
                  <ArrowRight className={`w-5 h-5 mx-2 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section (What Distinguishes Us) */}
      <section className="py-24 bg-white dark:bg-agri-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ocean-900 dark:text-sand-50 mb-4">{t.featuresTitle}</h2>
            <p className="text-ocean-500 dark:text-gray-400">{language === 'ar' ? 'لماذا تختار منصة غراس؟' : 'Why choose Gharas Platform?'}</p>
            <div className="w-24 h-1.5 bg-sand-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-agri-50 dark:bg-agri-800 p-8 rounded-3xl hover:bg-white dark:hover:bg-agri-700 border border-transparent hover:border-agri-200 dark:hover:border-agri-600 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 mx-auto ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                   {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-ocean-900 dark:text-white mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm text-center leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-24 bg-agri-50 dark:bg-agri-800 overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-ocean-900 dark:text-sand-50 mb-4">{t.howToTitle}</h2>
            <p className="text-ocean-500 dark:text-gray-400">{t.howToSubtitle}</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connecting Line */}
             <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-gradient-to-r from-agri-300 via-sand-300 to-ocean-300 dark:from-agri-600 dark:to-ocean-700 -z-10"></div>
             
             {steps.map((step, idx) => (
               <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex flex-col items-center text-center"
               >
                 <div className="relative">
                   <div className="w-24 h-24 bg-white dark:bg-agri-700 rounded-full flex items-center justify-center shadow-lg mb-8 border-4 border-white dark:border-agri-600 relative z-10">
                      <div className="w-16 h-16 bg-agri-500 rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                   </div>
                   <div className="absolute -top-3 -right-3 bg-sand-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white dark:border-agri-800 z-20">
                      {step.num}
                   </div>
                 </div>
                 
                 <h3 className="text-2xl font-bold text-ocean-900 dark:text-white mb-3">{step.title}</h3>
                 <p className="text-gray-600 dark:text-gray-300 max-w-xs leading-relaxed">{step.desc}</p>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-agri-600 to-agri-800 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
         <div className="absolute -left-20 -top-20 w-80 h-80 bg-sand-500 opacity-10 rounded-full blur-3xl"></div>
         
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto px-4 text-center relative z-10"
         >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-agri-100 mb-12 max-w-2xl mx-auto">
              {language === 'ar' ? 'انضم إلى آلاف المزارعين الذين يستخدمون التقنية لتحسين محاصيلهم' : 'Join thousands of farmers using technology to improve their crops'}
            </p>
            <button 
               onClick={scrollToServices}
               className="bg-white text-agri-700 font-bold py-4 px-12 rounded-full shadow-2xl hover:bg-sand-50 hover:scale-105 transition-all text-lg"
            >
               {t.ctaBtn}
            </button>
         </motion.div>
      </section>
    </div>
  );
};

export default Home;