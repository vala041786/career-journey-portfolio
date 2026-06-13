'use client';

import { achievements } from '../data/achievements';
import { recognitionScrollItems } from '../data/recognitionScroll';
import { ScrollReveal } from './motion/ScrollReveal';
import { StaggerItem, StaggerReveal } from './motion/StaggerReveal';

export function Achievements() {
  return (
    <section className="scroll-section px-6 py-16 md:py-24">
      <ScrollReveal drift="left">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Recognition & Reach</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Proof points beyond job titles</h2>

          <StaggerReveal className="mt-10 grid gap-4 md:grid-cols-2">
            {achievements.map((item, index) => (
              <StaggerItem key={item}>
                <div
                  className={`rounded-2xl border border-white/10 bg-ink/40 p-5 text-white/75 transition hover:border-violet-400/30 ${
                    index % 2 === 1 ? 'md:translate-x-4' : 'md:-translate-x-4'
                  }`}
                >
                  ✦ {item}
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <StaggerReveal className="mt-10">
            <h3 className="text-lg font-semibold text-white/90">All recognitions</h3>
            <ul className="mt-4 space-y-2">
              {recognitionScrollItems.map((item, index) => (
                <li
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-ink/40 px-4 py-3 text-sm text-white/75"
                >
                  <span className="mr-2 text-white/40">{index + 1}.</span>
                  <span className="mr-2">{item.symbol}</span>
                  {item.label}
                </li>
              ))}
            </ul>
          </StaggerReveal>
        </div>
      </ScrollReveal>
    </section>
  );
}
