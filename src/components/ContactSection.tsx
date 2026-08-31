import React, { useState } from 'react';
import { Mail, Copy, Check, Send, MapPin, Briefcase, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
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
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl relative overflow-hidden border border-slate-800">
        
        {/* Background decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Connect & Collaborate
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Let's Optimize Your IT Infrastructure & Workflows
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Whether you are looking for technical support leadership, network diagnostics, database management, or operational process optimization in Cape Town or remote teams, I am ready to add immediate value.
            </p>
            
            <div className="pt-3 flex flex-wrap gap-3 text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span>Cape Town, Western Cape, SA</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <span>Active IT Technical Support</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{PROFILE_INFO.email}</span>
              </div>
            </div>

            {/* Resume Button */}
            <div className="pt-2">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              >
                <FileText className="w-4 h-4 text-sky-400" />
                <span>Open Full Professional Resume / CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Quick Contact Actions Card */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <h4 className="font-extrabold text-lg text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" />
              <span>Direct Inquiry Hub</span>
            </h4>
            
            <div className="space-y-3">
              {/* Copy summary button */}
              <button
                id="copy-summary-btn"
                onClick={handleCopySummary}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-900 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-sky-400" />
                  )}
                  <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Profile Summary'}</span>
                </span>
                <span className="text-[10px] text-slate-400">One-click</span>
              </button>

              {/* Direct Mailto */}
              <a
                id="direct-email-btn"
                href={`mailto:${PROFILE_INFO.email}?subject=IT%20Technical%20Support%20Opportunity`}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-sky-600/30 text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email to Awonke</span>
              </a>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSendInquiry} className="space-y-2.5 pt-2 border-t border-white/10">
              <div className="text-xs text-slate-300 font-semibold">Or compose a quick message:</div>
              <input
                type="text"
                placeholder="Your Name"
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                required
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                required
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <textarea
                placeholder="Brief message / opportunity details..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                rows={2}
                required
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              ></textarea>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Launch Email Client with Message</span>
              </button>
              {inquirySent && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 justify-center pt-1">
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
