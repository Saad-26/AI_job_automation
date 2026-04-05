import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import SmoothScrollProvider from './components/landing/SmoothScrollProvider';
import LandingPage from './components/landing/LandingPage';
import AnimatedBackground from './components/landing/AnimatedBackground';
import OnboardingPage from './components/onboarding/OnboardingPage';
import AuthModal from './components/landing/AuthModal';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [currentView, setCurrentView] = useState<'landing' | 'onboarding'>('landing');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-[100vh] w-full text-on-surface">
        
        {/* Animated Premium Backdrop */}
        <AnimatedBackground isDark={isDark} />

        {/* Top Navigation Wrapper */}
        <header className="fixed top-0 left-0 w-full z-[9999] flex justify-between items-center px-6 sm:px-10 py-4 backdrop-blur-md bg-transparent transition-colors duration-300">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
               <span className="text-white font-bold font-inter text-[1rem]">&lt;/&gt;</span>
            </div>
            <span className="font-inter font-extrabold text-[1.25rem] tracking-tight text-slate-900 dark:text-white transition-colors duration-300">DevReview.ai</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <motion.button 
              onClick={() => setAuthMode('login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-inter font-medium text-slate-900 dark:text-white hover:opacity-70 transition-opacity px-2"
            >
              Log in
            </motion.button>
            <motion.button 
              onClick={() => setAuthMode('signup')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-gradient-to-r from-primary to-primary-container text-white rounded-full font-inter font-medium shadow-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 border border-transparent dark:border-white/10"
            >
              Sign up
            </motion.button>
          </div>
        </header>
        
        {currentView === 'landing' ? (
          <LandingPage onGetStarted={() => setCurrentView('onboarding')} />
        ) : (
          <OnboardingPage />
        )}

        {/* Global Authentication Modal */}
        <AuthModal mode={authMode} setMode={setAuthMode} />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;
