export type RecognitionScrollItem = {
  label: string;
  symbol: string;
  colorClass: string;
  cardClass: string;
  iconClass: string;
  dotClass: string;
};

const rawItems = [
  {
    label: 'Panel Speaker | ConV2X Smart Tech Transformation Tomorrow',
    symbol: '🎤',
    colorClass: 'text-cyan-50',
    cardClass:
      'border-cyan-200/30 bg-gradient-to-br from-cyan-300/18 via-cyan-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-cyan-200/35 bg-cyan-200/18',
    dotClass: 'bg-cyan-200/80',
  },
  {
    label: 'Honored as Top 50 Thought Leader by Thinkers360',
    symbol: '🏆',
    colorClass: 'text-amber-50',
    cardClass:
      'border-amber-200/30 bg-gradient-to-br from-amber-300/18 via-amber-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(251,191,36,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-amber-200/35 bg-amber-200/18',
    dotClass: 'bg-amber-200/80',
  },
  {
    label: 'Influencing Business Adoption of AI & Data Science',
    symbol: '📈',
    colorClass: 'text-emerald-50',
    cardClass:
      'border-emerald-200/30 bg-gradient-to-br from-emerald-300/18 via-emerald-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(52,211,153,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-emerald-200/35 bg-emerald-200/18',
    dotClass: 'bg-emerald-200/80',
  },
  {
    label: 'Guest Speaker | STEM Gems',
    symbol: '🎙️',
    colorClass: 'text-violet-50',
    cardClass:
      'border-violet-200/30 bg-gradient-to-br from-violet-300/18 via-violet-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(167,139,250,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-violet-200/35 bg-violet-200/18',
    dotClass: 'bg-violet-200/80',
  },
  {
    label: '2x Published Author – Data Science & AI',
    symbol: '📚',
    colorClass: 'text-sky-50',
    cardClass:
      'border-sky-200/30 bg-gradient-to-br from-sky-300/18 via-sky-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(125,211,252,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-sky-200/35 bg-sky-200/18',
    dotClass: 'bg-sky-200/80',
  },
  {
    label: 'Global WiDS Ambassador – Stanford',
    symbol: '🌍',
    colorClass: 'text-teal-50',
    cardClass:
      'border-teal-200/30 bg-gradient-to-br from-teal-300/18 via-teal-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(45,212,191,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-teal-200/35 bg-teal-200/18',
    dotClass: 'bg-teal-200/80',
  },
  {
    label: 'Creator with 1.5M+ YouTube Views',
    symbol: '🎬',
    colorClass: 'text-rose-50',
    cardClass:
      'border-rose-200/30 bg-gradient-to-br from-rose-300/18 via-rose-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(251,113,133,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-rose-200/35 bg-rose-200/18',
    dotClass: 'bg-rose-200/80',
  },
  {
    label: 'Spotlighted by Million Women in STEM',
    symbol: '✨',
    colorClass: 'text-fuchsia-50',
    cardClass:
      'border-fuchsia-200/30 bg-gradient-to-br from-fuchsia-300/18 via-fuchsia-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(232,121,249,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-fuchsia-200/35 bg-fuchsia-200/18',
    dotClass: 'bg-fuchsia-200/80',
  },
  {
    label: 'Global Leadership Impact via Podcast & Talk Show',
    symbol: '🎧',
    colorClass: 'text-indigo-50',
    cardClass:
      'border-indigo-200/30 bg-gradient-to-br from-indigo-300/18 via-indigo-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(129,140,248,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-indigo-200/35 bg-indigo-200/18',
    dotClass: 'bg-indigo-200/80',
  },
  {
    label: 'Built community of 17K+ on LinkedIn',
    symbol: '🤝',
    colorClass: 'text-cyan-50',
    cardClass:
      'border-cyan-200/30 bg-gradient-to-br from-cyan-200/18 via-blue-300/10 to-slate-900/30 shadow-[0_16px_48px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-cyan-200/35 bg-cyan-200/18',
    dotClass: 'bg-cyan-200/80',
  },
  {
    label: 'First Place | GDG Stanford Hackathon',
    symbol: '🥇',
    colorClass: 'text-yellow-50',
    cardClass:
      'border-yellow-200/30 bg-gradient-to-br from-yellow-300/18 via-yellow-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(250,204,21,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-yellow-200/35 bg-yellow-200/18',
    dotClass: 'bg-yellow-200/80',
  },
  {
    label: 'Featured in Beverly Hills Magazine',
    symbol: '⭐',
    colorClass: 'text-orange-50',
    cardClass:
      'border-orange-200/30 bg-gradient-to-br from-orange-300/18 via-orange-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(251,146,60,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-orange-200/35 bg-orange-200/18',
    dotClass: 'bg-orange-200/80',
  },
  {
    label: 'Thinkers360 | Top 100 Influential Voices | AGI',
    symbol: '🏅',
    colorClass: 'text-lime-50',
    cardClass:
      'border-lime-200/30 bg-gradient-to-br from-lime-300/18 via-lime-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(190,242,100,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-lime-200/35 bg-lime-200/18',
    dotClass: 'bg-lime-200/80',
  },
  {
    label: 'MSN | Top 10 trailblazing women in 2026',
    symbol: '🌟',
    colorClass: 'text-pink-50',
    cardClass:
      'border-pink-200/30 bg-gradient-to-br from-pink-300/18 via-pink-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(249,168,212,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-pink-200/35 bg-pink-200/18',
    dotClass: 'bg-pink-200/80',
  },
  {
    label: 'Contributor | Telehealth & Medicine 2026 | AI-Enabled Healthcare',
    symbol: '📝',
    colorClass: 'text-blue-50',
    cardClass:
      'border-blue-200/30 bg-gradient-to-br from-blue-300/18 via-blue-400/10 to-slate-900/30 shadow-[0_16px_48px_rgba(147,197,253,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-blue-200/35 bg-blue-200/18',
    dotClass: 'bg-blue-200/80',
  },
  {
    label: 'Appearance on AI loves Data podcast | Episode 62',
    symbol: '🎙️',
    colorClass: 'text-violet-50',
    cardClass:
      'border-violet-200/30 bg-gradient-to-br from-violet-200/18 via-purple-300/10 to-slate-900/30 shadow-[0_16px_48px_rgba(196,181,253,0.14),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-violet-200/35 bg-violet-200/18',
    dotClass: 'bg-violet-200/80',
  },
  {
    label: 'Built Automated Content Engine AI with Chibi for Social Media Platforms',
    symbol: '🤖',
    colorClass: 'text-slate-50',
    cardClass:
      'border-slate-200/30 bg-gradient-to-br from-slate-300/18 via-cyan-300/10 to-slate-900/30 shadow-[0_16px_48px_rgba(148,163,184,0.16),inset_0_1px_0_rgba(255,255,255,0.12)]',
    iconClass: 'border-slate-200/35 bg-slate-200/18',
    dotClass: 'bg-slate-200/80',
  },
] as const;

export const recognitionScrollItems: RecognitionScrollItem[] = [...rawItems];
