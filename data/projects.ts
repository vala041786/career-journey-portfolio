export type Project = {
  name: string;
  symbol: string;
  description: string;
  impact: string;
  tags: string[];
};

export type IndustryProjects = {
  industry: string;
  symbol: string;
  projects: Project[];
};

export const projectIndustries: IndustryProjects[] = [
  {
    industry: 'Marketing & Advertising',
    symbol: '📣',
    projects: [
      {
        name: 'Ad Creative AI',
        symbol: '💬',
        description:
          'Create instant, engaging ad creative for your campaigns aligned to campaign goals.',
        impact: 'Speeds up engaging ad creative and reduces time to market.',
        tags: ['Marketing', 'Advertising', 'Creative'],
      },
    ],
  },
  {
    industry: 'Social Media',
    symbol: '📱',
    projects: [
      {
        name: 'Chibi Series',
        symbol: '🎥',
        description:
          'Short-form educational series explaining AI concepts in simple, visual, non-technical language.',
        impact: 'Makes AI approachable for broader audiences on social platforms.',
        tags: ['Social Media', 'Education', 'AI'],
      },
      {
        name: 'Thoughts to Impact',
        symbol: '✨',
        description:
          'Transform raw ideas and reflections into clear, shareable content that drives engagement.',
        impact: 'Turns everyday thoughts into posts that connect and create impact.',
        tags: ['Social Media', 'Content', 'Ideas'],
      },
      {
        name: 'Evoloop',
        symbol: '🔄',
        description:
          'Continuous learning loop that evolves your social content strategy based on what performs.',
        impact: 'Improves content quality and reach through iterative AI feedback.',
        tags: ['Social Media', 'Growth', 'AI'],
      },
      {
        name: 'Info Integrity',
        symbol: '🛡️',
        description:
          'Help creators and audiences spot misinformation and share more trustworthy content.',
        impact: 'Builds trust by strengthening accuracy across social conversations.',
        tags: ['Social Media', 'Trust', 'Integrity'],
      },
    ],
  },
  {
    industry: 'Healthcare',
    symbol: '🏥',
    projects: [
      {
        name: 'In Your Words',
        symbol: '🗣️',
        description:
          'Removes language and technical terminology barriers so you can communicate in your own words.',
        impact: 'Helps people communicate confidently in their own language.',
        tags: ['Healthcare', 'Communication', 'Accessibility'],
      },
      {
        name: 'Zero Bill',
        symbol: '🧾',
        description:
          'Simplifies medical billing so patients can understand charges and reduce unexpected costs.',
        impact: 'Brings clarity and fairness to healthcare billing experiences.',
        tags: ['Healthcare', 'Billing', 'Affordable'],
      },
    ],
  },
  {
    industry: 'Operations',
    symbol: '⚙️',
    projects: [
      {
        name: 'Enterprise AI OS',
        symbol: '🏢',
        description:
          'An operating system layer for enterprise teams to run AI workflows across tools, data, and decisions.',
        impact: 'Unifies AI operations so teams move faster with less friction.',
        tags: ['Operations', 'Enterprise', 'AI OS'],
      },
      {
        name: 'Personal OS',
        symbol: '🧭',
        description:
          'A personal operating system for goals, routines, and daily execution powered by AI.',
        impact: 'Connects personal priorities to consistent day-to-day action.',
        tags: ['Operations', 'Productivity', 'Personal'],
      },
    ],
  },
  {
    industry: 'Careers and Hiring',
    symbol: '💼',
    projects: [
      {
        name: 'Job Signal',
        symbol: '📡',
        description:
          'Matches your skills and experience to role signals and crafts stronger, more targeted applications.',
        impact: 'Increases your chances of getting noticed and hired.',
        tags: ['Careers', 'Hiring', 'AI'],
      },
    ],
  },
  {
    industry: 'Architecture',
    symbol: '🏗️',
    projects: [
      {
        name: 'ClearArch',
        symbol: '📐',
        description:
          'Clarifies system architecture decisions with AI-assisted diagrams, tradeoffs, and documentation.',
        impact: 'Helps teams design clearer, more maintainable architectures faster.',
        tags: ['Architecture', 'Systems', 'AI'],
      },
    ],
  },
  {
    industry: 'Customers',
    symbol: '🤝',
    projects: [
      {
        name: 'OpportunityLoop',
        symbol: '🎯',
        description:
          'Identifies, prioritizes, and follows through on customer opportunities in a continuous loop.',
        impact: 'Turns customer signals into repeatable growth opportunities.',
        tags: ['Customers', 'Growth', 'AI'],
      },
    ],
  },
  {
    industry: 'Banking',
    symbol: '🏦',
    projects: [
      {
        name: 'IB Ticket Agent',
        symbol: '🔄',
        description:
          'An agentic AI system for investment banking ticketing that automates vendor complaints from intake to resolution.',
        impact:
          'Reduces time to resolution with automated workflows and smoother collaboration across business functions.',
        tags: ['Banking', 'Investment Banking', 'AI'],
      },
      {
        name: 'IB Complexity Score',
        symbol: '📊',
        description:
          'Assesses stakeholder problems and existing investment banking processes to spot complexity and AI or data science opportunities.',
        impact: 'Scores 30+ business use cases in one metric to surface easy-to-implement solutions.',
        tags: ['Banking', 'Investment Banking', 'AI'],
      },
      {
        name: 'Banking Innovation Score',
        symbol: '💡',
        description:
          'Analyzes solutions implemented across teams globally to find reusable tech stacks and classify innovation across verticals and horizontals.',
        impact:
          'Clarifies what counts as technology vs. business innovation so teams can define innovation clearly.',
        tags: ['Banking', 'Innovation', 'AI'],
      },
      {
        name: 'Policy Knowledge Search',
        symbol: '🔍',
        description:
          'Proof of concept for generative AI knowledge search that makes banking policies accessible and easy to understand.',
        impact: 'Reduces the time and effort needed to understand banking policies and regulations.',
        tags: ['Banking', 'Regulations and Policies', 'AI'],
      },
      {
        name: 'Banking DS Solutions',
        symbol: '🧠',
        description:
          'Automates complex banking stakeholder processes and data consumption with simplified data science and AI tools.',
        impact: 'Makes solutions less technical, easier to understand, and more maintainable for stakeholders.',
        tags: ['Banking', 'Data Science', 'AI'],
      },
    ],
  },
];

/** Flat list for journey timeline and other consumers that need every project */
export const projects = projectIndustries.flatMap((group) => group.projects);
