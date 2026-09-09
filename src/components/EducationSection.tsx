import React from 'react';
import { GraduationCap, Network, ShieldCheck, Award } from 'lucide-react';
import { EDUCATION_DATA } from '../data';

export const EducationSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-neutral-950 dark:text-white" />;
      case 'Network':
        return <Network className="w-5 h-5 text-neutral-950 dark:text-white" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-neutral-950 dark:text-white" />;
      default:
        return <Award className="w-5 h-5 text-neutral-950 dark:text-white" />;
    }
  };

  return (
    <section id="education" className="pt-10 scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xs font-bold text-neutral-900 dark:text-neutral-400 uppercase tracking-widest mb-2">
          Qualifications
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
          Education & Training
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDUCATION_DATA.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-neutral-500 dark:hover:border-neutral-600 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-bold text-lg text-neutral-950 dark:text-white">
                  {getIcon(edu.icon)}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-300">
                  {edu.tag}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-neutral-950 dark:text-white text-base leading-snug">
                  {edu.degree}
                </h4>
                <p className="text-xs text-neutral-900 dark:text-neutral-200 font-bold mt-1">
                  {edu.institution}
                </p>
              </div>

              <p className="text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed font-medium">
                {edu.details}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-800 dark:text-neutral-300 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-neutral-950 dark:text-white shrink-0" />
              <span className="font-bold text-neutral-950 dark:text-white">{edu.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
