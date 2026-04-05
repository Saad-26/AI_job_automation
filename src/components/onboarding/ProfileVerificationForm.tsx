import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { UserCheck, Briefcase } from 'lucide-react';

const verificationSchema = z.object({
  FullName: z.string().min(2, 'Full name is required'),
  Email: z.string().email('Invalid email address'),
  PrimaryRole: z.string().min(2, 'Primary role is required'),
  TenthPercentage: z.number({ invalid_type_error: 'Must be a number' }).min(0).max(100, 'Must be <= 100'),
  TwelfthPercentage: z.number({ invalid_type_error: 'Must be a number' }).min(0).max(100, 'Must be <= 100'),
  ActiveBacklogs: z.number({ invalid_type_error: 'Must be a number' }).min(0, 'Cannot be negative'),
  PanCard: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Card format (e.g., ABCDE1234F)'),
  NoticePeriod: z.enum(['Immediate', '15 Days', '30 Days', '60+ Days'], {
    errorMap: () => ({ message: 'Please select a valid notice period' })
  }),
});

type VerificationSchema = z.infer<typeof verificationSchema>;

interface ProfileVerificationFormProps {
  onConfirm: (data: VerificationSchema) => void;
}

const ProfileVerificationForm: React.FC<ProfileVerificationFormProps> = ({ onConfirm }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<VerificationSchema>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      FullName: "Alex Developer",
      Email: "alex@example.com",
      PrimaryRole: "Software Engineer",
      TenthPercentage: undefined,
      TwelfthPercentage: undefined,
      ActiveBacklogs: 0,
      PanCard: "",
      NoticePeriod: "Immediate",
    }
  });

  const onSubmit = (data: VerificationSchema) => {
    console.log("Verified Data: ", data);
    onConfirm(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold font-inter text-slate-900 dark:text-white mb-3">Verify Your Profile</h2>
        <p className="text-slate-500 dark:text-slate-400 font-inter">We've extracted info from your codebase. Please verify the analysis scope and fill in missing fields.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        
        {/* Section 1: Extracted Data */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800/50 pb-4">
            <UserCheck className="text-blue-500 w-5 h-5" />
            <h3 className="font-bold text-lg font-inter text-slate-800 dark:text-white">Extracted Data</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 font-inter">Full Name</label>
              <input 
                {...register('FullName')} 
                className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 w-full outline-none text-slate-800 dark:text-white font-inter transition-all"
                placeholder="John Doe"
              />
              {errors.FullName && <span className="text-red-500 text-xs mt-1 block font-inter">{errors.FullName.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 font-inter">Email Address</label>
                <input 
                  {...register('Email')} 
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 w-full outline-none text-slate-800 dark:text-white font-inter transition-all"
                  placeholder="john@example.com"
                />
                {errors.Email && <span className="text-red-500 text-xs mt-1 block font-inter">{errors.Email.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 font-inter">Primary Role</label>
                <input 
                  {...register('PrimaryRole')} 
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 w-full outline-none text-slate-800 dark:text-white font-inter transition-all"
                  placeholder="Software Engineer"
                />
                {errors.PrimaryRole && <span className="text-red-500 text-xs mt-1 block font-inter">{errors.PrimaryRole.message}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Indian IT Profile */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 dark:border-slate-800/50 pb-4">
            <Briefcase className="text-blue-500 w-5 h-5" />
            <h3 className="font-bold text-lg font-inter text-slate-800 dark:text-white">Additional IT Profile Info</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 font-inter">10th Percentage</label>
                <input 
                  type="number" step="0.01"
                  {...register('TenthPercentage', { valueAsNumber: true })} 
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 w-full outline-none text-slate-800 dark:text-white font-inter transition-all"
                  placeholder="e.g. 85.50"
                />
                {errors.TenthPercentage && <span className="text-red-500 text-xs mt-1 block font-inter">{errors.TenthPercentage.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 font-inter">12th Percentage</label>
                <input 
                  type="number" step="0.01"
                  {...register('TwelfthPercentage', { valueAsNumber: true })} 
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 w-full outline-none text-slate-800 dark:text-white font-inter transition-all"
                  placeholder="e.g. 88.00"
                />
                {errors.TwelfthPercentage && <span className="text-red-500 text-xs mt-1 block font-inter">{errors.TwelfthPercentage.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 font-inter">Active Backlogs</label>
                <input 
                  type="number"
                  {...register('ActiveBacklogs', { valueAsNumber: true })} 
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 w-full outline-none text-slate-800 dark:text-white font-inter transition-all"
                  placeholder="0"
                />
                {errors.ActiveBacklogs && <span className="text-red-500 text-xs mt-1 block font-inter">{errors.ActiveBacklogs.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 font-inter">PAN Card</label>
                <input 
                  {...register('PanCard')} 
                  className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 w-full outline-none text-slate-800 dark:text-white uppercase font-inter transition-all"
                  placeholder="ABCDE1234F"
                />
                {errors.PanCard && <span className="text-red-500 text-xs mt-1 block font-inter">{errors.PanCard.message}</span>}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 font-inter">Notice Period</label>
              <select 
                {...register('NoticePeriod')}
                className="bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 w-full outline-none text-slate-800 dark:text-white font-inter transition-all appearance-none"
              >
                <option value="Immediate">Immediate</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60+ Days">60+ Days</option>
              </select>
              {errors.NoticePeriod && <span className="text-red-500 text-xs mt-1 block font-inter">{errors.NoticePeriod.message}</span>}
            </div>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-inter font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50"
        >
          Confirm &amp; Set Priorities &rarr;
        </motion.button>
      </form>
    </div>
  );
};

export default ProfileVerificationForm;
