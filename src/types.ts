export interface SkillItem {
  id: string;
  name: string;
  category: 'infra' | 'enterprise' | 'data' | 'admin';
  domain: string;
  icon: string;
  description: string;
  bullets: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  type: string;
  summary: string;
  highlights: Array<{
    title: string;
    desc: string;
    icon: string;
  }>;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  tag: string;
  type: string;
  details: string;
  icon: string;
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  highlights: string[];
  technologies: string[];
  status: string;
  icon: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface ScenarioStep {
  title: string;
  detail: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  description: string;
  resolutionTime: string;
  steps: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
