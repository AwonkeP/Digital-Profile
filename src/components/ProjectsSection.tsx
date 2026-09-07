import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA, PROFILE_INFO } from '../data';
import {
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Network,
  ShieldCheck,
  Headset,
  Workflow,
  Search,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Mail
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(PROJECTS_DATA.map((p) => p.category)));
    return ['All', ...cats];
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Network':
        return <Network className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />;
      case 'Headset':
        return <Headset className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />;
      default:
        return <FolderGit2 className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />;
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 space-y-8"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-300 dark:border-neutral-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 mb-2 shadow-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Implementations</span>
          </div>
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white"
          >
            Featured Projects & Systems
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Practical demonstrations of network design, cloud identity administration, service desk optimization, and business workflow digitization.
          </p>
        </div>

        {/* Quick Link to GitHub Profile */}
        <div className="flex items-center gap-2">
          <a
            id="projects-view-all-github"
            href={PROFILE_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-bold transition-all shadow-xs border border-neutral-800 dark:border-neutral-700"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm ring-1 ring-neutral-900 dark:ring-white'
                  : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            id="projects-search-input"
            type="text"
            placeholder="Search projects or tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white text-neutral-950 dark:text-white placeholder-neutral-400 font-medium"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            id={`project-card-${project.id}`}
            className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Header: Icon, Category and Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-200 dark:border-neutral-700">
                    {renderIcon(project.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                      {project.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white leading-snug group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
                {project.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
                <span className="text-[11px] font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Key Outcomes & Technical Scope:
                </span>
                <ul className="space-y-1.5">
                  {project.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[11px] text-neutral-600 dark:text-neutral-400 flex items-start gap-2 leading-tight"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-950 dark:text-neutral-100 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-5 mt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  id={`project-github-btn-${project.id}`}
                  href={project.githubUrl || PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-bold border border-neutral-200 dark:border-neutral-700 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                {project.projectUrl ? (
                  <a
                    id={`project-live-btn-${project.id}`}
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-bold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                ) : null}
              </div>

              <a
                id={`project-inquire-btn-${project.id}`}
                href={`mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(`Inquiry about ${project.title}`)}`}
                className="text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Inquire</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-300 dark:border-neutral-800">
          <p className="text-sm font-bold text-neutral-600 dark:text-neutral-400">
            No projects matched your search criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
