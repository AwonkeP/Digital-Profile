import React from 'react';
import { Send, Briefcase, Network, Database, Layers, GraduationCap, MapPin, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PROFILE_INFO } from '../data';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section id="hero" className="relative pt-4 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Headline, Bio & Action Buttons */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Active IT Support @ CAPACITI
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              IT Technical Support
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-500 mt-1">
                Optimizing Systems & Business Workflows
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl pt-1">
              {PROFILE_INFO.elevatorPitch}
            </p>
          </div>

          {/* Key Competency Pills */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Network className="w-3.5 h-3.5 text-sky-500" />
              <span>CCNA Track</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-indigo-500" />
              <span>SQL & Databases</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>M365 & SAP Admin</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
              <span>B.Tech CPUT Graduate</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-3.5 pt-2">
            <a
              id="hero-contact-cta"
              href="#contact"
              className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-lg shadow-sky-600/25 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>
            
            <a
              id="hero-experience-cta"
              href="#experience"
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>View Experience</span>
            </a>

            <button
              id="hero-view-cv-cta"
              onClick={onOpenResume}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors flex items-center gap-1.5"
            >
              <span>View Full CV</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

        </div>

        {/* Right Column: Profile Identity Card with Round Circle Photo */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-3xl bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              {/* Round Circle Picture */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-sky-500 via-indigo-500 to-blue-600 shadow-lg shadow-sky-500/20">
                  <img
                    id="hero-profile-avatar"
                    src={PROFILE_INFO.profileImage}
                    alt={PROFILE_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900"
                  />
                </div>
                {/* Active Indicator Dot */}
                <span
                  title="Active IT Technical Support"
                  className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"
                />
              </div>

              <div>
                <h2 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">
                  {PROFILE_INFO.name}
                </h2>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-0.5">
                  {PROFILE_INFO.role}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-sky-500" />
                  <span>Cape Town, South Africa</span>
                </p>
                <div className="mt-1.5 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Ready for IT & Systems Roles</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50">
                <div className="text-2xl font-black text-slate-900 dark:text-white">4+</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Enterprise Roles
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50">
                <div className="text-xl font-black text-slate-900 dark:text-white">CPUT</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  B.Tech Degree
                </div>
              </div>
            </div>

            {/* Focus Highlights */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                Support Pillars
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>First-Line Incident Diagnostics</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Workflow Bottleneck Elimination</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Network & Database Maintenance</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Public & Private Sector Experience</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
