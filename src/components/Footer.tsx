import React from 'react';
import { PROFILE_INFO } from '../data';
import { ArrowUp, Linkedin, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-300 py-10 bg-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-600 font-medium">
        
        <div className="flex items-center gap-3">
          <img
            id="footer-profile-avatar"
            src={PROFILE_INFO.profileImage}
            alt={PROFILE_INFO.name}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-neutral-900 shadow-sm"
          />
          <div>
            <div className="font-extrabold text-neutral-950 text-sm">
              {PROFILE_INFO.name}
            </div>
            <div className="text-[11px] text-neutral-500 font-medium">
              © {new Date().getFullYear()} All rights reserved. IT Support Portfolio.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-bold text-neutral-800">
          <a href="#about" className="hover:text-black hover:underline transition-colors">About</a>
          <a href="#skills" className="hover:text-black hover:underline transition-colors">Skills</a>
          <a href="#experience" className="hover:text-black hover:underline transition-colors">Experience</a>
          <a href="#education" className="hover:text-black hover:underline transition-colors">Education</a>
          <a href="#value" className="hover:text-black hover:underline transition-colors">Value</a>
          <a href="#contact" className="hover:text-black hover:underline transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Social icons */}
          <a
            id="footer-linkedin-link"
            href={PROFILE_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2 rounded-xl bg-neutral-100 text-neutral-950 hover:bg-neutral-200 border border-neutral-200 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-[#0077B5]" />
          </a>
          <a
            id="footer-github-link"
            href={PROFILE_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-2 rounded-xl bg-neutral-100 text-neutral-950 hover:bg-neutral-200 border border-neutral-200 transition-colors"
          >
            <Github className="w-4 h-4 text-neutral-950" />
          </a>
          <a
            id="footer-email-link"
            href={`mailto:${PROFILE_INFO.email}`}
            title="Send Email"
            className="p-2 rounded-xl bg-neutral-100 text-neutral-950 hover:bg-neutral-200 border border-neutral-200 transition-colors"
          >
            <Mail className="w-4 h-4 text-neutral-950" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-xl bg-neutral-100 text-neutral-950 hover:bg-neutral-200 border border-neutral-200 transition-colors ml-1"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
