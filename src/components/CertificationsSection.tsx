import React, { useState } from 'react';
import { ExternalLink, Check, Copy, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CERTIFICATES_DATA } from '../data';
import { Certificate } from '../types';

export const CertificationsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, id: string, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderIssuerLogo = (cert: Certificate) => {
    if (cert.issuerLogo === 'coursera') {
      return (
        <div className="w-12 h-12 rounded-xl bg-[#0056D2] flex items-center justify-center p-1.5 shrink-0 shadow-sm overflow-hidden select-none">
          <svg viewBox="0 0 100 24" className="w-full text-white fill-white" aria-label="Coursera">
            <text
              x="50%"
              y="17"
              textAnchor="middle"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              fontSize="18"
              fontWeight="800"
              letterSpacing="-0.8px"
              fill="white"
            >
              coursera
            </text>
          </svg>
        </div>
      );
    }

    if (cert.issuerLogo === 'deeplearning') {
      return (
        <div className="w-12 h-12 rounded-xl bg-[#1E2530] flex items-center justify-center p-2 shrink-0 shadow-sm border border-neutral-700/60 overflow-hidden select-none">
          <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none" aria-label="DeepLearning.AI">
            {/* DeepLearning.AI stylized geometric icon */}
            <rect x="5" y="17" width="11" height="14" rx="1.5" fill="#64748B" />
            <rect x="16" y="5" width="15" height="26" rx="1.5" fill="#94A3B8" />
            <rect x="5" y="7" width="11" height="10" rx="1.5" fill="#4B5563" />
          </svg>
        </div>
      );
    }

    if (cert.issuerLogo === 'ibm') {
      return (
        <div className="w-12 h-12 rounded-xl bg-[#0f62fe] dark:bg-[#161616] flex items-center justify-center p-2 shrink-0 shadow-sm border border-blue-600 dark:border-neutral-700 overflow-hidden select-none">
          <svg viewBox="0 0 64 28" className="w-9 h-auto" fill="none" aria-label="IBM">
            {/* Distinctive IBM Bar styling */}
            <path
              d="M4 4h8v3H4zm0 5h8v3H4zm0 5h8v3H4zm0 5h8v3H4zM20 4h18v3H20zm0 5h18v3H20zm0 5h18v3H20zm0 5h18v3H20zm6-15h6v18h-6zM44 4h16v3H44zm0 5h16v3H44zm0 5h16v3H44zm0 5h16v3H44zm5-15h6v18h-6z"
              fill="white"
            />
            <text
              x="32"
              y="20"
              textAnchor="middle"
              fontFamily="Impact, 'Arial Black', sans-serif"
              fontSize="19"
              fontWeight="900"
              letterSpacing="2.5px"
              fill="white"
            >
              IBM
            </text>
          </svg>
        </div>
      );
    }

    return (
      <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center shrink-0 text-neutral-900 dark:text-white">
        <Award className="w-6 h-6" />
      </div>
    );
  };

  return (
    <section id="certifications" className="pt-10 scroll-mt-20">
      {/* Section Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xs font-bold text-neutral-900 dark:text-neutral-400 uppercase tracking-widest">
            Credentials & Achievements
          </h2>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-neutral-300 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            {CERTIFICATES_DATA.length} Verified Certificates
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
          Licenses & Certifications
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 font-medium">
          Accredited credentials and verified course achievements from Coursera, DeepLearning.AI, and IBM. Click any card or "Show credential" to view the authentic verification.
        </p>
      </div>

      {/* Grid of Certificates matching user request */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {CERTIFICATES_DATA.map((cert) => (
          <div
            key={cert.id}
            className="group relative rounded-3xl bg-white dark:bg-[#151921] border border-neutral-300 dark:border-neutral-800/90 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Issuer Logo & Status */}
              <div className="flex items-start justify-between gap-3 mb-4">
                {renderIssuerLogo(cert)}
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>

              {/* Certificate Title */}
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-base font-bold text-neutral-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug mb-1"
              >
                {cert.name}
              </a>

              {/* Issuer */}
              <div className="text-sm font-normal text-neutral-800 dark:text-neutral-300">
                {cert.issuer}
              </div>

              {/* Issue Date */}
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                {cert.issueDate}
              </div>

              {/* Credential ID with Copy Action */}
              <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 flex items-center gap-1.5 flex-wrap">
                <span className="font-mono">Credential ID {cert.credentialId}</span>
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, cert.id, cert.credentialId)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                  title="Copy Credential ID"
                >
                  {copiedId === cert.id ? (
                    <>
                      <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      <span className="text-green-600 dark:text-green-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Bottom Section: Show Credential Pill Button & Skills */}
            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
              <div>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-400 dark:border-neutral-500 text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-300 transition-all shadow-2xs group/btn"
                >
                  <span>Show credential</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Skills attribute if present */}
              {cert.skills && (
                <div className="text-xs text-neutral-700 dark:text-neutral-300">
                  <span className="font-bold text-neutral-950 dark:text-white">Skills: </span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-300">{cert.skills}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
