'use client';

import { ScrollReveal } from './motion/ScrollReveal';

export function Contact() {
  return (
    <section className="scroll-section px-6 py-16 pb-32 md:py-24 md:pb-40">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Let’s Connect</p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Interested in AI product, agentic systems, or research-to-reality work?
          </h2>
          <p className="mt-6 text-white/65">
            This portfolio MVP can later connect to your resume, newsletter, LinkedIn, YouTube, Medium, speaking page, and project demos.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="https://www.linkedin.com/in/vaishali-lambe" className="rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:bg-cyan-200">
              LinkedIn
            </a>
            <a href="https://medium.com/@curiousmind1786" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Medium
            </a>
            <a href="mailto:hello@example.com" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
              Email
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
