import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface AuthModalProps {
  mode: 'login' | 'signup' | null;
  setMode: (mode: 'login' | 'signup' | null) => void;
}

export default function AuthModal({ mode, setMode }: AuthModalProps) {
  return (
    <AnimatePresence>
      {mode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMode(null)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md pointer-events-auto"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-md p-8 relative mx-4 pointer-events-auto flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={() => setMode(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <h2 className="text-[2rem] font-inter font-extrabold text-white tracking-tight mb-2">
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="font-inter text-slate-400 text-sm mb-8 leading-relaxed">
              {mode === 'login' 
                ? 'Enter your details to access your dashboard.' 
                : 'Join thousands of job seekers optimizing their careers.'}
            </p>

            {/* Form Fields */}
            <div className="flex flex-col gap-5 mb-8">
              {mode === 'signup' && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-inter font-medium text-slate-300 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-inter placeholder:text-slate-600 shadow-inner"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-inter font-medium text-slate-300 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-inter placeholder:text-slate-600 shadow-inner"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-inter font-medium text-slate-300 uppercase tracking-wider">Password</label>
                  {mode === 'login' && <a href="#" className="text-xs text-primary hover:text-primary-container transition-colors">Forgot password?</a>}
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-inter placeholder:text-slate-600 shadow-inner"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-inter font-bold text-[1.125rem] shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              {mode === 'login' ? 'Sign In' : 'Sign Up'}
            </motion.button>

            {/* Toggle Mode Link */}
            <div className="mt-8 text-center border-t border-slate-800/50 pt-6">
              <p className="text-sm font-inter text-slate-400">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-primary font-medium hover:text-primary-container transition-colors"
                >
                  {mode === 'login' ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
