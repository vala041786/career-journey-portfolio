import { achievements } from './achievements';
import { milestones } from './milestones';
import { projects } from './projects';
import { recognitionScrollItems } from './recognitionScroll';

export type JourneyGroup = 'journey' | 'projects' | 'recognition' | 'connect';

export type JourneyRecognition = {
  label: string;
  symbol: string;
};

export type JourneyItem = {
  id: string;
  symbol: string;
  title: string;
  meta?: string;
  description?: string;
  tags?: string[];
  impact?: string;
  recognitions?: JourneyRecognition[];
  links?: { label: string; href: string }[];
  group: JourneyGroup;
};

const achievementSymbols = ['💰', '🌍', '🎤'];
const achievementTitles = ['$500M+ business impact', '15+ years, 3 continents', '50+ AI workshops'];

const earlyAchievements: JourneyItem[] = achievements.map((achievement, index) => ({
  id: `achievement-${index}`,
  symbol: achievementSymbols[index] ?? '✦',
  title: achievementTitles[index] ?? 'Recognition',
  description: achievement,
  group: 'recognition' as const,
}));

export const journeyItems: JourneyItem[] = [
  ...milestones.map((milestone, index) => ({
    id: `milestone-${index}`,
    symbol: milestone.symbol,
    title: milestone.title,
    meta: `${milestone.year} · ${milestone.location}`,
    description: milestone.description,
    tags: milestone.tags,
    group: 'journey' as const,
  })),
  ...projects.map((project, index) => ({
    id: `project-${index}`,
    symbol: project.symbol,
    title: project.name,
    description: project.description,
    impact: project.impact,
    group: 'projects' as const,
  })),
  ...earlyAchievements,
  {
    id: 'achievements-hub',
    symbol: '🏆',
    title: 'Achievements',
    description: `${recognitionScrollItems.length} recognitions across speaking, thought leadership, awards, and industry impact.`,
    recognitions: recognitionScrollItems.map(({ label, symbol }) => ({ label, symbol })),
    group: 'recognition',
  },
  {
    id: 'contact',
    symbol: '🤝',
    title: "Let's Connect",
    description: 'Interested in AI product, agentic systems, or research-to-reality work?',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vaishali-lambe' },
      { label: 'Medium', href: 'https://medium.com/@curiousmind1786' },
      { label: 'Email', href: 'mailto:hello@example.com' },
    ],
    group: 'connect',
  },
];
