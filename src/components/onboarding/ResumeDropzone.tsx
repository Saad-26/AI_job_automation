import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Loader } from 'lucide-react';

type UploadState = 'idle' | 'dragging' | 'scanning' | 'success';

const PROGRESS_PHASES = [
  "Parsing PDF...",
  "Extracting skills...",
  "Analyzing project history...",
  "Structuring data..."
];

interface ResumeDropzoneProps {
  onSuccessComplete?: () => void;
}

const ResumeDropzone: React.FC<ResumeDropzoneProps> = ({ onSuccessComplete }) => {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadState('scanning');
      // Simulate scanning progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);
        
        // Update phase text every 25%
        if (currentProgress % 25 === 0 && currentProgress < 100) {
          setPhaseIndex(prev => Math.min(prev + 1, PROGRESS_PHASES.length - 1));
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          setUploadState('success');
          if (onSuccessComplete) {
            setTimeout(onSuccessComplete, 1500);
          }
        }
      }, 30); // 100 steps * 30ms = 3000ms
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: uploadState === 'scanning' || uploadState === 'success'
  });

  // Automatically update state to dragging when active
  useEffect(() => {
    if (uploadState !== 'scanning' && uploadState !== 'success') {
      setUploadState(isDragActive ? 'dragging' : 'idle');
    }
  }, [isDragActive, uploadState]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold font-inter text-slate-900 dark:text-white mb-3">Upload your Codebase (.zip)</h2>
        <p className="text-slate-500 dark:text-slate-400 font-inter">Let our AI analyze your experience and build your premium profile.</p>
      </div>

      <motion.div
        {...(getRootProps() as any)}
        className={`w-full relative overflow-hidden flex flex-col items-center justify-center p-12 cursor-pointer transition-colors duration-300 border-2 border-dashed rounded-3xl ${
          isDragActive 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50'
        } ${uploadState === 'scanning' || uploadState === 'success' ? 'pointer-events-none' : ''}`}
        animate={{
          scale: isDragActive ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {(uploadState === 'idle' || uploadState === 'dragging') && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                <UploadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold font-inter text-slate-800 dark:text-white mb-2">
                Drag &amp; drop your archive
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-inter text-sm mb-4">
                Supported format: PDF up to 5MB
              </p>
              <div className="px-6 py-2 rounded-full border border-slate-200 dark:border-slate-700 font-inter text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 shadow-sm">
                Browse Files
              </div>
            </motion.div>
          )}

          {uploadState === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center w-full max-w-md mx-auto py-4"
            >
              <Loader className="w-12 h-12 text-blue-500 animate-spin mb-6" />
              
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="flex justify-between w-full text-xs font-inter mb-2 text-slate-500 dark:text-slate-400 font-medium">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phaseIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {PROGRESS_PHASES[phaseIndex]}
                  </motion.span>
                </AnimatePresence>
                <span>{progress}%</span>
              </div>
            </motion.div>
          )}

          {uploadState === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold font-inter text-slate-800 dark:text-white mb-2">
                Extraction Complete
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-inter font-medium">
                Your profile is ready for review.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResumeDropzone;
