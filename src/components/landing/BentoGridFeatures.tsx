import { motion } from 'framer-motion';
import { BarChart, Bot, Layers } from 'lucide-react';

export default function BentoGridFeatures() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
  };

  return (
    <section className="w-full pt-40 md:pt-48 pb-20 md:pb-32 px-6 sm:px-10 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-2xl">
          <h2 className="text-[2rem] md:text-[2.75rem] font-inter font-extrabold tracking-tight text-on-surface mb-6 leading-tight">
            Everything you need. <br/> <span className="text-primary-container">Nothing you don't.</span>
          </h2>
          <p className="text-body-md text-on-surface-variant text-[1.125rem] leading-relaxed">
            A comprehensive suite of tools designed exclusively to give you the upper hand without cluttering your workflow.
          </p>
        </div>

        {/* Bento Grid layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 w-full"
        >
          {/* Master Card - Visual Job Tracker (Spans 2 cols, 2 rows) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="md:col-span-2 md:row-span-2 bg-surface-container-low rounded-[2rem] p-10 flex flex-col relative overflow-hidden group cursor-pointer"
          >
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Layers className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-[1.75rem] font-inter font-bold text-on-surface mb-3">Visual Job Tracker</h3>
                <p className="font-inter text-[1.125rem] text-on-surface-variant max-w-md leading-relaxed">
                  Drag and drop your applications across a beautiful, physics-based canvas. Never lose track of an interview stage again.
                </p>
              </div>
              
              {/* Mock UI for Tracker built with no borders */}
              <div className="mt-12 w-full bg-surface-container rounded-[1.5rem] p-6 flex gap-4 shadow-none opacity-90 group-hover:opacity-100 transition-opacity">
                 <div className="h-40 w-1/3 bg-surface-container-high rounded-xl"></div>
                 <div className="h-48 w-1/3 bg-surface-container-highest rounded-xl shadow-[0_20px_40px_rgba(32,13,76,0.06)] transform -translate-y-4"></div>
                 <div className="h-32 w-1/3 bg-surface-container-high rounded-xl"></div>
              </div>
            </div>
            {/* Soft background gradient */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] -m-10 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
          </motion.div>

          {/* AI Tailoring Tile */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-surface-container rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed/20 flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-on-tertiary-fixed-variant" />
              </div>
              <h3 className="text-[1.35rem] font-inter font-bold text-on-surface mb-3">AI Tailoring</h3>
              <p className="font-inter text-[1rem] text-on-surface-variant leading-relaxed">
                Instantly rewrite bullet points to match exactly what recruiter ATS systems are scanning for.
              </p>
            </div>
          </motion.div>

          {/* Metrics & Analytics Tile */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-surface-container-highest rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center mb-6 shadow-sm">
                <BarChart className="w-6 h-6 text-on-surface" />
              </div>
              <h3 className="text-[1.35rem] font-inter font-bold text-on-surface mb-3">Metrics</h3>
              <p className="font-inter text-[1rem] text-on-surface-variant leading-relaxed">
                Track your codebase health over time. Know exactly which architectural patterns perform best.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
