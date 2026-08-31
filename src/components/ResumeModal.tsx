import React from 'react';
import { X, Printer, Download, Mail, MapPin, Briefcase, GraduationCap, CheckCircle2, Copy, Check } from 'lucide-react';
import { PROFILE_INFO, EXPERIENCE_DATA, EDUCATION_DATA, SKILLS_DATA } from '../data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCV = () => {
    const cvText = `AWONKE PHILIBANE - CURRICULUM VITAE
IT Technical Support | Cape Town, South Africa
Email: ${PROFILE_INFO.email}

PROFESSIONAL SUMMARY
${PROFILE_INFO.summary}

CORE COMPETENCIES
- CCNA Routing & Switching, LAN/WAN, TCP/IP, Gateway Troubleshooting
- Microsoft 365 Admin, Azure AD / Entra ID, Identity Management
- SQL Relational Database Queries & Schema Maintenance
- SAP Enterprise ERP & Service Desk Incident Management (ITSM)
- Business Information Administration & Workflow Automation

WORK EXPERIENCE
1. ${EXPERIENCE_DATA[0].company} - ${EXPERIENCE_DATA[0].role} (${EXPERIENCE_DATA[0].period})
   - Service desk triage, first-line technical incident resolution, uptime assurance.
2. ${EXPERIENCE_DATA[1].company} - ${EXPERIENCE_DATA[1].role}
   - Enterprise information systems & administrative transport operations data.
3. ${EXPERIENCE_DATA[2].company} - ${EXPERIENCE_DATA[2].role}
   - Public education data systems management, administrative support.
4. ${EXPERIENCE_DATA[3].company} - ${EXPERIENCE_DATA[3].role}
   - Managed IT services, troubleshooting, maintenance, software deployment.

EDUCATION & QUALIFICATIONS
- Bachelor's Degree in Business & Information Administration - Cape Peninsula University of Technology (CPUT)
- Cisco Certified Network Associate (CCNA) Track - Cisco Networking Academy
- Microsoft 365 & Database Administration Modules`;

    navigator.clipboard.writeText(cvText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
              Awonke Philibane - Curriculum Vitae
            </span>
            <span className="text-xs bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400 font-bold px-2.5 py-0.5 rounded-full">
              Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
          
          {/* Resume Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              id="resume-profile-photo"
              src={PROFILE_INFO.profileImage}
              alt={PROFILE_INFO.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-sky-500/40 border-2 border-white dark:border-slate-800 shadow-md shrink-0"
            />
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {PROFILE_INFO.name}
              </h1>
              <p className="text-sm font-bold text-sky-600 dark:text-sky-400">
                {PROFILE_INFO.headline}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-sky-500" /> {PROFILE_INFO.location}</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-sky-500" /> {PROFILE_INFO.email}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-sky-500" /> Active IT Technical Support @ CAPACITI</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Executive Profile & Focus
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {PROFILE_INFO.summary}
            </p>
          </div>

          {/* Core Competencies Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Technical & Operational Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {SKILLS_DATA.map((s) => (
                <div key={s.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white text-xs">{s.name}</div>
                  <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-sky-500"></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Work Experience
            </h2>
            <div className="space-y-4">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                        {exp.role}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400"> — {exp.company}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-md">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {exp.summary}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {exp.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="text-[11px] text-slate-500 dark:text-slate-400">
                        <strong className="text-slate-800 dark:text-slate-200">{hl.title}:</strong> {hl.desc}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Education & Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-sky-600 dark:text-sky-400">{edu.tag}</div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">{edu.degree}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Awonke Philibane • Cape Town, South Africa</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
