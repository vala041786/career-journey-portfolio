'use client';

import { motion } from 'framer-motion';

type WaveDividerProps = {
  flip?: boolean;
  tone?: 'violet' | 'cyan' | 'neutral';
};

const tones = {
  violet: 'from-violet-500/20 via-violet-400/10 to-transparent',
  cyan: 'from-cyan-400/20 via-cyan-300/10 to-transparent',
  neutral: 'from-white/10 via-white/5 to-transparent',
};

export function WaveDivider({ flip = false, tone = 'neutral' }: WaveDividerProps) {
  return (
    <div
      aria-hidden
      className={`relative z-10 -my-6 h-20 w-full overflow-hidden md:-my-10 md:h-28 ${flip ? 'rotate-180' : ''}`}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${tones[tone]}`}
        initial={{ opacity: 0, scaleY: 0.6 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 h-full w-[120%] -translate-x-[10%]"
      >
        <motion.path
          fill="url(#wave-gradient)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          d="M0,72 C240,120 480,24 720,72 C960,120 1200,24 1440,72 L1440,120 L0,120 Z"
        />
        <motion.path
          fill="rgba(34,211,238,0.06)"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          d="M0,88 C320,40 640,104 960,64 C1120,44 1280,80 1440,64 L1440,120 L0,120 Z"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.12)" />
            <stop offset="50%" stopColor="rgba(34,211,238,0.08)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.12)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
