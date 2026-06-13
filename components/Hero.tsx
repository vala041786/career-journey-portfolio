'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const { scrollY } = useScroll();
  const orbY1 = useTransform(scrollY, [0, 600], [0, 120]);
  const orbY2 = useTransform(scrollY, [0, 600], [0, -80]);
  const contentY = useTransform(scrollY, [0, 500], [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section className="scroll-section relative flex min-h-screen items-center overflow-hidden px-6 py-20">
      <motion.div style={{ y: orbY1 }} className="gradient-orb absolute -top-32 -left-32 h-96 w-96 rounded-full" />
      <motion.div style={{ y: orbY2 }} className="gradient-orb absolute top-32 right-0 h-[32rem] w-[32rem] rounded-full" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-cyan-200"
        >
          AI Product Leader • Agentic AI Builder • Research-to-Reality Storyteller
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl text-5xl font-bold tracking-tight md:text-7xl"
        >
          A career journey through systems, data, AI, and product leadership.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-3xl text-lg leading-8 text-white/70 md:text-xl"
        >
          I started by understanding complex systems, grew through enterprise technology delivery,
          moved into data and AI products, and now build agentic AI workflows that turn emerging research into practical business impact.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a href="#journey" className="rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:bg-cyan-200">
            Explore Journey
          </a>
          <a href="#projects" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
            View Projects
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/40"
        >
          <span>Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-cyan-200/80 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
