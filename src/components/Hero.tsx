import React, { useState, useEffect } from 'react';
import { Send, MapPin, CheckCircle2, ArrowUpRight, Linkedin, Github, X, Shield, Cpu, Network, Building2, ChevronRight, Award, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_INFO } from '../data';

interface HeroProps {
  onOpenResume: () => void;
}

type PopupType = 'diagnostics' | 'performance' | 'networking' | 'experience' | 'stats' | 'cput' | null;

interface PillarDetail {
  id: PopupType;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge: string;
  summary: string;
  keyPoints: string[];
  metrics: { label: string; value: string }[];
  actionLabel?: string;
  actionHref?: string;
}

const PILLAR_DETAILS: Record<string, PillarDetail> = {
  diagnostics: {
    id: 'diagnostics',
    title: 'First-Line Incident Diagnostics',
    subtitle: 'SLA-Driven Helpdesk & Rapid Technical Triage',
    icon: Shield,
    badge: 'Core Competency',
    summary: 'Expert first-line ticket triaging, incident classification, and immediate root-cause isolation across hardware, operating systems, and networked software suites.',
    keyPoints: [
      'Rapid root-cause triage using Windows Event Viewer, Task Manager, and diagnostic CLI tools.',
      'Strict SLA adherence (>95% first-contact resolution on tier-1 desktop tickets).',
      'Remote troubleshooting via Microsoft Teams, AnyDesk, and Quick Assist for hybrid users.',
      'Comprehensive ticketing documentation, user empathy, and seamless tier-2 escalation.'
    ],
    metrics: [
      { label: 'First-Touch Resolution', value: '88%+' },
      { label: 'Average Response Time', value: '< 15 Min' },
      { label: 'User Satisfaction', value: '4.9 / 5.0' }
    ]
  },
  performance: {
    id: 'performance',
    title: 'System Performance & Slowdown Resolution',
    subtitle: 'Hardware Diagnostics & Operating System Tuning',
    icon: Cpu,
    badge: 'Diagnostics & Health',
    summary: 'In-depth troubleshooting of workstations experiencing thermal throttling, high disk I/O, memory leaks, driver corruptions, or background service bottlenecks.',
    keyPoints: [
      'Identification of resource hogs, memory leaks, and disk paging delays using Resource Monitor.',
      'Preventative maintenance: SSD TRIM verification, cache purges, and automated update scheduling.',
      'Component-level hardware inspection: RAM stability tests (MemTest), PSU voltage checks, and drive health.',
      'Optimization of startup services and group policies to minimize boot latency.'
    ],
    metrics: [
      { label: 'Boot Time Improvement', value: '-45%' },
      { label: 'Hardware Recovery', value: '92%+' },
      { label: 'Preventative Audits', value: 'Weekly' }
    ]
  },
  networking: {
    id: 'networking',
    title: 'Fundamental Network & Systems Maintenance',
    subtitle: 'CCNA Foundations, Routing, Switching & Protocols',
    icon: Network,
    badge: 'CCNA Trained',
    summary: 'Practical enterprise networking skills covering Cisco routing and switching, VLAN segmentation, DHCP/DNS infrastructure, and gateway troubleshooting methodologies.',
    keyPoints: [
      'Cisco switch & router configuration, port security, and 802.1Q trunk encapsulation.',
      'IPv4 subnetting, static routing, and dynamic protocol verification (OSPF).',
      'Layer 1–4 diagnostic methodologies: packet tracing, ping/traceroute hop analysis, and DNS resolution tests.',
      'Enterprise simulation of multi-VLAN branch architectures with DHCP snooping and ACL access controls.'
    ],
    metrics: [
      { label: 'VLAN Segmentation', value: '802.1Q' },
      { label: 'Cisco Lab Scenarios', value: '15+ Topologies' },
      { label: 'Protocols Managed', value: 'TCP/IP, DHCP, DNS' }
    ]
  },
  experience: {
    id: 'experience',
    title: 'Public & Private Sector Experience',
    subtitle: 'High-Impact Technical Support Across 4+ Enterprise Roles',
    icon: Building2,
    badge: 'Enterprise Experience',
    summary: 'Versatile background spanning institutional education support, high-volume public transport systems, and modern technology accelerators.',
    keyPoints: [
      'CAPACITI: Full-lifecycle IT support, M365 provisioning, hybrid meeting room tech, and fast-paced accelerator workflows.',
      'PRASA: Public rail transport IT operations, enterprise equipment maintenance, and mission-critical communications.',
      'Western Cape Education Department (WCED): Supported 1,200+ students and educators across institutional computer labs.',
      'Business-IT Alignment: Bridging technical problem-solving with organizational compliance and productivity.'
    ],
    metrics: [
      { label: 'Enterprise Roles', value: '4+ Organizations' },
      { label: 'Users Supported', value: '1,200+' },
      { label: 'Infrastructure Scope', value: 'Multi-Site' }
    ]
  },
  stats: {
    id: 'stats',
    title: '4+ Enterprise Roles',
    subtitle: 'Track Record of Progressive IT Support Delivery',
    icon: Award,
    badge: 'Career History',
    summary: 'A strong foundation built across public, private, and education organizations in Cape Town, South Africa.',
    keyPoints: [
      'IT Technical Support at CAPACITI (Tech Talent Accelerator)',
      'IT Technical Support Intern at Passenger Rail Agency of South Africa (PRASA)',
      'IT Support Intern at Western Cape Education Department (WCED)',
      'Student Academic IT & Administrative Support at CPUT'
    ],
    metrics: [
      { label: 'Total Experience', value: '4+ Years Foundation' },
      { label: 'Environments', value: 'Hybrid & On-Premise' },
      { label: 'Focus', value: 'Service Excellence' }
    ]
  },
  cput: {
    id: 'cput',
    title: 'CPUT Diploma Graduate',
    subtitle: 'Diploma in Business and Information Administration',
    icon: Award,
    badge: 'Academic Credential',
    summary: 'Graduated from Cape Peninsula University of Technology (CPUT) with distinctions in Business Applications and Information Administration.',
    keyPoints: [
      'Distinctions achieved in Business Applications and Information Administration.',
      'Specialized in aligning software tools and network infrastructure with executive administrative operations.',
      'Comprehensive coursework in information systems, database administration, and operational compliance.'
    ],
    metrics: [
      { label: 'Institution', value: 'CPUT' },
      { label: 'Distinctions', value: 'Multiple Courses' },
      { label: 'Focus', value: 'Business & IT Systems' }
    ]
  }
};

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [showFollowerBar, setShowFollowerBar] = useState<boolean>(false);

  // Monitor scroll position to show/hide the floating follower bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show floating follower bar when scrolled past the hero card (~320px)
      if (scrollPosition > 320) {
        setShowFollowerBar(true);
      } else {
        setShowFollowerBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close popup with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePopup(null);
      }
    };
    if (activePopup) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activePopup]);

  const currentPopupData = activePopup ? PILLAR_DETAILS[activePopup] : null;

  return (
    <section id="hero" className="relative pt-6 pb-2">
      <div className="max-w-xl mx-auto">
        {/* Animated Profile Identity Card with Smooth Entry & Micro-Interactions */}
        <motion.div
          id="hero-profile-card"
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-lg space-y-5"
        >
          
          {/* Centered Profile Header with Staggered Fade-in */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col items-center text-center pt-1"
          >
            {/* Centered Round Circle Picture with Spring Hover */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative shrink-0 cursor-pointer"
              onClick={() => setActivePopup('experience')}
              title="Click to view background details"
            >
              <div className="w-28 h-28 rounded-full p-1 bg-neutral-900 dark:bg-neutral-800 ring-4 ring-neutral-200/80 dark:ring-neutral-800 shadow-md">
                <img
                  id="hero-profile-avatar"
                  src={PROFILE_INFO.profileImage}
                  alt={PROFILE_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-neutral-900"
                />
              </div>
              {/* Active Indicator Dot */}
              <span
                title="Active IT Technical Support"
                className="absolute bottom-1 right-1 w-4.5 h-4.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-neutral-900 shadow-xs"
              />
            </motion.div>

            {/* Centered Name, Role, Location, and Status */}
            <div className="mt-4 space-y-1 flex flex-col items-center">
              <h2 className="font-extrabold text-neutral-950 dark:text-white text-2xl tracking-tight leading-tight">
                {PROFILE_INFO.name}
              </h2>
              <p className="text-sm text-neutral-800 dark:text-neutral-200 font-bold">
                {PROFILE_INFO.role}
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center justify-center gap-1.5 font-medium pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-300 shrink-0" />
                <span>Cape Town, South Africa</span>
              </p>
              
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActivePopup('experience')}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold shadow-2xs cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Ready for IT & Systems Roles</span>
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Action CTAs: Get in Touch & View CV */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-2 gap-2.5 pt-1"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="hero-contact-cta"
              href="#contact"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="hero-view-cv-cta"
              onClick={onOpenResume}
              className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-950 dark:text-neutral-100 font-bold text-xs border border-neutral-300 dark:border-neutral-700 transition-colors shadow-2xs cursor-pointer"
            >
              <span>View CV</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-950 dark:text-neutral-100" />
            </motion.button>
          </motion.div>

          {/* Social Direct Links */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="grid grid-cols-2 gap-2.5"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="card-linkedin-link"
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-950 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 text-xs font-bold transition-all shadow-2xs"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
              <span>LinkedIn</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="card-github-link"
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-950 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 text-xs font-bold transition-all shadow-2xs"
            >
              <Github className="w-3.5 h-3.5 text-neutral-950 dark:text-neutral-100" />
              <span>GitHub</span>
            </motion.a>
          </motion.div>

          <hr className="border-neutral-200 dark:border-neutral-800" />

          {/* Quick Stats Aligned Symmetrically with Interactive Pop-up Triggers */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePopup('stats')}
              className="py-3 px-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-center flex flex-col items-center justify-center cursor-pointer transition-colors group"
            >
              <div className="text-2xl font-black text-neutral-950 dark:text-white leading-none group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                4+
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mt-1.5 flex items-center gap-1">
                <span>Enterprise Roles</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActivePopup('cput')}
              className="py-3 px-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-center flex flex-col items-center justify-center cursor-pointer transition-colors group"
            >
              <div className="text-2xl font-black text-neutral-950 dark:text-white leading-none group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                CPUT
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mt-1.5 flex items-center gap-1">
                <span>Diploma Graduate</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          </motion.div>

          {/* Support Pillars Professionally Aligned with Clickable Detail Pop-ups */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="space-y-3 pt-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-neutral-700 dark:text-neutral-400 tracking-wider">
                Support Pillars
              </span>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                Click for details
              </span>
            </div>

            <ul className="space-y-2">
              <motion.li
                whileHover={{ scale: 1.015, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePopup('diagnostics')}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium p-2.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 cursor-pointer transition-all shadow-2xs group"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-snug flex-1">First-Line Incident Diagnostics</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all mt-0.5" />
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.015, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePopup('performance')}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium p-2.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 cursor-pointer transition-all shadow-2xs group"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-snug flex-1">System Performance & Slowdown Resolution</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all mt-0.5" />
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.015, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePopup('networking')}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium p-2.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 cursor-pointer transition-all shadow-2xs group"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-snug flex-1">Fundamental Network & Systems Maintenance</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all mt-0.5" />
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.015, x: 3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActivePopup('experience')}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-medium p-2.5 rounded-xl bg-neutral-50/80 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 cursor-pointer transition-all shadow-2xs group"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-snug flex-1">Public & Private Sector Experience</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all mt-0.5" />
              </motion.li>
            </ul>
          </motion.div>

        </motion.div>
      </div>

      {/* Floating Follower Bar that follows the screen as the user scrolls */}
      <AnimatePresence>
        {showFollowerBar && (
          <motion.div
            id="floating-scroll-dock"
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[94%] sm:w-auto"
          >
            <div className="flex items-center gap-2 p-2 px-3 rounded-full bg-neutral-900/95 dark:bg-neutral-900/95 text-white backdrop-blur-md border border-neutral-700/80 shadow-2xl">
              
              {/* Avatar + Name */}
              <div 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 pr-2 border-r border-neutral-700/70 cursor-pointer shrink-0"
                title="Back to Top"
              >
                <div className="relative">
                  <img
                    src={PROFILE_INFO.profileImage}
                    alt={PROFILE_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-white/60"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full ring-1 ring-black"></span>
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <p className="text-xs font-bold text-white leading-none">Awonke P.</p>
                  <p className="text-[10px] text-neutral-400 leading-none mt-0.5">IT Support</p>
                </div>
              </div>

              {/* Pop-up Quick Triggers that follow the screen */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActivePopup('diagnostics')}
                  className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-200 flex items-center gap-1 transition-colors cursor-pointer"
                  title="View Support Pillars Pop-up"
                >
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span className="hidden xs:inline">Pillars</span>
                </button>

                <button
                  onClick={() => setActivePopup('networking')}
                  className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-200 flex items-center gap-1 transition-colors cursor-pointer"
                  title="View Networking Skills Pop-up"
                >
                  <Network className="w-3 h-3 text-blue-400" />
                  <span className="hidden sm:inline">CCNA</span>
                </button>

                <button
                  onClick={() => setActivePopup('stats')}
                  className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-200 flex items-center gap-1 transition-colors cursor-pointer"
                  title="View Experience Stats Pop-up"
                >
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>4+ Roles</span>
                </button>

                <a
                  href="#contact"
                  className="px-3 py-1 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-[11px] font-bold flex items-center gap-1 transition-colors shadow-xs"
                >
                  <Send className="w-3 h-3" />
                  <span>Contact</span>
                </a>

                <button
                  onClick={onOpenResume}
                  className="px-2.5 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-200 flex items-center gap-1 transition-colors cursor-pointer"
                  title="View CV"
                >
                  <span>CV</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Detail Pop-up Modal that strictly follows the screen as the user scrolls */}
      <AnimatePresence>
        {activePopup && currentPopupData && (
          <div 
            id="hero-pillar-popup-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setActivePopup(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-2xl overflow-hidden p-6 sm:p-7 text-neutral-950 dark:text-neutral-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePopup(null)}
                aria-label="Close popup"
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-start gap-3.5 pr-8">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                  <currentPopupData.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-extrabold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 mb-1">
                    {currentPopupData.badge}
                  </div>
                  <h3 className="text-xl font-black text-neutral-950 dark:text-white leading-tight">
                    {currentPopupData.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mt-0.5">
                    {currentPopupData.subtitle}
                  </p>
                </div>
              </div>

              {/* Summary Description */}
              <p className="mt-4 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-neutral-800/50 p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                {currentPopupData.summary}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 mt-4">
                {currentPopupData.metrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200 dark:border-neutral-800 text-center">
                    <div className="text-sm sm:text-base font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-neutral-600 dark:text-neutral-400 font-bold mt-1 leading-tight">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Bullet Points */}
              <div className="mt-5 space-y-2.5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-neutral-700 dark:text-neutral-400">
                  Operational Breakdown
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                  {currentPopupData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons in Popup */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActivePopup(null);
                    onOpenResume();
                  }}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Verified CV</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <a
                  href="#contact"
                  onClick={() => setActivePopup(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Contact Awonke</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

