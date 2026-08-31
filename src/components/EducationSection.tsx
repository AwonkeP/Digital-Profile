import React from 'react';
import { GraduationCap, Network, Database, Award } from 'lucide-react';
import { EDUCATION_DATA } from '../data';

export const EducationSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      default:
        return <Award className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getTagColor = (id: string) => {
    if (id === 'cput-degree') return 'text-amber-600 dark:text-amber-400 bg-amber-500/10';
    if (id === 'ccna-cert') return 'text-sky-600 dark:text-sky-400 bg-sky-500/10';
    return 'text-blue-600 dark:text-blue-400 bg-blue-500/10';
  };

  return (
    <section id="education" className="pt-10 scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">
          Qualifications
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Education & Certifications
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDUCATION_DATA.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded-3xl bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-2xl ${getTagColor(edu.id)} flex items-center justify-center font-bold text-lg`}>
                  {getIcon(edu.icon)}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {edu.tag}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug">
                  {edu.degree}
                </h4>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-1">
                  {edu.institution}
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {edu.details}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span className="font-medium text-slate-700 dark:text-slate-300">{edu.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
