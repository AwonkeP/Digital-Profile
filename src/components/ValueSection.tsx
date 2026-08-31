import React from 'react';
import { Layers, Activity, HeartHandshake } from 'lucide-react';

export const ValueSection: React.FC = () => {
  return (
    <section id="value" className="pt-10 scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-2">
          Why Work With Awonke?
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
          Core Value Proposition
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-sm relative space-y-3 hover:border-neutral-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-neutral-300">01</span>
            <div className="p-2.5 rounded-2xl bg-neutral-100 text-neutral-950 border border-neutral-300">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-lg font-extrabold text-neutral-950">
            Dual Perspective
          </h4>
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
            Combines deep administrative and workflow understanding with hard technical support skills (SQL, Fundamental CCNA, M365) to ensure systems support human workflows effectively.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-sm relative space-y-3 hover:border-neutral-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-neutral-300">02</span>
            <div className="p-2.5 rounded-2xl bg-neutral-100 text-neutral-950 border border-neutral-300">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-lg font-extrabold text-neutral-950">
            Proactive Troubleshooting
          </h4>
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
            Shifts the IT team culture from reactive ticket-fixing to root-cause analysis, preventing repeat incidents and optimizing business workflows.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-sm relative space-y-3 hover:border-neutral-500 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-neutral-300">03</span>
            <div className="p-2.5 rounded-2xl bg-neutral-100 text-neutral-950 border border-neutral-300">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <h4 className="text-lg font-extrabold text-neutral-950">
            User-Centric Service
          </h4>
          <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
            Dedicated to delivering clear communication, rapid response times, and empathetic technical assistance across all organizational tiers.
          </p>
        </div>

      </div>
    </section>
  );
};
