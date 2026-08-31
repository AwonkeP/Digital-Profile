import React from 'react';
import { GraduationCap, Network, Database, Award } from 'lucide-react';
import { EDUCATION_DATA } from '../data';

export const EducationSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-neutral-950" />;
      case 'Network':
        return <Network className="w-5 h-5 text-neutral-950" />;
      case 'Database':
        return <Database className="w-5 h-5 text-neutral-950" />;
      default:
        return <Award className="w-5 h-5 text-neutral-950" />;
    }
  };

  return (
    <section id="education" className="pt-10 scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-2">
          Qualifications
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
          Education & Certifications
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EDUCATION_DATA.map((edu) => (
          <div
            key={edu.id}
            className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-sm space-y-4 flex flex-col justify-between hover:border-neutral-500 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-300 flex items-center justify-center font-bold text-lg text-neutral-950">
                  {getIcon(edu.icon)}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-800">
                  {edu.tag}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-neutral-950 text-base leading-snug">
                  {edu.degree}
                </h4>
                <p className="text-xs text-neutral-900 font-bold mt-1">
                  {edu.institution}
                </p>
              </div>

              <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                {edu.details}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-200 text-xs text-neutral-800 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-neutral-950 shrink-0" />
              <span className="font-bold text-neutral-950">{edu.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
