import React, { useState } from 'react';
import { Moon, Sun, Menu, X, Send, Award, FileText, Linkedin, Github } from 'lucide-react';
import { PROFILE_INFO } from '../data';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Value', href: '#value' },
    { label: 'Sandbox', href: '#simulator' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              id="navbar-profile-avatar"
              src={PROFILE_INFO.profileImage}
              alt={PROFILE_INFO.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-900 group-hover:scale-105 transition-all shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <span className="font-extrabold text-neutral-950 text-base sm:text-lg tracking-tight block leading-none">
              Awonke Philibane
            </span>
            <span className="text-xs text-neutral-600 font-semibold">
              IT Support & Systems Workflow
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 font-bold text-sm text-neutral-800">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-neutral-950 hover:underline underline-offset-4 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Social Links in Header */}
          <div className="hidden lg:flex items-center gap-1.5 pr-1 border-r border-neutral-200">
            <a
              id="nav-linkedin-link"
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="p-2 rounded-xl text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="nav-github-link"
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="p-2 rounded-xl text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Resume / CV Modal Trigger */}
          <button
            id="view-cv-btn"
            onClick={onOpenResume}
            aria-label="View Resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-950 border border-neutral-300 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-950" />
            <span>View CV</span>
          </button>

          {/* Quick Connect CTA */}
          <a
            id="nav-connect-btn"
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Connect</span>
          </a>

          {/* Mobile menu hamburger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Mobile Navigation"
            className="md:hidden p-2.5 rounded-xl bg-neutral-100 text-neutral-950 border border-neutral-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 px-4 pt-2 pb-5 space-y-2 bg-white/98 backdrop-blur-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-neutral-950 font-bold hover:underline text-sm"
            >
              {link.label}
            </a>
          ))}

          {/* Social Links in Mobile Drawer */}
          <div className="flex items-center gap-3 py-2 border-t border-neutral-200">
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-100 text-neutral-950 border border-neutral-200 text-xs font-bold"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-100 text-neutral-950 border border-neutral-200 text-xs font-bold"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-100 text-neutral-950 text-sm font-bold border border-neutral-300"
            >
              <FileText className="w-4 h-4 text-neutral-950" />
              <span>View Full CV</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-neutral-950 hover:bg-neutral-800 text-white py-2.5 rounded-xl font-bold text-sm shadow-md"
            >
              Connect with Awonke
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
