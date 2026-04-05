import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { GripVertical, Briefcase, GraduationCap } from 'lucide-react';

interface PreferenceRankingProps {
  onComplete: (data: { jobType: string; workModes: string[] }) => void;
}

const PreferenceRanking: React.FC<PreferenceRankingProps> = ({ onComplete }) => {
  const [jobType, setJobType] = useState<'Internship' | 'Full-time'>('Full-time');
  const [workModes, setWorkModes] = useState(['Remote', 'Hybrid', 'Onsite']);

  const handleGenerate = () => {
    const finalData = { jobType, workModes };
    console.log("Final Preferences: ", finalData);
    alert("AI Match Strategy generated! Check the console for data.");
    onComplete(finalData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold font-inter text-slate-900 dark:text-white mb-3">Set Your Preferences</h2>
        <p className="text-slate-500 dark:text-slate-400 font-inter">Almost done. Tell us what you're looking for to tailor your AI Match Strategy.</p>
      </div>

      {/* Section 1: Job Type Radio Cards */}
      <div className="mb-10">
        <h3 className="text-lg font-bold font-inter text-slate-800 dark:text-white mb-4">What type of role?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setJobType('Full-time')}
            className={`cursor-pointer border rounded-2xl p-6 flex flex-col items-center justify-center transition-colors duration-300 ${
              jobType === 'Full-time'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
              jobType === 'Full-time' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
            }`}>
              <Briefcase className="w-6 h-6" />
            </div>
            <h4 className={`font-bold font-inter text-lg ${jobType === 'Full-time' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
              Full-time Role
            </h4>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setJobType('Internship')}
            className={`cursor-pointer border rounded-2xl p-6 flex flex-col items-center justify-center transition-colors duration-300 ${
              jobType === 'Internship'
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
              jobType === 'Internship' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
            }`}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <h4 className={`font-bold font-inter text-lg ${jobType === 'Internship' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}>
              Internship
            </h4>
          </motion.div>
        </div>
      </div>

      {/* Section 2: Drag & Drop Work Modes */}
      <div className="mb-10">
        <h3 className="text-lg font-bold font-inter text-slate-800 dark:text-white mb-4">
          Rank your work mode priorities <span className="text-sm font-normal text-slate-500">(Drag to reorder)</span>
        </h3>
        
        <Reorder.Group axis="y" values={workModes} onReorder={setWorkModes} className="space-y-3">
          {workModes.map((mode) => (
            <Reorder.Item 
              key={mode} 
              value={mode}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between cursor-grab active:cursor-grabbing hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <GripVertical className="text-slate-400 w-5 h-5" />
                <span className="font-medium font-inter text-slate-800 dark:text-slate-200">{mode}</span>
              </div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider font-inter">
                Drag
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      {/* Final CTA */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGenerate}
        className="w-full py-4 relative group overflow-hidden rounded-2xl font-inter font-bold text-lg text-white shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient" />
        <span className="relative z-10 flex items-center justify-center gap-2">
          Generate AI Match Strategy &rarr;
        </span>
      </motion.button>
    </div>
  );
};

export default PreferenceRanking;
