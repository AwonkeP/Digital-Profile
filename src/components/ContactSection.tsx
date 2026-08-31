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
Technical Domains: CCNA Networking, SQL Database Admin, Microsoft 365, SAP Enterprise, Workflow Automation.`;

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
      <div className="p-8 sm:p-12 rounded-3xl bg-white text-neutral-950 shadow-md relative overflow-hidden border border-neutral-300">
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-neutral-900 uppercase tracking-widest">
              Connect & Collaborate
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 leading-tight">
              Let's Optimize Your IT Infrastructure & Workflows
            </h3>
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Whether you are looking for technical support leadership, network diagnostics, database management, or operational process optimization in Cape Town or remote teams, I am ready to add immediate value.
            </p>
            
            <div className="pt-2 flex flex-wrap gap-2.5 text-xs sm:text-sm font-bold">
              <div className="flex items-center gap-2 bg-neutral-50 px-3.5 py-2 rounded-2xl border border-neutral-200 text-neutral-950">
                <MapPin className="w-4 h-4 text-neutral-950" />
                <span>Cape Town, Western Cape, SA</span>
              </div>
              <div className="flex items-center gap-2 bg-neutral-50 px-3.5 py-2 rounded-2xl border border-neutral-200 text-neutral-950">
                <Briefcase className="w-4 h-4 text-neutral-950" />
                <span>Active IT Technical Support</span>
              </div>
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="flex items-center gap-2 bg-neutral-50 hover:bg-neutral-100 px-3.5 py-2 rounded-2xl border border-neutral-200 text-neutral-950 transition-colors"
              >
                <Mail className="w-4 h-4 text-neutral-950" />
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
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 border border-neutral-300 text-xs font-bold transition-all"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5] fill-current" />
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 text-neutral-700 opacity-80" />
              </a>

              <a
                id="contact-github-badge"
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 border border-neutral-300 text-xs font-bold transition-all"
              >
                <Github className="w-4 h-4 text-neutral-950 fill-current" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3 text-neutral-700 opacity-80" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 border border-neutral-300 text-xs font-bold transition-colors"
              >
                <FileText className="w-4 h-4 text-neutral-950" />
                <span>Open Full Resume / CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Contact Actions Card */}
          <div className="lg:col-span-5 bg-neutral-50 p-6 rounded-3xl border border-neutral-200 space-y-4 shadow-sm">
            <h4 className="font-extrabold text-lg text-neutral-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neutral-950" />
              <span>Direct Inquiry & Social Hub</span>
            </h4>
            
            <div className="space-y-2.5">
              {/* Copy summary button */}
              <button
                id="copy-summary-btn"
                onClick={handleCopySummary}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-950 border border-neutral-300 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-950" />
                  )}
                  <span>{copied ? 'Summary & Links Copied!' : 'Copy Summary (Inc. LinkedIn & GitHub)'}</span>
                </span>
                <span className="text-[10px] text-neutral-600">One-click</span>
              </button>

              {/* Direct Mailto */}
              <a
                id="direct-email-btn"
                href={`mailto:${PROFILE_INFO.email}?subject=IT%20Technical%20Support%20Opportunity`}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-sm transition-colors shadow-md text-center"
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
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-950 border border-neutral-300 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-950 border border-neutral-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-neutral-950" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSendInquiry} className="space-y-2.5 pt-2 border-t border-neutral-200">
              <div className="text-xs text-neutral-800 font-bold">Or compose a quick message:</div>
              <input
                type="text"
                placeholder="Your Name"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                required
                className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-950 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                required
                className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-950 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium"
              />
              <textarea
                placeholder="Brief message / opportunity details..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                rows={2}
                required
                className="w-full bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-950 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium"
              ></textarea>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch Email Client with Message</span>
              </button>
              {inquirySent && (
                <div className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 justify-center pt-1">
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
