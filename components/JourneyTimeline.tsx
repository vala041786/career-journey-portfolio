'use client';

import { milestones } from '../data/milestones';
import { ScrollReveal } from './motion/ScrollReveal';
import { StaggerItem, StaggerReveal } from './motion/StaggerReveal';

export function JourneyTimeline() {
  return (
    <section id="journey" className="scroll-section scroll-mt-24 px-6 py-16 md:py-24">
      <ScrollReveal drift="left">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Career Flow</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Milestones that shaped the journey</h2>
        </div>
      </ScrollReveal>

      <div className="relative mx-auto mt-16 max-w-6xl">
        <div aria-hidden className="absolute top-0 bottom-0 left-3 w-px bg-gradient-to-b from-cyan-200/60 via-violet-400/30 to-transparent md:left-5" />

        <StaggerReveal className="space-y-8 pl-6 md:pl-10">
          {milestones.map((item, index) => (
            <StaggerItem key={item.title}>
              <article
                className={`relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-violet-400/30 hover:bg-white/[0.07] ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}
              >
                <div className="absolute top-8 -left-[37px] h-4 w-4 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.8)] md:-left-[49px]" />
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                  <span className="rounded-full bg-violet-500/20 px-3 py-1 text-violet-100">{item.year}</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 max-w-3xl leading-7 text-white/70">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
