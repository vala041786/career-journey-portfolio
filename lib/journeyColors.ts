export type JourneyTitleColor = {
  colorClass: string;
  hoverClass: string;
  glowRgb: string;
  borderClass: string;
  impactBgClass: string;
  impactTextClass: string;
};

export const journeyTitleColors: JourneyTitleColor[] = [
  {
    colorClass: 'text-cyan-200',
    hoverClass: 'group-hover:text-cyan-50',
    glowRgb: '165 243 252',
    borderClass: 'border-cyan-200/35',
    impactBgClass: 'bg-cyan-300/15',
    impactTextClass: 'text-cyan-50',
  },
  {
    colorClass: 'text-amber-200',
    hoverClass: 'group-hover:text-amber-50',
    glowRgb: '253 230 138',
    borderClass: 'border-amber-200/35',
    impactBgClass: 'bg-amber-300/15',
    impactTextClass: 'text-amber-50',
  },
  {
    colorClass: 'text-emerald-300',
    hoverClass: 'group-hover:text-emerald-100',
    glowRgb: '110 231 183',
    borderClass: 'border-emerald-300/35',
    impactBgClass: 'bg-emerald-300/15',
    impactTextClass: 'text-emerald-50',
  },
  {
    colorClass: 'text-violet-300',
    hoverClass: 'group-hover:text-violet-100',
    glowRgb: '196 181 253',
    borderClass: 'border-violet-300/35',
    impactBgClass: 'bg-violet-300/15',
    impactTextClass: 'text-violet-50',
  },
  {
    colorClass: 'text-sky-200',
    hoverClass: 'group-hover:text-sky-50',
    glowRgb: '186 230 253',
    borderClass: 'border-sky-200/35',
    impactBgClass: 'bg-sky-300/15',
    impactTextClass: 'text-sky-50',
  },
  {
    colorClass: 'text-teal-200',
    hoverClass: 'group-hover:text-teal-50',
    glowRgb: '153 246 228',
    borderClass: 'border-teal-200/35',
    impactBgClass: 'bg-teal-300/15',
    impactTextClass: 'text-teal-50',
  },
  {
    colorClass: 'text-rose-300',
    hoverClass: 'group-hover:text-rose-100',
    glowRgb: '253 164 175',
    borderClass: 'border-rose-300/35',
    impactBgClass: 'bg-rose-300/15',
    impactTextClass: 'text-rose-50',
  },
  {
    colorClass: 'text-fuchsia-300',
    hoverClass: 'group-hover:text-fuchsia-100',
    glowRgb: '240 171 252',
    borderClass: 'border-fuchsia-300/35',
    impactBgClass: 'bg-fuchsia-300/15',
    impactTextClass: 'text-fuchsia-50',
  },
  {
    colorClass: 'text-indigo-300',
    hoverClass: 'group-hover:text-indigo-100',
    glowRgb: '165 180 252',
    borderClass: 'border-indigo-300/35',
    impactBgClass: 'bg-indigo-300/15',
    impactTextClass: 'text-indigo-50',
  },
  {
    colorClass: 'text-lime-200',
    hoverClass: 'group-hover:text-lime-50',
    glowRgb: '217 249 157',
    borderClass: 'border-lime-200/35',
    impactBgClass: 'bg-lime-300/15',
    impactTextClass: 'text-lime-50',
  },
  {
    colorClass: 'text-orange-200',
    hoverClass: 'group-hover:text-orange-50',
    glowRgb: '254 215 170',
    borderClass: 'border-orange-200/35',
    impactBgClass: 'bg-orange-300/15',
    impactTextClass: 'text-orange-50',
  },
  {
    colorClass: 'text-pink-300',
    hoverClass: 'group-hover:text-pink-100',
    glowRgb: '249 168 212',
    borderClass: 'border-pink-300/35',
    impactBgClass: 'bg-pink-300/15',
    impactTextClass: 'text-pink-50',
  },
  {
    colorClass: 'text-blue-200',
    hoverClass: 'group-hover:text-blue-50',
    glowRgb: '191 219 254',
    borderClass: 'border-blue-200/35',
    impactBgClass: 'bg-blue-300/15',
    impactTextClass: 'text-blue-50',
  },
  {
    colorClass: 'text-yellow-200',
    hoverClass: 'group-hover:text-yellow-50',
    glowRgb: '254 240 138',
    borderClass: 'border-yellow-200/35',
    impactBgClass: 'bg-yellow-300/15',
    impactTextClass: 'text-yellow-50',
  },
  {
    colorClass: 'text-slate-200',
    hoverClass: 'group-hover:text-slate-50',
    glowRgb: '226 232 240',
    borderClass: 'border-slate-200/35',
    impactBgClass: 'bg-slate-300/15',
    impactTextClass: 'text-slate-50',
  },
  {
    colorClass: 'text-cyan-100',
    hoverClass: 'group-hover:text-white',
    glowRgb: '207 250 254',
    borderClass: 'border-cyan-100/35',
    impactBgClass: 'bg-cyan-200/15',
    impactTextClass: 'text-cyan-50',
  },
  {
    colorClass: 'text-violet-200',
    hoverClass: 'group-hover:text-violet-50',
    glowRgb: '221 214 254',
    borderClass: 'border-violet-200/35',
    impactBgClass: 'bg-violet-200/15',
    impactTextClass: 'text-violet-50',
  },
  {
    colorClass: 'text-emerald-200',
    hoverClass: 'group-hover:text-emerald-50',
    glowRgb: '167 243 208',
    borderClass: 'border-emerald-200/35',
    impactBgClass: 'bg-emerald-200/15',
    impactTextClass: 'text-emerald-50',
  },
];

export function getJourneyTitleColor(index: number): JourneyTitleColor {
  return journeyTitleColors[index % journeyTitleColors.length] ?? journeyTitleColors[0];
}
