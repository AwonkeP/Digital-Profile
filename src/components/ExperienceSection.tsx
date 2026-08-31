import React from 'react';
import { Headset, Server, Handshake, Train, Building2, Laptop, FileText, Users, ShieldCheck, HelpCircle, Wrench, CheckCircle } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data';

export const ExperienceSection: React.FC = () => {
  const currentRole = EXPERIENCE_DATA.find((e) => e.isCurrent);
  const otherRoles = EXPERIENCE_DATA.filter((e) => !e.isCurrent);

  const renderHighlightIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headset':
        return <Headset className="w-4 h-4 text-neutral-950" />;
      case 'Server':
        return <Server className="w-4 h-4 text-neutral-950" />;
      case 'Handshake':
        return <Handshake className="w-4 h-4 text-neutral-950" />;
      case 'Train':
        return <Train className="w-4 h-4 text-neutral-950" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-neutral-950" />;
      case 'Users':
        return <Users className="w-4 h-4 text-neutral-950" />;
      case 'Building2':
        return <Building2 className="w-4 h-4 text-neutral-950" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4 text-neutral-950" />;
      case 'HelpCircle':
        return <HelpCircle className="w-4 h-4 text-neutral-950" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4 text-neutral-950" />;
      case 'Wrench':
        return <Wrench className="w-4 h-4 text-neutral-950" />;
      default:
        return <CheckCircle className="w-4 h-4 text-neutral-950" />;
    }
  };

  return (
    <section id="experience" className="pt-10 scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-2">
          Track Record
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
          Professional Work Experience
        </h3>
      </div>

      <div className="space-y-6">
        
        {/* Featured Current Role: CAPACITI */}
        {currentRole && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-neutral-900 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-2xl shadow-sm">
              Current Role
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  {currentRole.type}
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-neutral-950 mt-0.5">
                  {currentRole.role}
                </h4>
                <div className="text-sm font-semibold text-neutral-700 flex items-center gap-2 mt-1">
                  <span className="text-neutral-950 font-bold">{currentRole.company}</span>
                  <span>•</span>
                  <span>{currentRole.location}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-800 mb-6 leading-relaxed">
              {currentRole.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-800">
              {currentRole.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5"
                >
                  <div className="font-extrabold text-neutral-950 flex items-center gap-2 text-sm">
                    {renderHighlightIcon(hl.icon)}
                    <span>{hl.title}</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Snapshot Grid for Other Roles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherRoles.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-sm hover:border-neutral-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-100 border border-neutral-300 flex items-center justify-center font-bold text-lg text-neutral-950">
                    {exp.id === 'prasa' && <Train className="w-5 h-5 text-neutral-950" />}
                    {exp.id === 'wced' && <Building2 className="w-5 h-5 text-neutral-950" />}
                    {exp.id === 'innovate-tech' && <Laptop className="w-5 h-5 text-neutral-950" />}
                  </div>
                  <span className="text-[11px] font-bold text-neutral-700">
                    {exp.period}
                  </span>
                </div>

                <div>
                  <h4 className="font-extrabold text-neutral-950 text-lg leading-snug">
                    {exp.company}
                  </h4>
                  <div className="text-xs text-neutral-900 font-bold mt-0.5">
                    {exp.role}
                  </div>
                </div>

                <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                  {exp.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200 mt-4 space-y-2">
                {exp.highlights.map((hl, hIdx) => (
                  <div key={hIdx} className="text-[11px] text-neutral-800 flex items-start gap-1.5 font-medium">
                    <span className="text-neutral-950 font-bold">•</span>
                    <span><strong className="text-neutral-950 font-bold">{hl.title}:</strong> {hl.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
