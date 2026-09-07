import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Send, FileText, Linkedin, Github, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE_INFO } from '../data';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'value', label: 'Value', href: '#value' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const sectionIds = ['about', 'skills', 'experience', 'education', 'value', 'projects', 'contact'];

    // Read initial hash from URL if present
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && sectionIds.includes(currentHash)) {
      setActiveSection(currentHash);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page activates contact
      if (scrollY + windowHeight >= documentHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // Check sections from top to bottom using true document coordinates
      const triggerPoint = scrollY + 150;

      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = el.offsetHeight;
          if (triggerPoint >= top && triggerPoint < top + height) {
            current = id;
            break;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      } else if (scrollY < 150) {
        setActiveSection('about');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure active tab on mobile horizontal navigation bar is scrolled into view
  useEffect(() => {
    if (mobileNavRef.current && activeSection) {
      const activeElement = mobileNavRef.current.querySelector<HTMLElement>(`[data-nav-id="${activeSection}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeSection]);

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
      const headerOffset = 100; // Account for sticky navbar + subnav bar
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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-300 dark:border-neutral-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero', 'hero')}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="relative">
            <img
              id="navbar-profile-avatar"
              src={PROFILE_INFO.profileImage}
              alt={PROFILE_INFO.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-900 dark:ring-neutral-100 group-hover:scale-105 transition-all shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-900" />
          </div>
          <div>
            <span className="font-extrabold text-neutral-950 dark:text-white text-base sm:text-lg tracking-tight block leading-none">
              Awonke Philibane
            </span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
              IT Support & Systems Workflow
            </span>
          </div>
        </a>

        {/* Desktop Navigation with Always Visible Active Tab Indicator */}
        <nav
          id="desktop-main-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center p-1 bg-neutral-100/90 dark:bg-neutral-800/90 border border-neutral-300/80 dark:border-neutral-700/80 rounded-full shadow-inner gap-0.5"
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
                className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all z-10 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 animate-pulse" />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Social Links in Header */}
          <div className="hidden lg:flex items-center gap-1.5 pr-1 border-r border-neutral-200 dark:border-neutral-700">
            <a
              id="nav-linkedin-link"
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              className="p-2 rounded-xl text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="nav-github-link"
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="p-2 rounded-xl text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Theme Toggle Button (Light/Dark) */}
          <button
            id="theme-toggle-btn"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? "Switch to light mode (Press 'D')" : "Switch to dark mode (Press 'D')"}
            className="p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 transition-all flex items-center justify-center relative group"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform group-hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-800 transition-transform group-hover:-rotate-12" />
            )}
          </button>

          {/* Resume / CV Modal Trigger */}
          <button
            id="view-cv-btn"
            onClick={onOpenResume}
            aria-label="View Resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-950 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-950 dark:text-neutral-100" />
            <span>View CV</span>
          </button>

          {/* Quick Connect CTA */}
          <a
            id="nav-connect-btn"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact', 'contact')}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition-all ${
              activeSection === 'contact'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 ring-2 ring-neutral-950 dark:ring-white ring-offset-2 dark:ring-offset-neutral-900'
                : 'bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950'
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
            className="md:hidden p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile/Responsive Visible Navigation Tab Strip: Always visible navigation even on smaller screens */}
      <div
        ref={mobileNavRef}
        id="mobile-tab-navigation-bar"
        className="md:hidden border-t border-neutral-200 dark:border-neutral-800 px-3 py-2 overflow-x-auto flex items-center gap-1.5 scrollbar-none bg-white/95 dark:bg-neutral-900/95"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              data-nav-id={link.id}
              id={`mobile-pill-${link.id}`}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm ring-1 ring-neutral-950 dark:ring-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 animate-pulse" />
              )}
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 px-4 pt-2 pb-5 space-y-2 bg-white/98 dark:bg-neutral-900/98 backdrop-blur-lg">
          {/* Theme Toggle for Mobile */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 mb-2">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />}
              <span>{darkMode ? 'Dark Theme' : 'Light Theme'}</span>
            </span>
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className="px-3 py-1 text-xs font-bold rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 transition-colors"
            >
              {darkMode ? 'Use Light' : 'Use Dark'}
            </button>
          </div>

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
                    ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm'
                    : 'text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="text-xs bg-neutral-800 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-900 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 animate-pulse" />
                    Active
                  </span>
                )}
              </a>
            );
          })}

          {/* Social Links in Mobile Drawer */}
          <div className="flex items-center gap-3 py-2 border-t border-neutral-200 dark:border-neutral-800">
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 text-xs font-bold"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700 text-xs font-bold"
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
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 text-sm font-bold border border-neutral-300 dark:border-neutral-700"
            >
              <FileText className="w-4 h-4 text-neutral-950 dark:text-neutral-100" />
              <span>View Full CV</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact', 'contact')}
              className={`block w-full text-center py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                activeSection === 'contact'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 ring-2 ring-neutral-950 dark:ring-white ring-offset-2 dark:ring-offset-neutral-900'
                  : 'bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-neutral-950'
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
