import React from 'react';
import { UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="pt-8 scroll-mt-20">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-1.5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-[11px] font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 mb-1">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Professional Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            About Awonke Philibane
          </h2>
        </motion.div>

        {/* Centered Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-md"
        >
          <p className="text-center text-neutral-800 dark:text-neutral-200 text-sm sm:text-base leading-relaxed font-normal">
            I am an <strong className="font-bold text-neutral-950 dark:text-white">IT Technical Support</strong> with a strong background in <strong className="font-bold text-neutral-950 dark:text-white">Business and Information Administration</strong>, currently driving service excellence at <strong className="font-bold text-neutral-950 dark:text-white">CAPACITI</strong>. By combining technical proficiency in <strong className="font-bold text-neutral-950 dark:text-white">Fundamental Network (CCNA)</strong> and <strong className="font-bold text-neutral-950 dark:text-white">Microsoft 365</strong> with a focus on operational excellence, I ensure that technology serves as a seamless backbone for organizational productivity.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
