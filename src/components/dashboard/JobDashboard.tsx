import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, CheckCircle2, Circle, Sparkles, Filter, ExternalLink } from 'lucide-react';
import SmartApplyModal from './SmartApplyModal';

const MOCK_JOBS = [
  { id: 'job-1', role: 'AI/ML Engineer', company: 'Google', platform: 'Greenhouse', matchScore: 95, tags: ['Remote', 'Senior', 'Python'] },
  { id: 'job-2', role: 'Data Scientist (GenAI)', company: 'Techolution', platform: 'Lever', matchScore: 92, tags: ['Hybrid', 'Mid-Level', 'NLP'] },
  { id: 'job-3', role: 'AI Backend Developer', company: 'TCS', platform: 'Workday', matchScore: 89, tags: ['Onsite', 'Entry Level', 'Java'] },
  { id: 'job-4', role: 'Prompt Engineer', company: 'Anthropic', platform: 'Greenhouse', matchScore: 96, tags: ['Remote', 'Mid-Level', 'LLMs'] },
  { id: 'job-5', role: 'Machine Learning Intern', company: 'Internshala', platform: 'Internshala', matchScore: 84, tags: ['Remote', 'Internship', 'TensorFlow'] },
  { id: 'job-6', role: 'Full Stack AI Developer', company: 'SGRG Technologies', platform: 'Custom Form', matchScore: 88, tags: ['Hybrid', 'Mid-Level', 'React'] },
  { id: 'job-7', role: 'Computer Vision Engineer', company: 'Tesla', platform: 'Lever', matchScore: 91, tags: ['Onsite', 'Senior', 'C++'] },
  { id: 'job-8', role: 'Data Engineer', company: 'Amazon', platform: 'Workday', matchScore: 82, tags: ['Hybrid', 'Entry Level', 'AWS'] }
];

const JobDashboard: React.FC = () => {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [isApplying, setIsApplying] = useState(false);

  const toggleJob = (id: string) => {
    setSelectedJobs(prev => 
      prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedJobs.length === MOCK_JOBS.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(MOCK_JOBS.map(job => job.id));
    }
  };

  const handleApply = () => {
    setIsApplying(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-24 px-6 sm:px-10 pb-32 font-inter relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Structure (Strategy Summary) */}
        <aside className="w-full lg:w-1/4 flex-shrink-0 order-2 lg:order-1 relative">
          <div className="sticky top-28 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="text-blue-500 w-5 h-5" />
              Strategy Summary
            </h3>
            <div className="h-px w-full bg-slate-800 my-4" />
            
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Based on your repository and codebase, DevReview.ai has scoured the files and identified the highest priority security vulnerabilities.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Target Role</span>
                <span className="font-medium text-slate-300">Full-time</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Priorities</span>
                <span className="font-medium text-slate-300">Remote &gt; Hybrid</span>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center mt-auto">
              <span className="text-3xl font-extrabold text-blue-400 mb-1">14</span>
              <span className="text-sm text-blue-300 font-medium">High-Match Roles Found</span>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="w-full lg:w-3/4 flex flex-col order-1 lg:order-2">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">Recommended Matches</h1>
              <p className="text-slate-400">Select the roles you'd like your agent to automatically apply for.</p>
            </div>
            
            <button 
              onClick={selectAll} 
              className="hidden sm:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium border border-blue-500/30 rounded-lg px-4 py-2 hover:bg-blue-500/10"
            >
              <Filter className="w-4 h-4" />
              {selectedJobs.length === MOCK_JOBS.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {MOCK_JOBS.map((job) => {
              const isSelected = selectedJobs.includes(job.id);
              return (
                <motion.div 
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative overflow-hidden bg-slate-900 border rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-blue-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group ${
                     isSelected ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-slate-900/80' : 'border-slate-800'
                  }`}
                  onClick={() => toggleJob(job.id)}
                >
                  {/* Left: Company & Role */}
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between sm:justify-start gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                          {job.role}
                        </h2>
                      </div>
                      <div className="sm:hidden" onClick={(e) => { e.stopPropagation(); toggleJob(job.id); }}>
                          {isSelected ? (
                            <CheckCircle2 className="w-6 h-6 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-600 group-hover:text-slate-400 transition-colors" />
                          )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                      <span className="flex items-center gap-1 font-medium"><Briefcase className="w-4 h-4" /> {job.company}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-700" />
                      <span className="flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> {job.platform}</span>
                    </div>

                    {/* Middle: Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                        Platform: {job.platform} - {job.platform === 'Greenhouse' || job.platform === 'Lever' ? 'Tier 1' : 'Tier 2'}
                      </span>
                      {job.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md bg-transparent border border-slate-800 text-xs font-medium text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Select & Match Score */}
                  <div className="flex sm:flex-col items-center justify-between sm:justify-center border-t border-slate-800 pt-4 sm:pt-0 sm:border-t-0 sm:border-l sm:pl-6 gap-4">
                      {/* Checkbox for Desktop */}
                      <div className="hidden sm:block absolute top-6 right-6" onClick={(e) => { e.stopPropagation(); toggleJob(job.id); }}>
                          {isSelected ? (
                            <CheckCircle2 className="w-6 h-6 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                          ) : (
                            <Circle className="w-6 h-6 text-slate-600 group-hover:text-slate-400 transition-colors" />
                          )}
                      </div>

                      {/* Match Score */}
                      <div className="flex flex-col items-center justify-center mt-0 sm:mt-6">
                        <div className="relative flex items-center justify-center">
                          <svg className="w-14 h-14 transform -rotate-90">
                            <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                            <circle 
                              cx="28" cy="28" r="24" 
                              stroke="currentColor" strokeWidth="4" fill="transparent" 
                              strokeDasharray="150" 
                              strokeDashoffset={150 - (150 * job.matchScore) / 100} 
                              className={`transition-all duration-1000 ${job.matchScore >= 92 ? 'text-teal-400' : job.matchScore >= 85 ? 'text-blue-400' : 'text-slate-400'}`} 
                            />
                          </svg>
                          <span className={`absolute text-sm font-bold font-mono ${job.matchScore >= 92 ? 'text-teal-400' : job.matchScore >= 85 ? 'text-blue-400' : 'text-slate-300'}`}>
                            {job.matchScore}%
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mt-1">Match</span>
                      </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </main>
      </div>

      {/* Sticky Apply Bar */}
      <AnimatePresence>
        {selectedJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
          >
            <button 
              onClick={handleApply}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] flex items-center justify-center gap-3 font-bold font-inter text-lg whitespace-nowrap hover:scale-[1.02] hover:shadow-[0_15px_50px_-10px_rgba(59,130,246,0.8)] transition-all active:scale-95"
            >
              <span>Apply with AI ({selectedJobs.length} Selected)</span>
              <Sparkles className="w-5 h-5 text-blue-200" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Application Modal */}
      <AnimatePresence>
        {isApplying && (
          <SmartApplyModal 
            onClose={() => setIsApplying(false)} 
            onSuccessReturn={() => {
              setIsApplying(false);
              setSelectedJobs([]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobDashboard;
