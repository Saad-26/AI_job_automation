import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { text: "Initializing Tiny Fish cloud engine...", duration: 800 },
  { text: "Vectorizing codebase tokens via Gemini AI...", duration: 1200 },
  { text: "Mapping Indian IT Profile to Master Schema...", duration: 1500 },
  { text: "Running 3-Tier Job Analysis on Greenhouse & Lever...", duration: 2200 },
  { text: "Bypassing bot-protected listings...", duration: 1100 },
  { text: "Strategy Generated: 14 High-Probability Roles Found.", duration: 1500 }
];

interface StrategyEngineTransitionProps {
  onComplete: () => void;
}

const StrategyEngineTransition: React.FC<StrategyEngineTransitionProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const stepRef = useRef(currentStep);

  // Sync step ref for the progress ticker
  useEffect(() => {
    stepRef.current = currentStep;
  }, [currentStep]);

  // Handle variable duration step changes
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const runStep = () => {
      if (currentStep < STEPS.length - 1) {
        timer = setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
        }, STEPS[currentStep].duration);
      } else {
        // Final step, hold then jump to complete
        timer = setTimeout(() => {
          onComplete();
        }, STEPS[currentStep].duration);
      }
    };

    runStep();
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  // Handle dynamic percentage ticking
  useEffect(() => {
    let active = true;
    let currentProg = 0;

    const tick = () => {
      if (!active) return;
      
      const isFinalStep = stepRef.current >= STEPS.length - 1;
      
      if (isFinalStep) {
        setProgress(100);
      } else {
        // 1, 2, or 3 increments
        const increment = Math.floor(Math.random() * 3) + 1;
        // Crunch real fast but cap at 99% until final state
        currentProg = Math.min(99, currentProg + increment);
        setProgress(currentProg);

        // 50-80ms delay
        const nextDelay = Math.floor(Math.random() * 30) + 50;
        setTimeout(tick, nextDelay);
      }
    };

    tick();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
      {/* Dynamic Background Glow pulsing per step */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0.1, scale: 0.95 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,1)_0%,transparent_60%)] pointer-events-none"
        />
      </AnimatePresence>

      {/* Pulsing Core / Orb */}
      <div className="relative flex items-center justify-center w-40 h-40 mb-8 mt-12">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 md:inset-4 rounded-full bg-blue-400/30 blur-md border border-blue-400/50"
        />
        <div className="relative z-10 w-8 h-8 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,1)] animate-pulse" />
      </div>

      {/* The Ticking Percentage Counter */}
      <div className="text-6xl font-mono text-blue-400 font-bold tracking-tight mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] z-10">
        {progress}%
      </div>

      {/* Animated Text Feed */}
      <div className="h-12 flex items-center justify-center overflow-hidden z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-mono text-teal-400 text-sm sm:text-base md:text-lg tracking-wide text-center px-4"
          >
            &gt; {STEPS[currentStep].text}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Scanline Overlay Effect to mimic terminal/tech vibe */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] z-20" />
    </div>
  );
};

export default StrategyEngineTransition;
