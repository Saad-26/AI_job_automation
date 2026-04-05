import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ResumeDropzone from './ResumeDropzone';
import ProfileVerificationForm from './ProfileVerificationForm';
import PreferenceRanking from './PreferenceRanking';
import StrategyEngineTransition from './StrategyEngineTransition';
import JobDashboard from '../dashboard/JobDashboard';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState<'upload' | 'verification' | 'preferences' | 'processing' | 'dashboard'>('upload');

  // When all steps are done and processing is complete, we show the main Job Dashboard.
  if (step === 'dashboard') {
    return <JobDashboard />;
  }

  return (
    <>
      {/* 
        The Transition Screen needs to break out of the container styling 
        so we conditionally render it outside the flex wrapper or use a fixed Portal.
        Since it's fixed inside StrategyEngineTransition, it's safe to just mount it.
      */}
      <AnimatePresence>
        {step === 'processing' && (
          <StrategyEngineTransition onComplete={() => setStep('dashboard')} />
        )}
      </AnimatePresence>

      <div className="min-h-screen pt-24 px-6 sm:px-10 flex flex-col justify-center items-center relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-4xl z-10"
            >
              <div className="bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/10 dark:border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <ResumeDropzone onSuccessComplete={() => setStep('verification')} />
              </div>
            </motion.div>
          )}

          {step === 'verification' && (
            <motion.div
              key="verification"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-4xl z-10"
            >
              <div className="bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/10 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
                <ProfileVerificationForm 
                  onConfirm={(data) => {
                    console.log('Final data:', data);
                    setStep('preferences');
                  }} 
                />
              </div>
            </motion.div>
          )}

          {step === 'preferences' && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-4xl z-10"
            >
              <div className="bg-white/5 dark:bg-slate-900/40 backdrop-blur-xl border border-white/10 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
                <PreferenceRanking 
                  onComplete={(finalData) => {
                    console.log('Strategy Generated!', finalData);
                    setStep('processing');
                  }} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default OnboardingPage;
