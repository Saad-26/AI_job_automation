import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxCTAProps {
  onGetStarted: () => void;
}

export default function ParallaxCTA({ onGetStarted }: ParallaxCTAProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Hook into the scroll position of the footer container
  // Tracks from the moment it enters the viewport bottom ("start end")
  // To the moment it is fully inside the viewport ("end end")
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Map the progress to a Y-axis translation:
  // Starts pushed up (-100px) underneath the previous section, settles to 0px
  const yTransform = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 w-full min-h-[60vh] bg-transparent flex flex-col justify-end pb-8"
    >
      {/* Wrapper bound to scroll transform for parallax reveal effect */}
      <motion.div 
        style={{ y: yTransform }} 
        className="w-full px-4 sm:px-6 md:px-10 flex flex-col justify-center"
      >
        <div className="w-full max-w-7xl mx-auto p-12 md:p-24 bg-gradient-to-br from-primary to-primary-container rounded-[3rem] flex flex-col items-center text-center shadow-lg relative overflow-hidden">
          
          {/* Subtle design accents within the CTA */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full blur-[100px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black opacity-[0.05] rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

          <h2 className="text-[2.5rem] md:text-[4.5rem] leading-[1.05] font-inter font-extrabold text-on-primary tracking-tight mb-8 relative z-10">
            Ready to land your <br /> dream job?
          </h2>

          <p className="text-[1.125rem] md:text-[1.25rem] text-on-primary/90 font-inter max-w-2xl mb-12 leading-relaxed relative z-10">
            Stop guessing what causes bugs. Let our intelligent analyzer perfectly audit your codebase for every known vulnerability in milliseconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative z-10">
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-surface text-primary rounded-[1.25rem] font-inter text-lg font-bold hover:scale-[1.03] transition-transform shadow-xl"
            >
              Get started today — free
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-primary-container/20 border border-on-primary/20 text-on-primary rounded-[1.25rem] font-inter text-lg font-medium hover:bg-primary-container/40 transition-colors backdrop-blur-md">
              View Pricing
            </button>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
