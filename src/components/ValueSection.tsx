import React from 'react';
import { Layers, Activity, HeartHandshake } from 'lucide-react';

export const ValueSection: React.FC = () => {
  return (
    <section id="value" className="pt-10 scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">
          Why Work With Awonke?
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Core Value Proposition
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-sky-500/30 dark:text-sky-400/25">01</span>
            <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Dual Perspective
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Combines deep administrative and workflow understanding with hard technical support skills (SQL, Fundamental CCNA, M365) to ensure systems support human workflows effectively.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-indigo-500/30 dark:text-indigo-400/25">02</span>
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Proactive Troubleshooting
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Shifts the IT team culture from reactive ticket-fixing to root-cause analysis, preventing repeat incidents and optimizing business workflows.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-emerald-500/30 dark:text-emerald-400/25">03</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            User-Centric Service
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Dedicated to delivering clear communication, rapid response times, and empathetic technical assistance across all organizational tiers.
          </p>
        </div>

      </div>
    </section>
  );
};
