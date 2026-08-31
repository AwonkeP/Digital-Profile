import React from 'react';
import { PROFILE_INFO } from '../data';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-10 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
        
        <div className="flex items-center gap-3">
          <img
            id="footer-profile-avatar"
            src={PROFILE_INFO.profileImage}
            alt={PROFILE_INFO.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-sky-500/30 shadow-sm"
          />
          <div>
            <div className="font-bold text-slate-900 dark:text-white">
              {PROFILE_INFO.name}
            </div>
            <div className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
          <a href="#about" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">About</a>
          <a href="#skills" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Skills</a>
          <a href="#experience" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Experience</a>
          <a href="#education" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Education</a>
          <a href="#value" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Value</a>
          <a href="#contact" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <span>{PROFILE_INFO.location}</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
