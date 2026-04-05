import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, CheckCircle } from 'lucide-react';

const LOG_MESSAGES = [
  "> Initializing Chrome Extension session...",
  "> Navigating to Techolution Lever portal...",
  "> Injecting parsed Python/FastAPI skills into Master Schema...",
  "> Bypassing bot detection algorithms...",
  "> Techolution application submitted successfully.",
  "> Navigating to SGRG Technologies Greenhouse portal...",
  "> Uploading ZIP archive and code history...",
  "> All selected applications submitted."
];

type ApplyStep = 'missing_data' | 'executing' | 'success';

interface SmartApplyModalProps {
  onClose: () => void;
  onSuccessReturn: () => void;
}

const SmartApplyModal: React.FC<SmartApplyModalProps> = ({ onClose, onSuccessReturn }) => {
  const [step, setStep] = useState<ApplyStep>('missing_data');
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    if (step === 'executing') {
      const pushLog = () => {
        if (index < LOG_MESSAGES.length) {
          setLogs(prev => [...prev, LOG_MESSAGES[index]]);
          index++;
          timer = setTimeout(pushLog, 800);
        } else {
          // Finished simulating
          timer = setTimeout(() => setStep('success'), 1200);
        }
      };
      
      timer = setTimeout(pushLog, 500); // initial delay
    }

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={step === 'executing' ? undefined : onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-lg font-bold text-white font-inter flex items-center gap-2">
            {step === 'missing_data' ? "Additional Info Required for 2 Roles" : step === 'executing' ? "Automated Agent Running..." : "Application Complete"}
          </h2>
          {step !== 'executing' && (
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <AnimatePresence mode="wait">
            {step === 'missing_data' && (
              <motion.div
                key="missing_data"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col gap-6"
              >
                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
                  <label className="block text-sm font-medium text-slate-300 font-inter mb-2">
                    <span className="text-blue-400 font-bold">Techolution</span> is asking: Briefly describe a time you built an AI Backend or RAG architecture.
                  </label>
                  <textarea 
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 text-slate-200 font-inter outline-none resize-none transition-colors"
                    placeholder="E.g., In my last role, I designed a RAG pipeline using LangChain and Pinecone..."
                  />
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5">
                  <label className="block text-sm font-medium text-slate-300 font-inter mb-2">
                    <span className="text-blue-400 font-bold">SGRG Technologies</span> requires a GitHub link to a relevant micro-expression or computer vision project.
                  </label>
                  <input 
                    type="url"
                    className="w-full bg-slate-900 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg p-3 text-slate-200 font-inter outline-none transition-colors"
                    placeholder="https://github.com/yourusername/micro-expressions"
                  />
                </div>
              </motion.div>
            )}

            {step === 'executing' && (
              <motion.div
                key="executing"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col bg-slate-950 border border-slate-800 rounded-xl p-4 h-64 overflow-hidden relative"
              >
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-800/50">
                  <Terminal className="text-slate-500 w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-mono font-bold">Terminal View</span>
                </div>
                
                <div className="flex-1 overflow-y-auto font-mono text-sm space-y-2 pb-4">
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`break-words ${log.includes("successfully") || log.includes("submitted") ? 'text-teal-400 font-bold' : 'text-slate-400'}`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={logsEndRef} />
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="rounded-full bg-emerald-500/20 p-6 mb-6 relative"
                >
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
                  <CheckCircle className="text-emerald-400 w-16 h-16 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white font-inter mb-3 border-none">
                  Applications Submitted Successfully
                </h3>
                <p className="text-slate-400 max-w-sm mb-2 font-inter">
                  Your personalized applications have been injected into all destination portals flawlessly.
                </p>
                <p className="text-slate-500 text-sm font-inter">
                  Check your Application History for updates.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-900/80 border-t border-slate-800 flex justify-end">
          {step === 'missing_data' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStep('executing')}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold font-inter rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-500 transition-colors"
            >
              Start Auto-Apply Engine &rarr;
            </motion.button>
          )}

          {step === 'executing' && (
            <div className="flex items-center gap-2 text-slate-400 text-sm font-inter">
              <span className="animate-pulse w-2 h-2 bg-blue-500 rounded-full" />
              Agent is crunching data...
            </div>
          )}

          {step === 'success' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSuccessReturn}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 border border-emerald-500 text-white font-bold font-inter rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-500 transition-colors"
            >
              Return to Dashboard
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SmartApplyModal;
