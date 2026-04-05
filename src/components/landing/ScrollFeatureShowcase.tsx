import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function ScrollFeatureShowcase() {
  const containerRef = useRef<HTMLElement>(null);

  // Hook into the scroll position of the section
  // "start end" = when the top of the container hits the bottom of the viewport
  // "center center" = when the center of the container hits the center of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Transform values for the AI card tying to the scroll progress
  // Travels securely from invisible/low to fully visible directly mapping the user's scroll speed
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.9], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.2, 1], [150, 0]);
  
  // Transform values for a secondary floating element inside the card for parallax depth
  const badgeY = useTransform(scrollYProgress, [0.4, 1], [60, -10]);

  return (
    <section ref={containerRef} className="w-full py-32 md:py-48 px-6 sm:px-10 bg-surface-container-lowest/10 backdrop-blur-xl relative z-30 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* Left Side: Copy & Content sliding up normally */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="lg:w-1/2 flex flex-col items-start relative z-20"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-fixed/10 mb-6">
            <Sparkles className="w-[14px] h-[14px] text-on-tertiary-fixed-variant" />
            <span className="text-[0.6875rem] font-inter uppercase tracking-widest text-on-tertiary-fixed-variant font-medium">
              Real-time Generation
            </span>
          </div>

          <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-inter font-extrabold tracking-tight text-on-surface mb-6">
            Tailor to every job. <br />
            <span className="text-primary opacity-90">In milliseconds.</span>
          </h2>
          
          <p className="text-body-md text-on-surface-variant text-[1.125rem] leading-relaxed max-w-lg mb-10">
            DevReview.ai reads the pull request diff and instantly re-writes your code to highlight the precise optimizations senior engineers are searching for.
          </p>

          {/* Value Props List */}
          <ul className="flex flex-col gap-5">
             <li className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-2xl bg-surface flex items-center justify-center shadow-sm">
                 <CheckCircle2 className="w-5 h-5 text-primary" />
               </div>
               <span className="font-inter text-on-surface font-medium text-[1.125rem]">Bypass ATS keyword filters</span>
             </li>
             <li className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-2xl bg-surface flex items-center justify-center shadow-sm">
                 <CheckCircle2 className="w-5 h-5 text-primary" />
               </div>
               <span className="font-inter text-on-surface font-medium text-[1.125rem]">Quantify impact dynamically</span>
             </li>
             <li className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-2xl bg-surface flex items-center justify-center shadow-sm">
                 <CheckCircle2 className="w-5 h-5 text-primary" />
               </div>
               <span className="font-inter text-on-surface font-medium text-[1.125rem]">Preserve your unique voice</span>
             </li>
          </ul>
        </motion.div>

        {/* Right Side: Scroll-tied UI Card */}
        <div className="lg:w-1/2 w-full relative h-[500px] flex items-center justify-center lg:justify-end">
          {/* Subtle glow behind the card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-tertiary-fixed/5 rounded-full blur-[100px] pointer-events-none" />

          {/* The AI Suggestion Card perfectly mapped to scrollYProgress */}
          <motion.div 
            style={{ opacity: cardOpacity, y: cardY }}
            className="w-full max-w-md bg-surface-container-highest rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(32,13,76,0.08)] relative z-20"
          >
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shadow-inner">
                    <Sparkles className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <h4 className="font-inter font-bold text-on-surface text-lg">AI Suggestion</h4>
                   <p className="font-inter text-sm text-on-surface-variant mt-0.5">Scanning "Frontend Architect"</p>
                 </div>
               </div>
            </div>

            <div className="space-y-4">
              {/* Crossed out original text */}
              <div className="p-5 rounded-[1.25rem] bg-surface line-through opacity-40">
                 <p className="font-inter text-[0.95rem] text-on-surface">Built components for the website using React.</p>
              </div>
              
              {/* New Optimized Text */}
              <div className="p-6 rounded-[1.25rem] bg-surface border-l-4 border-tertiary-fixed shadow-md relative">
                 <p className="font-inter text-[1rem] leading-relaxed text-on-surface font-semibold">
                   Architected an enterprise-grade React component library, accelerating cross-team feature delivery by 40%.
                 </p>
                 
                 {/* Parallax nested element simulating AI magic */}
                 <motion.div 
                   style={{ y: badgeY }}
                   className="absolute -right-4 -bottom-4 bg-tertiary-fixed text-on-tertiary-fixed-variant px-4 py-1.5 rounded-full font-inter text-[0.8rem] tracking-wide font-extrabold shadow-lg"
                 >
                    +85% Impact
                 </motion.div>
              </div>
              
              {/* Skeleton loading below */}
              <div className="p-5 rounded-[1.25rem] bg-surface-container-high/50 animate-pulse mt-6">
                 <div className="h-4 bg-surface-container-highest rounded-md w-3/4 mb-3"></div>
                 <div className="h-4 bg-surface-container-highest rounded-md w-1/2"></div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
