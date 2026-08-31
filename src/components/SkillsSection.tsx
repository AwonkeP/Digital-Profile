import React, { useState } from 'react';
import { Network, Layers, LineChart, Workflow, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SKILLS_DATA } from '../data';

export const SkillsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'infra' | 'enterprise' | 'data' | 'admin'>('all');

  const filterTabs = [
    { key: 'all', label: 'All Domains' },
    { key: 'infra', label: 'Infrastructure' },
    { key: 'enterprise', label: 'Enterprise Tools' },
    { key: 'data', label: 'Data & Operations' },
    { key: 'admin', label: 'Admin Strategy' },
  ] as const;

  const filteredSkills = selectedFilter === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedFilter);

  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-5 h-5 text-neutral-950" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-neutral-950" />;
      case 'LineChart':
        return <LineChart className="w-5 h-5 text-neutral-950" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-neutral-950" />;
      default:
        return <Sparkles className="w-5 h-5 text-neutral-950" />;
    }
  };

  return (
    <section id="skills" className="pt-10 scroll-mt-20">
      {/* Section Header with smooth entrance */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-neutral-300 text-neutral-950 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-950" />
            <span>Technical Matrix</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Core Competencies & Toolset
          </h3>
          <p className="text-sm text-neutral-700 mt-1 max-w-xl font-medium">
            A comprehensive overview of operational domains, systems administration, and enterprise workflows.
          </p>
        </div>

        {/* Filter Tabs with animated active pill */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-neutral-300 rounded-2xl shadow-sm">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                id={`filter-${tab.key}`}
                onClick={() => setSelectedFilter(tab.key)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-700 hover:text-neutral-950'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="skills-filter-active-pill"
                    className="absolute inset-0 bg-neutral-950 rounded-xl shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Skills Grid with moderate, clean white cards and black typography */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => {
            return (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                className="p-6 rounded-3xl bg-white border border-neutral-300 shadow-sm hover:shadow-md hover:border-neutral-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon and Domain Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-300 flex items-center justify-center group-hover:bg-neutral-950 group-hover:text-white transition-colors">
                      <div className="transition-colors group-hover:[&_svg]:text-white">
                        {getDomainIcon(skill.icon)}
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-[11px] font-bold text-neutral-900 tracking-wide">
                      {skill.domain}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-base sm:text-lg font-extrabold text-neutral-950 mb-2 leading-tight">
                    {skill.name}
                  </h4>

                  {/* Description in moderate, readable tone */}
                  <p className="text-xs text-neutral-700 mb-5 leading-relaxed font-medium">
                    {skill.description}
                  </p>

                  {/* Divider */}
                  <div className="h-px w-full bg-neutral-200 mb-4" />

                  {/* Bullet Points with crisp black font and clean checkmarks */}
                  <ul className="space-y-2.5">
                    {skill.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-900">
                        <div className="mt-0.5 p-0.5 rounded-md bg-neutral-100 border border-neutral-300 shrink-0 text-neutral-950">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subtle bottom badge for completion */}
                <div className="pt-5 mt-4 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600">
                  <span className="font-semibold text-neutral-900">Proficiency</span>
                  <span className="font-bold text-neutral-950">Active / Verified</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

