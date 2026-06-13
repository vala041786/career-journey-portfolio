'use client';

import { ScrollReveal } from './motion/ScrollReveal';
import { StaggerItem, StaggerReveal } from './motion/StaggerReveal';

const stats = [
  { value: '15+', label: 'Years global experience' },
  { value: '$500M+', label: 'Business savings influenced' },
  { value: '50+', label: 'AI/product workshops' },
  { value: '1.5M+', label: 'YouTube views' },
];

export function ImpactStats() {
  return (
    <section className="scroll-section px-6 py-16 md:py-24">
      <ScrollReveal drift="right">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Impact at a glance</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Numbers that tell the story</h2>
        </div>
      </ScrollReveal>
      <StaggerReveal className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-200/30 hover:bg-white/[0.07]">
              <div className="text-4xl font-bold text-cyan-200">{stat.value}</div>
              <div className="mt-2 text-sm text-white/60">{stat.label}</div>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
