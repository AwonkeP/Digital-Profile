import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, Briefcase, FileText, Sparkles, CheckCircle2, Linkedin, Github, ExternalLink } from 'lucide-react';
import { PROFILE_INFO } from '../data';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleCopySummary = () => {
    const summaryText = `${PROFILE_INFO.name} | ${PROFILE_INFO.headline}
Location: ${PROFILE_INFO.location}
Current Role: ${PROFILE_INFO.role} @ ${PROFILE_INFO.currentCompany}
Email: ${PROFILE_INFO.email}
LinkedIn: ${PROFILE_INFO.linkedin}
GitHub: ${PROFILE_INFO.github}
Education: ${PROFILE_INFO.degree}
Technical Domains: Fundamental Network (CCNA), Microsoft 365, Hardware Diagnostics, SAP Enterprise, Workflow Automation.`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) return;

    // Build mailto string with populated details
    const subject = encodeURIComponent(`IT Inquiry from ${inquiryName}`);
    const body = encodeURIComponent(`Name: ${inquiryName}\nEmail: ${inquiryEmail}\n\nMessage:\n${inquiryMessage}`);
    
    // Open default mail client
    window.location.href = `mailto:${PROFILE_INFO.email}?subject=${subject}&body=${body}`;
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
  };

  return (
    <section id="contact" className="pt-10 pb-4 scroll-mt-20">
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-neutral-900 text-neutral-950 dark:text-neutral-100 shadow-md relative overflow-hidden border border-neutral-300 dark:border-neutral-800">
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-400 uppercase tracking-widest">
              Connect & Collaborate
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-tight">
              Let's Optimize Your IT Infrastructure & Workflows
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Whether you are looking for technical support leadership, Fundamental Network (CCNA) diagnostics, workstation maintenance, or operational process optimization in Cape Town or remote teams, I am ready to add immediate value.
            </p>
            
            <div className="pt-2 flex flex-wrap gap-2.5 text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 px-3.5 py-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white">
                <MapPin className="w-4 h-4 text-neutral-950 dark:text-white" />
                <span>Cape Town, Western Cape, SA</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 px-3.5 py-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white">
                <Briefcase className="w-4 h-4 text-neutral-950 dark:text-white" />
                <span>Active IT Technical Support</span>
              </div>
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 px-3.5 py-2 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-neutral-950 dark:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-neutral-950 dark:text-white" />
                <span>{PROFILE_INFO.email}</span>
              </a>
            </div>

            {/* Social Profile Badges */}
            <div className="pt-1 flex flex-wrap gap-3">
              <a
                id="contact-linkedin-badge"
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 text-xs font-bold transition-all"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5] fill-current" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 text-neutral-700 dark:text-neutral-400 opacity-80" />
              </a>

              <a
                id="contact-github-badge"
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 text-xs font-bold transition-all"
              >
                <Github className="w-4 h-4 text-neutral-950 dark:text-white fill-current" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3 text-neutral-700 dark:text-neutral-400 opacity-80" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 text-xs font-bold transition-colors"
              >
                <FileText className="w-4 h-4 text-neutral-950 dark:text-white" />
                <span>Open Full Resume / CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Contact Actions Card */}
          <div className="lg:col-span-5 bg-neutral-50 dark:bg-neutral-800/60 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-700 space-y-4 shadow-sm">
            <h4 className="font-extrabold text-lg text-neutral-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-950 dark:text-white" />
              <span>Direct Inquiry & Social Hub</span>
            </h4>
            
            <div className="space-y-2.5">
              {/* Copy summary button */}
              <button
                id="copy-summary-btn"
                onClick={handleCopySummary}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-950 dark:text-white" />
                  )}
                  <span>{copied ? 'Summary & Links Copied!' : 'Copy Summary (Inc. LinkedIn & GitHub)'}</span>
                </span>
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400">One-click</span>
              </button>

              {/* Direct Mailto */}
              <a
                id="direct-email-btn"
                href={`mailto:${PROFILE_INFO.email}?subject=IT%20Technical%20Support%20Opportunity`}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-sm transition-colors shadow-md text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email to Awonke</span>
              </a>

              {/* Social Quick Links Bar */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={PROFILE_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-bold text-neutral-950 dark:text-white border border-neutral-300 dark:border-neutral-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-neutral-950 dark:text-white" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSendInquiry} className="space-y-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-700">
              <div className="text-xs text-neutral-800 dark:text-neutral-300 font-bold">Or compose a quick message:</div>
              <input
                type="text"
                placeholder="Your Name"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                required
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-950 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white font-medium"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                required
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-950 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white font-medium"
              />
              <textarea
                placeholder="Brief message / opportunity details..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                rows={2}
                required
                className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs text-neutral-950 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white font-medium"
              ></textarea>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-bold transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch Email Client with Message</span>
              </button>
              {inquirySent && (
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5 justify-center pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Email client opened successfully!</span>
                </div>
              )}
            </form>

          </div>

        </div>
      </div>
    </section>
  );
};
