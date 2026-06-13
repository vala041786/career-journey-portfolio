'use client';

import { projects } from '../data/projects';
import { ScrollReveal } from './motion/ScrollReveal';
import { StaggerItem, StaggerReveal } from './motion/StaggerReveal';

export function Projects() {
  return (
    <section id="projects" className="scroll-section scroll-mt-24 px-6 py-16 md:py-24">
      <ScrollReveal drift="right">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Builder Mode</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Featured AI projects</h2>
        </div>
      </ScrollReveal>

      <StaggerReveal className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <StaggerItem key={project.name}>
            <article
              className={`h-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 transition hover:border-cyan-200/25 hover:from-white/[0.12] ${
                index % 2 === 1 ? 'md:translate-y-8' : ''
              }`}
            >
              <h3 className="text-2xl font-semibold">{project.name}</h3>
              <p className="mt-4 leading-7 text-white/70">{project.description}</p>
              <p className="mt-5 rounded-2xl bg-cyan-300/10 p-4 text-sm text-cyan-100">{project.impact}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
