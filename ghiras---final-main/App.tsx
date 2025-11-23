import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Chatbot from './components/Chatbot';
import Home from './views/Home';
import Diagnosis from './views/Diagnosis';
import Crops from './views/Crops';
import IoT from './views/IoT';
import { Language, View } from './types';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.AR); // Default to Arabic as per request context
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  // Initialize theme on mount
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) setDarkMode(true);
  }, []);

  // Update HTML class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home language={language} setView={setCurrentView} />;
      case View.DIAGNOSIS:
        return <Diagnosis language={language} />;
      case View.CROPS:
        return <Crops language={language} />;
      case View.IOT:
        return <IoT language={language} />;
      default:
        return <Home language={language} setView={setCurrentView} />;
    }
  };

  return (
    <Layout
      darkMode={darkMode}
      toggleDarkMode={() => setDarkMode(!darkMode)}
      language={language}
      setLanguage={setLanguage}
      currentView={currentView}
      setView={setCurrentView}
    >
      {renderView()}
      <Chatbot language={language} />
    </Layout>
  );
};

export default App;
