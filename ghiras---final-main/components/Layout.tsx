
import React from 'react';
import { Moon, Sun, Globe, Menu, X, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Language, View } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentView: View;
  setView: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  darkMode,
  toggleDarkMode,
  language,
  setLanguage,
  currentView,
  setView
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const t = TRANSLATIONS[language];

  const navItems = [
    { id: View.HOME, label: t.appTitle },
    { id: View.DIAGNOSIS, label: t.serviceDiagnosis },
    { id: View.CROPS, label: t.serviceCrops },
    { id: View.IOT, label: t.serviceIoT },
  ];

  const toggleLang = () => {
    setLanguage(language === Language.EN ? Language.AR : Language.EN);
  };

  return (
    <div className={`min-h-screen flex flex-col font-${language === Language.AR ? 'cairo' : 'sans'} ${language === Language.AR ? 'rtl' : 'ltr'}`}>
      {/* Navbar */}
      <nav className="bg-white dark:bg-agri-900 shadow-md sticky top-0 z-50 transition-colors duration-300 border-b border-sand-100 dark:border-agri-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer gap-2" 
              onClick={() => setView(View.HOME)}
            >
              <img 
                src="https://i.imgur.com/S5y6Q6D.png" 
                alt="Gharas Logo" 
                className="h-14 w-auto object-contain hover:scale-105 transition-transform"
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as View)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    currentView === item.id
                      ? 'text-white bg-agri-500 shadow-lg shadow-agri-500/30'
                      : 'text-ocean-500 dark:text-sand-50 hover:text-agri-600 dark:hover:text-agri-400 hover:bg-agri-50 dark:hover:bg-agri-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse border-l rtl:border-r rtl:border-l-0 border-gray-200 dark:border-agri-700 pl-2 rtl:pr-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-ocean-500 dark:text-sand-50 hover:bg-agri-50 dark:hover:bg-agri-800 transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleLang}
                  className="p-2 rounded-full text-ocean-500 dark:text-sand-50 hover:bg-agri-50 dark:hover:bg-agri-800 transition-colors flex items-center gap-1"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-bold">{language.toUpperCase()}</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleDarkMode} className="p-2 text-ocean-500 dark:text-sand-50">
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button onClick={toggleLang} className="p-2 text-ocean-500 dark:text-sand-50 font-bold text-sm">
                  {language.toUpperCase()}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-agri-500 hover:text-agri-600 hover:bg-agri-50 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-agri-900 shadow-lg border-t border-gray-100 dark:border-agri-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id as View);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-bold ${
                    currentView === item.id
                      ? 'text-agri-600 bg-agri-50 dark:text-agri-400 dark:bg-agri-800'
                      : 'text-gray-600 dark:text-sand-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="flex-grow bg-agri-50 dark:bg-agri-800 transition-colors duration-300">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-agri-900 border-t-4 border-agri-500 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            
            {/* Brand & About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <img src="https://i.imgur.com/S5y6Q6D.png" alt="Gharas" className="h-12 w-auto" />
              </div>
              <h3 className="font-bold text-lg text-ocean-500 dark:text-sand-50">{t.aboutUsTitle}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {t.aboutUsDesc}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg text-ocean-500 dark:text-sand-50 mb-4 border-b-2 border-sand-100 dark:border-agri-700 pb-2 inline-block">{t.quickLinksTitle}</h3>
              <ul className="space-y-3">
                {navItems.slice(1).map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => setView(item.id as View)}
                      className="text-gray-600 dark:text-gray-400 hover:text-agri-600 dark:hover:text-agri-400 transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sand-500"></span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg text-ocean-500 dark:text-sand-50 mb-4 border-b-2 border-sand-100 dark:border-agri-700 pb-2 inline-block">{t.contactUsTitle}</h3>
              <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-agri-50 dark:bg-agri-800 rounded-full text-agri-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>support@gharas.sa</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-agri-50 dark:bg-agri-800 rounded-full text-agri-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+966 50 000 0000</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-2 bg-agri-50 dark:bg-agri-800 rounded-full text-agri-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Riyadh, Saudi Arabia</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-ocean-500 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-ocean-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-ocean-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-agri-800 pt-6 text-center">
            <p className="text-gray-500 dark:text-gray-500 text-sm font-medium">
              © {new Date().getFullYear()} {t.appTitle}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;