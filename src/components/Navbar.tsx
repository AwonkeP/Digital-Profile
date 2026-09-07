import React, { useState, useEffect } from 'react';
import { Menu, X, Send, FileText, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE_INFO } from '../data';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const navLinks = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'value', label: 'Value', href: '#value' },
    { id: 'simulator', label: 'Sandbox', href: '#simulator' },
  ];

  useEffect(() => {
    const sectionIds = ['about', 'skills', 'experience', 'education', 'value', 'simulator', 'contact'];

    // Read initial hash from URL if present
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && sectionIds.includes(currentHash)) {
      setActiveSection(currentHash);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page activates the last section or contact
      if (scrollY + windowHeight >= documentHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // Check sections from top to bottom
      const triggerPoint = scrollY + 160;

      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (triggerPoint >= top && triggerPoint < top + height) {
            current = id;
            break;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      } else if (scrollY < 180) {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#hero');
      return;
    }

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      window.history.pushState(null, '', href);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-300 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero', 'hero')}
          className="flex items-center gap-3 group"
        >
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

        {/* Desktop Navigation with Visible Active Tab Indicator */}
        <nav
          id="desktop-main-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center p-1 bg-neutral-100/90 border border-neutral-300/80 rounded-full shadow-inner gap-0.5"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                id={`nav-tab-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors z-10 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/60'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTabIndicator"
                    className="absolute inset-0 bg-neutral-950 rounded-full shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
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
            onClick={(e) => handleNavClick(e, '#contact', 'contact')}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition-all ${
              activeSection === 'contact'
                ? 'bg-neutral-900 text-white ring-2 ring-neutral-950 ring-offset-2'
                : 'bg-neutral-950 hover:bg-neutral-800 text-white'
            }`}
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
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                id={`mobile-nav-tab-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl font-bold text-sm transition-all ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="text-xs bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                )}
              </a>
            );
          })}

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
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className={`block w-full text-center py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                activeSection === 'contact'
                  ? 'bg-neutral-900 text-white ring-2 ring-neutral-950 ring-offset-2'
                  : 'bg-neutral-950 hover:bg-neutral-800 text-white'
              }`}
            >
              Connect with Awonke
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
