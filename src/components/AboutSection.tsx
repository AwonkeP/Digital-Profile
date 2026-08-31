import React from 'react';
import { Sliders, MapPin, CheckCircle, Cpu, Zap, HeartHandshake } from 'lucide-react';
import { PROFILE_INFO } from '../data';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="pt-10 scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">
          Professional Identity
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bridging the Gap Between Business Efficiency & Technical Performance
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main Narrative */}
        <div className="lg:col-span-7 space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            I am a dedicated IT Technical Support professional based in Cape Town, South Africa, focusing on the alignment of business administrative workflows and technical infrastructure. With a degree in <strong className="text-slate-900 dark:text-white font-semibold">Business and Information Administration</strong> from the <strong className="text-slate-900 dark:text-white font-semibold">Cape Peninsula University of Technology (CPUT)</strong>, my perspective goes beyond standard ticket-logging: <em className="text-sky-700 dark:text-sky-300 not-italic font-medium">I solve technical problems while optimizing the operational processes behind them.</em>
          </p>
          <p>
            Currently serving as an <strong className="text-slate-900 dark:text-white font-semibold">IT Technical Support at CAPACITI</strong>, I deliver service desk management, first-line incident diagnostics, and user support. My experience spans diverse multi-tier environments—including the <strong className="text-slate-900 dark:text-white font-semibold">Passenger Rail Agency of South Africa (PRASA)</strong>, <strong className="text-slate-900 dark:text-white font-semibold">Western Cape Department of Education (WCED)</strong>, and <strong className="text-slate-900 dark:text-white font-semibold">Innovate Technology</strong>—providing me with a comprehensive grasp of both public and private sector enterprise technology needs.
          </p>
          <p>
            Whether managing SQL relational databases, diagnosing CCNA-level network issues, or configuring Microsoft 365 permissions, my methodology centers on root-cause resolution, minimal user downtime, and clear inter-departmental communication.
          </p>

          {/* Strategic Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Cpu className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="text-sky-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider">Pillar 1</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Proactive Diagnostics</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                Isolating root causes to prevent repeat tickets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">Pillar 2</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Process Automation</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                Eliminating manual paper bottlenecks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">Pillar 3</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">User Enablement</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                Clear guidance and comprehensive documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Side Cards: Operational Philosophy & Location */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  id="about-profile-circle-img"
                  src={PROFILE_INFO.profileImage}
                  alt={PROFILE_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-sky-500/40 border-2 border-white dark:border-slate-800 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Operational Philosophy</h4>
                <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">Awonke Philibane</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed pt-1">
              "Technology provides the greatest value when technical support operates as an enabler of business productivity—resolving root causes rather than treating symptoms."
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 text-white shadow-lg space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Location & Availability
            </div>
            <div className="font-extrabold text-xl flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-200 shrink-0" />
              <span>Cape Town, Western Cape</span>
            </div>
            <p className="text-xs text-sky-100 leading-relaxed">
              Available for IT technical support, systems administration, service desk operations, and workflow optimization roles across South Africa and remote teams.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
