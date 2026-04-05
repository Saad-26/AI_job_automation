import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  // Staggered text content
  const headingText = "Less Bugs, Faster Ship.";
  const words = headingText.split(" ");

  // Stagger configurations for framer-motion
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "110%" },
    visible: { 
      y: 0, 
      transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } 
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-transparent pt-32 pb-48 px-6 sm:px-10 z-20">
      {/* Background Ornaments (Glass/Gradient AI feel) */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[0%] w-[30rem] h-[30rem] bg-tertiary-fixed opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-20">
        
        {/* AI Insight Badge translated from DESIGN.md  */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-fixed/10 mb-8"
        >
          <Sparkles className="w-[14px] h-[14px] text-on-tertiary-fixed-variant" />
          <span className="text-[0.6875rem] font-inter uppercase tracking-widest text-on-tertiary-fixed-variant font-medium">
            DevReview.ai Intelligence
          </span>
        </motion.div>

        {/* Staggered Heading Reveal */}
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-inter font-extrabold tracking-tight text-on-surface max-w-4xl flex flex-wrap justify-center gap-x-3 gap-y-2"
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden pb-2">
              <motion.span 
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtitle fading in after heading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          className="mt-6 font-inter text-[1.125rem] text-on-surface-variant max-w-2xl leading-relaxed"
        >
          Stop waiting on sluggish PR reviews. Let our AI analyze your codebase and instantly suggest optimizations and security patches.
        </motion.p>

        {/* CTAs mapped to primary & secondary button rules */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-2xl font-inter font-medium shadow-none hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            Start Review
            <ArrowRight className="w-[18px] h-[18px]" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-surface-container-high text-primary rounded-2xl font-inter font-medium hover:bg-surface-container transition-colors">
            View Example
          </button>
        </motion.div>
      </div>

      {/* Floating Mock "Resume Match Score" Card overlapping fold (Physics floating) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: [-10, 10, -10], opacity: 1 }}
        transition={{ 
          opacity: { duration: 1, delay: 1.2 }, 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 } 
        }}
        className="absolute -bottom-24 z-10 w-[90%] md:w-[600px] h-auto p-8 rounded-[2rem] bg-surface-container-lowest/90 border border-outline-variant/15 flex flex-col md:flex-row items-center gap-6 shadow-[0_20px_40px_rgba(32,13,76,0.06)] backdrop-blur-xl"
      >
        {/* Mock Graphic: Ring graph representation */}
        <div className="relative w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center">
            {/* Background ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-surface-container" />
            </svg>
            {/* Foreground progress ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-sm">
                <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray="276" strokeDashoffset="25" strokeLinecap="round" />
            </svg>
            <span className="text-[1.5rem] font-extrabold font-inter text-primary tracking-tight">95%</span>
        </div>
        
        {/* Mock Copy */}
        <div className="flex flex-col text-center md:text-left">
            <h3 className="font-inter font-bold text-[1.25rem] text-on-surface">Pristine Code Health</h3>
            <p className="font-inter text-[0.875rem] text-on-surface-variant mt-2 leading-relaxed">
              Based on our static analysis, your PR introduces no new vulnerabilities and aligns perfectly with the <strong>Project Styling Guidelines</strong>.
            </p>
        </div>
      </motion.div>
    </section>
  );
}
