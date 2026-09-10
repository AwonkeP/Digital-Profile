import React from 'react';
import { X, Printer, Download, Mail, MapPin, Briefcase, GraduationCap, CheckCircle2, Copy, Check, Linkedin, Github, ExternalLink, ChevronDown, Loader2 } from 'lucide-react';
import { PROFILE_INFO, EXPERIENCE_DATA, EDUCATION_DATA, SKILLS_DATA, CERTIFICATES_DATA } from '../data';
import { generateResumePdf, triggerPrintCv } from '../utils/generatePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const [downloading, setDownloading] = React.useState(false);
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    try {
      setDownloading(true);
      setShowMenu(false);
      generateResumePdf();
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        setDownloading(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    setShowMenu(false);
    triggerPrintCv();
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
- Fundamental Network (CCNA) Routing & Switching, LAN/WAN, TCP/IP, Gateway Troubleshooting
- Microsoft 365 Admin, Azure AD / Entra ID, Identity Management
- PC Hardware Diagnostics & Workstation Maintenance
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
- Diploma in Business & Information Administration - Cape Peninsula University of Technology (CPUT)
- Fundamental Network (CCNA) - Cisco Networking Academy
- Microsoft 365 & IT Systems Administration Modules`;

    navigator.clipboard.writeText(cvText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-neutral-300 dark:border-neutral-800 flex flex-col overflow-hidden text-neutral-950 dark:text-neutral-100">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-neutral-950 dark:text-white text-base sm:text-lg">
              Awonke Philibane - Curriculum Vitae
            </span>
            <span className="text-xs bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200 font-bold px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-700">
              Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-copy-text-btn"
              onClick={handleCopyCV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 text-xs font-bold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            {/* Print / PDF with direct PDF download & print menu */}
            <div className="relative inline-flex items-center" ref={menuRef}>
              <button
                id="resume-print-pdf-btn"
                onClick={handleDownloadPdf}
                disabled={downloading}
                title="Download Awonke's CV as a PDF file"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-l-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-bold transition-all shadow-sm active:scale-95 disabled:opacity-75"
              >
                {downloadSuccess ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                ) : downloading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Printer className="w-3.5 h-3.5" />
                )}
                <span>{downloadSuccess ? 'Downloaded!' : downloading ? 'Generating...' : 'Print / PDF'}</span>
              </button>

              <button
                id="resume-print-menu-toggle"
                onClick={() => setShowMenu(!showMenu)}
                title="Download or Print options"
                aria-label="Toggle download and print options"
                className="px-2 py-1.5 rounded-r-xl border-l border-neutral-700 dark:border-neutral-300 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-bold transition-colors shadow-sm"
              >
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-2xl py-1.5 z-50 animate-fade-in">
                  <button
                    id="resume-menu-download-btn"
                    onClick={handleDownloadPdf}
                    className="w-full px-3.5 py-2 text-left text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 text-neutral-900 dark:text-neutral-100 transition-colors"
                  >
                    <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div>Download PDF File</div>
                      <div className="text-[10px] font-normal text-neutral-500">Save Awonke_Philibane_CV.pdf</div>
                    </div>
                  </button>
                  <button
                    id="resume-menu-print-btn"
                    onClick={handlePrint}
                    className="w-full px-3.5 py-2 text-left text-xs font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 text-neutral-900 dark:text-neutral-100 transition-colors border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <Printer className="w-4 h-4 text-neutral-600 dark:text-neutral-400 shrink-0" />
                    <div>
                      <div>Print Document</div>
                      <div className="text-[10px] font-normal text-neutral-500">Open clean printer preview</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              id="resume-modal-close-top"
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-neutral-900 dark:text-neutral-200 text-xs sm:text-sm">
          
          {/* Resume Header */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              id="resume-profile-photo"
              src={PROFILE_INFO.profileImage}
              alt={PROFILE_INFO.name}
              referrerPolicy="no-referrer"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-neutral-950 dark:ring-white border-2 border-white dark:border-neutral-900 shadow-md shrink-0"
            />
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
                {PROFILE_INFO.name}
              </h1>
              <p className="text-sm font-bold text-neutral-800 dark:text-neutral-300">
                {PROFILE_INFO.headline}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-1 font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-neutral-950 dark:text-white" /> {PROFILE_INFO.location}</span>
                <a href={`mailto:${PROFILE_INFO.email}`} className="flex items-center gap-1 hover:text-black dark:hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 text-neutral-950 dark:text-white" /> {PROFILE_INFO.email}
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
                  className="flex items-center gap-1 text-neutral-950 dark:text-white hover:underline font-bold"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>github.com/{PROFILE_INFO.githubHandle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-400">
              Executive Profile & Focus
            </h2>
            <p className="text-neutral-800 dark:text-neutral-300 leading-relaxed font-medium">
              {PROFILE_INFO.summary}
            </p>
          </div>

          {/* Core Competencies Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-400">
              Technical & Operational Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {SKILLS_DATA.map((s) => (
                <div key={s.id} className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-1">
                  <div className="font-bold text-neutral-950 dark:text-white text-xs">{s.name}</div>
                  <ul className="text-[11px] text-neutral-700 dark:text-neutral-300 space-y-0.5 font-medium">
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-200"></span>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-400">
              Work Experience
            </h2>
            <div className="space-y-4">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-extrabold text-neutral-950 dark:text-white text-sm">
                        {exp.role}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400 font-medium"> — {exp.company}</span>
                    </div>
                    <span className="text-[11px] font-bold text-neutral-900 dark:text-neutral-200 bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded-md border border-neutral-300 dark:border-neutral-600">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-800 dark:text-neutral-300 font-medium">
                    {exp.summary}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {exp.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="text-[11px] text-neutral-700 dark:text-neutral-300 font-medium">
                        <strong className="text-neutral-950 dark:text-white">{hl.title}:</strong> {hl.desc}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-400">
              Education & Training
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.id} className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-neutral-900 dark:text-neutral-300">{edu.tag}</div>
                  <div className="font-bold text-neutral-950 dark:text-white text-xs">{edu.degree}</div>
                  <div className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">{edu.institution}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Licenses & Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-400">
              Licenses & Certifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CERTIFICATES_DATA.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 space-y-1.5 block hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors group"
                >
                  <div className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400">{cert.issuer} • {cert.issueDate}</div>
                  <div className="font-bold text-neutral-950 dark:text-white text-xs group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between gap-1">
                    <span className="line-clamp-2">{cert.name}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">ID: {cert.credentialId}</div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
          <div className="flex items-center gap-2">
            <span>Awonke Philibane • Cape Town, South Africa</span>
            <span className="hidden sm:inline text-neutral-400">•</span>
            <span className="text-neutral-500 hidden sm:inline">Available for Technical Support Roles</span>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              id="resume-modal-footer-download-btn"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm text-xs active:scale-95 disabled:opacity-75"
            >
              {downloadSuccess ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{downloadSuccess ? 'Downloaded!' : 'Download PDF'}</span>
            </button>
            <button
              id="resume-modal-footer-close-btn"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors text-xs"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
