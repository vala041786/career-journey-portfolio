'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { currentFocus } from '../data/recognitionTeaser';

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

type HeroIdentityProps = {
  centered?: boolean;
};

function FocusPath({ reducedMotion, centered }: { reducedMotion: boolean; centered?: boolean }) {
  return (
    <div className={`mt-5 flex items-center gap-3 md:mt-6 ${centered ? 'justify-center' : ''}`}>
      <div className="relative h-px w-16 overflow-hidden bg-gradient-to-r from-cyan-200/50 via-cyan-200/20 to-transparent sm:w-20 md:w-24" />
      <span aria-hidden className="text-[0.65rem] text-cyan-200/45 sm:text-xs">
        ✦
      </span>
      <div className="relative h-px w-16 overflow-hidden bg-gradient-to-l from-cyan-200/50 via-cyan-200/20 to-transparent sm:w-20 md:w-24">
        {!reducedMotion && (
          <motion.span
            aria-hidden
            className="absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.85)]"
            animate={{ right: ['110%', '-10%'], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </div>
    </div>
  );
}

export function HeroIdentity({ centered = false }: HeroIdentityProps) {
  const reducedMotion = useReducedMotion();
  const alignClass = centered ? 'text-center items-center' : 'text-center md:text-left';

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`relative flex flex-col ${alignClass}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute rounded-full bg-cyan-400/[0.07] blur-3xl ${
          centered ? '-top-8 h-32 w-32' : '-left-6 -top-8 h-28 w-28 md:-left-8 md:h-32 md:w-32'
        }`}
      />

      {!centered && (
        <div
          aria-hidden
          className="pointer-events-none absolute -left-px top-1 hidden h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-cyan-200/50 via-cyan-200/15 to-transparent md:block"
        />
      )}

      <motion.div variants={item}>
        <h1 className="hero-name-glow hero-name-shift text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-[3.5rem]">
          Vaishali Lambe
        </h1>
      </motion.div>

      <motion.div variants={item} className="w-full">
        <FocusPath reducedMotion={!!reducedMotion} centered={centered} />
      </motion.div>

      <motion.p
        variants={item}
        className={`mt-4 max-w-xl text-xl font-medium leading-snug sm:text-2xl md:mt-5 md:text-[1.75rem] lg:text-3xl ${centered ? 'mx-auto' : ''}`}
      >
        <span className="bg-gradient-to-r from-cyan-100 via-white to-cyan-100/80 bg-clip-text text-transparent">
          {currentFocus}
        </span>
      </motion.p>
    </motion.div>
  );
}
