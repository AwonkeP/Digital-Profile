import React from 'react';
import { Send, Briefcase, Network, Database, Layers, GraduationCap, MapPin, CheckCircle2, ShieldCheck, ArrowUpRight, Linkedin, Github } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-900 text-xs font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Active IT Support @ CAPACITI
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight leading-[1.15]">
              IT Technical Support
              <span className="block text-neutral-900 mt-1 font-bold">
                Optimizing Systems & Business Workflows
              </span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl pt-1">
              {PROFILE_INFO.elevatorPitch}
            </p>
          </div>

          {/* Key Competency Pills */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-300 text-xs font-bold text-neutral-950 flex items-center gap-2 shadow-xs">
              <Network className="w-3.5 h-3.5 text-neutral-950" />
              <span>CCNA Track</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-300 text-xs font-bold text-neutral-950 flex items-center gap-2 shadow-xs">
              <Database className="w-3.5 h-3.5 text-neutral-950" />
              <span>SQL & Databases</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-300 text-xs font-bold text-neutral-950 flex items-center gap-2 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-neutral-950" />
              <span>M365 & SAP Admin</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-300 text-xs font-bold text-neutral-950 flex items-center gap-2 shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-neutral-950" />
              <span>B.Tech CPUT Graduate</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              id="hero-contact-cta"
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>
            
            <a
              id="hero-experience-cta"
              href="#experience"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-300 font-bold text-sm transition-colors flex items-center gap-2 shadow-xs"
            >
              <Briefcase className="w-4 h-4 text-neutral-950" />
              <span>Experience</span>
            </a>

            <button
              id="hero-view-cv-cta"
              onClick={onOpenResume}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm border border-neutral-300 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>View CV</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-950" />
            </button>

            {/* Social Profile Quick Links */}
            <div className="flex items-center gap-2 pl-1">
              <a
                id="hero-linkedin-link"
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-300 transition-all flex items-center gap-1.5 text-xs font-bold shadow-xs"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5] shrink-0" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>

              <a
                id="hero-github-link"
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                className="p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-300 transition-all flex items-center gap-1.5 text-xs font-bold shadow-xs"
              >
                <Github className="w-4 h-4 text-neutral-950 shrink-0" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Profile Identity Card with Round Circle Photo */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-md space-y-5">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              {/* Round Circle Picture */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full p-1 bg-neutral-900 shadow-md">
                  <img
                    id="hero-profile-avatar"
                    src={PROFILE_INFO.profileImage}
                    alt={PROFILE_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                {/* Active Indicator Dot */}
                <span
                  title="Active IT Technical Support"
                  className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"
                />
              </div>

              <div>
                <h2 className="font-extrabold text-neutral-950 text-lg leading-tight">
                  {PROFILE_INFO.name}
                </h2>
                <p className="text-xs text-neutral-900 font-bold mt-0.5">
                  {PROFILE_INFO.role}
                </p>
                <p className="text-xs text-neutral-700 flex items-center justify-center sm:justify-start gap-1 mt-0.5 font-medium">
                  <MapPin className="w-3 h-3 text-neutral-950" />
                  <span>Cape Town, South Africa</span>
                </p>
                <div className="mt-1.5 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-neutral-950 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Ready for IT & Systems Roles</span>
                </div>
              </div>
            </div>

            {/* Social Direct Links Inside Identity Card */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                id="card-linkedin-link"
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-950 border border-neutral-300 text-xs font-bold transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                <span>LinkedIn</span>
              </a>
              <a
                id="card-github-link"
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-950 border border-neutral-300 text-xs font-bold transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-neutral-950" />
                <span>GitHub</span>
              </a>
            </div>

            <hr className="border-neutral-200" />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-300">
                <div className="text-2xl font-black text-neutral-950">4+</div>
                <div className="text-xs text-neutral-700 font-bold mt-0.5">
                  Enterprise Roles
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-300">
                <div className="text-xl font-black text-neutral-950">CPUT</div>
                <div className="text-xs text-neutral-700 font-bold mt-0.5">
                  B.Tech Degree
                </div>
              </div>
            </div>

            {/* Focus Highlights */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase text-neutral-700 tracking-wider">
                Support Pillars
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-900">
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-neutral-950 shrink-0" />
                  <span>First-Line Incident Diagnostics</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-neutral-950 shrink-0" />
                  <span>Workflow Bottleneck Elimination</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-neutral-950 shrink-0" />
                  <span>Network & Database Maintenance</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-neutral-950 shrink-0" />
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
