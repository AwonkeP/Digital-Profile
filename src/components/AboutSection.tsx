import React from 'react';
import { Sliders, MapPin, CheckCircle, Cpu, Zap, HeartHandshake } from 'lucide-react';
import { PROFILE_INFO } from '../data';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="pt-10 scroll-mt-20">
      <div className="max-w-3xl mb-8">
        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-widest mb-2">
          Professional Identity
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
          Bridging the Gap Between Business Efficiency & Technical Performance
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main Narrative */}
        <div className="lg:col-span-7 space-y-5 text-neutral-800 leading-relaxed text-sm sm:text-base">
          <p>
            I am a dedicated IT Technical Support professional based in Cape Town, South Africa, focusing on the alignment of business administrative workflows and technical infrastructure. With a diploma in <strong className="text-neutral-950 font-bold">Business and Information Administration</strong> from the <strong className="text-neutral-950 font-bold">Cape Peninsula University of Technology (CPUT)</strong>, my perspective goes beyond standard ticket-logging: <em className="text-neutral-950 not-italic font-bold">I solve technical problems while optimizing the operational processes behind them.</em>
          </p>
          <p>
            Currently serving as an <strong className="text-neutral-950 font-bold">IT Technical Support at CAPACITI</strong>, I deliver service desk management, first-line incident diagnostics, and user support. My experience spans diverse multi-tier environments—including the <strong className="text-neutral-950 font-bold">Passenger Rail Agency of South Africa (PRASA)</strong>, <strong className="text-neutral-950 font-bold">Western Cape Department of Education (WCED)</strong>, and <strong className="text-neutral-950 font-bold">Innovate Technology</strong>—providing me with a comprehensive grasp of both public and private sector enterprise technology needs.
          </p>
          <p>
            Whether diagnosing Fundamental Network (CCNA) connectivity, managing workstation hardware, or configuring Microsoft 365 permissions, my methodology centers on root-cause resolution, minimal user downtime, and clear inter-departmental communication.
          </p>

          {/* Strategic Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
            <div className="p-4 rounded-2xl bg-white border border-neutral-300 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Cpu className="w-4 h-4 text-neutral-950" />
                <span className="text-neutral-950 font-bold text-xs uppercase tracking-wider">Pillar 1</span>
              </div>
              <div className="text-sm font-extrabold text-neutral-950">Proactive Diagnostics</div>
              <p className="text-xs text-neutral-700 mt-1 leading-normal font-medium">
                Isolating root causes to prevent repeat tickets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-300 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="w-4 h-4 text-neutral-950" />
                <span className="text-neutral-950 font-bold text-xs uppercase tracking-wider">Pillar 2</span>
              </div>
              <div className="text-sm font-extrabold text-neutral-950">Process Automation</div>
              <p className="text-xs text-neutral-700 mt-1 leading-normal font-medium">
                Eliminating manual paper bottlenecks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-300 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <HeartHandshake className="w-4 h-4 text-neutral-950" />
                <span className="text-neutral-950 font-bold text-xs uppercase tracking-wider">Pillar 3</span>
              </div>
              <div className="text-sm font-extrabold text-neutral-950">User Enablement</div>
              <p className="text-xs text-neutral-700 mt-1 leading-normal font-medium">
                Clear guidance and comprehensive documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Side Cards: Operational Philosophy & Location */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  id="about-profile-circle-img"
                  src={PROFILE_INFO.profileImage}
                  alt={PROFILE_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-neutral-900 border-2 border-white shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-950 text-base">Operational Philosophy</h4>
                <p className="text-xs text-neutral-800 font-bold">Awonke Philibane</p>
              </div>
            </div>
            <p className="text-sm text-neutral-800 italic leading-relaxed pt-1 font-medium">
              "Technology provides the greatest value when technical support operates as an enabler of business productivity—resolving root causes rather than treating symptoms."
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border-2 border-neutral-950 text-neutral-950 shadow-md space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-800">
              Location & Availability
            </div>
            <div className="font-extrabold text-xl flex items-center gap-2 text-neutral-950">
              <MapPin className="w-5 h-5 text-neutral-950 shrink-0" />
              <span>Cape Town, Western Cape</span>
            </div>
            <p className="text-xs text-neutral-800 leading-relaxed font-medium">
              Available for IT technical support, systems administration, service desk operations, and workflow optimization roles across South Africa and remote teams.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
