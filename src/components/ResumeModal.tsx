import React from 'react';
import { X, Printer, Download, Mail, MapPin, Briefcase, GraduationCap, CheckCircle2, Copy, Check, Linkedin, Github, ExternalLink } from 'lucide-react';
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
LinkedIn: ${PROFILE_INFO.linkedin}
GitHub: ${PROFILE_INFO.github}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-neutral-300 flex flex-col overflow-hidden text-neutral-950">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-neutral-950 text-base sm:text-lg">
              Awonke Philibane - Curriculum Vitae
            </span>
            <span className="text-xs bg-neutral-200 text-neutral-900 font-bold px-2.5 py-0.5 rounded-full border border-neutral-300">
              Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-900" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-900 text-xs sm:text-sm">
          
          {/* Resume Header */}
          <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              id="resume-profile-photo"
              src={PROFILE_INFO.profileImage}
              alt={PROFILE_INFO.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-neutral-950 border-2 border-white shadow-md shrink-0"
            />
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                {PROFILE_INFO.name}
              </h1>
              <p className="text-sm font-bold text-neutral-800">
                {PROFILE_INFO.headline}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-neutral-600 pt-1 font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-neutral-950" /> {PROFILE_INFO.location}</span>
                <a href={`mailto:${PROFILE_INFO.email}`} className="flex items-center gap-1 hover:text-black transition-colors">
                  <Mail className="w-3.5 h-3.5 text-neutral-950" /> {PROFILE_INFO.email}
                </a>
                <a
                  href={PROFILE_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#0077B5] hover:underline font-bold"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>linkedin.com/in/{PROFILE_INFO.linkedinHandle}</span>
                </a>
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-neutral-950 hover:underline font-bold"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/{PROFILE_INFO.githubHandle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Executive Profile & Focus
            </h2>
            <p className="text-neutral-800 leading-relaxed font-medium">
              {PROFILE_INFO.summary}
            </p>
          </div>

          {/* Core Competencies Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Technical & Operational Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {SKILLS_DATA.map((s) => (
                <div key={s.id} className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <div className="font-bold text-neutral-950 text-xs">{s.name}</div>
                  <ul className="text-[11px] text-neutral-700 space-y-0.5 font-medium">
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900"></span>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Work Experience
            </h2>
            <div className="space-y-4">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-extrabold text-neutral-950 text-sm">
                        {exp.role}
                      </span>
                      <span className="text-neutral-600 font-medium"> — {exp.company}</span>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-900 bg-neutral-200 px-2 py-0.5 rounded-md border border-neutral-300">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-800 font-medium">
                    {exp.summary}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {exp.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="text-[11px] text-neutral-700 font-medium">
                        <strong className="text-neutral-950">{hl.title}:</strong> {hl.desc}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Education & Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-neutral-900">{edu.tag}</div>
                  <div className="font-bold text-neutral-950 text-xs">{edu.degree}</div>
                  <div className="text-[11px] text-neutral-600 font-medium">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0 text-xs text-neutral-600 font-medium">
          <span>Awonke Philibane • Cape Town, South Africa</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-950 text-white font-bold hover:bg-neutral-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
