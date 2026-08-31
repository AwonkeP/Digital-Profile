import React, { useState } from 'react';
import { Network, Layers, LineChart, Workflow, Check, Sparkles } from 'lucide-react';
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
        return <Network className="w-6 h-6 text-sky-600 dark:text-sky-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />;
      case 'LineChart':
        return <LineChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-500" />;
    }
  };

  const getDomainColor = (category: string) => {
    switch (category) {
      case 'infra':
        return {
          bgIcon: 'bg-sky-50 dark:bg-sky-950/80',
          badgeText: 'text-sky-600 dark:text-sky-400',
          checkIcon: 'text-sky-500',
        };
      case 'enterprise':
        return {
          bgIcon: 'bg-indigo-50 dark:bg-indigo-950/80',
          badgeText: 'text-indigo-600 dark:text-indigo-400',
          checkIcon: 'text-indigo-500',
        };
      case 'data':
        return {
          bgIcon: 'bg-blue-50 dark:bg-blue-950/80',
          badgeText: 'text-blue-600 dark:text-blue-400',
          checkIcon: 'text-blue-500',
        };
      case 'admin':
        return {
          bgIcon: 'bg-emerald-50 dark:bg-emerald-950/80',
          badgeText: 'text-emerald-600 dark:text-emerald-400',
          checkIcon: 'text-emerald-500',
        };
      default:
        return {
          bgIcon: 'bg-slate-50 dark:bg-slate-800',
          badgeText: 'text-slate-600 dark:text-slate-400',
          checkIcon: 'text-sky-500',
        };
    }
  };

  return (
    <section id="skills" className="pt-10 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-2">
            Technical Matrix
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Core Competencies & Toolset
          </h3>
        </div>

        {/* Skill Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                id={`filter-${tab.key}`}
                onClick={() => setSelectedFilter(tab.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-sky-500'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSkills.map((skill) => {
          const colors = getDomainColor(skill.category);
          return (
            <div
              key={skill.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-sky-500/40 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${colors.bgIcon} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  {getDomainIcon(skill.icon)}
                </div>
                <span className={`text-xs font-bold ${colors.badgeText} uppercase tracking-wider`}>
                  {skill.domain}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                  {skill.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {skill.description}
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {skill.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 ${colors.checkIcon} shrink-0 mt-0.5`} />
                      <span className="leading-snug">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
