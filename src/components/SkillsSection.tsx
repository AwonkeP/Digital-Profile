import React from 'react';
import { Network, Layers, LineChart, Workflow, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { SKILLS_DATA } from '../data';

export const SkillsSection: React.FC = () => {
  const getDomainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'LineChart':
        return <LineChart className="w-5 h-5" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
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
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-950 dark:text-neutral-100 text-xs font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-950 dark:text-white" />
          <span>Technical Expertise</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
          Skills
        </h3>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-1 max-w-xl font-medium">
          A comprehensive overview of technical competencies, systems administration, and enterprise workflows.
        </p>
      </motion.div>

      {/* Skills Grid with clean cards and sharp typography */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {SKILLS_DATA.map((skill, index) => {
          return (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-500 dark:hover:border-neutral-600 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Bar: Icon */}
                <div className="mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group-hover:bg-neutral-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-neutral-950 transition-colors">
                    <div className="transition-colors text-neutral-950 dark:text-white group-hover:text-white dark:group-hover:text-neutral-950">
                      {getDomainIcon(skill.icon)}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-extrabold text-neutral-950 dark:text-white mb-2 leading-tight">
                  {skill.name}
                </h4>

                {/* Description in moderate, readable tone */}
                <p className="text-xs text-neutral-700 dark:text-neutral-300 mb-5 leading-relaxed font-medium">
                  {skill.description}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 mb-4" />

                {/* Bullet Points with crisp font and clean checkmarks */}
                <ul className="space-y-2.5">
                  {skill.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-900 dark:text-neutral-200">
                      <div className="mt-0.5 p-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shrink-0 text-neutral-950 dark:text-white">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug font-medium">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subtle bottom badge for completion */}
              <div className="pt-5 mt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400">
                <span className="font-semibold text-neutral-900 dark:text-neutral-200">Proficiency</span>
                <span className="font-bold text-neutral-950 dark:text-white">Active / Verified</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

