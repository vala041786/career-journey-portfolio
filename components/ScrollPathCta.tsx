'use client';

import { motion, useReducedMotion } from 'framer-motion';

type ScrollPathCtaProps = {
  className?: string;
  compact?: boolean;
};

const words = ['Scroll the Path', 'Take the Stop', 'Explore'] as const;
const ease = [0.16, 1, 0.3, 1] as const;

export function ScrollPathCta({ className = '', compact = false }: ScrollPathCtaProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 uppercase ${
          compact
            ? 'text-[0.7rem] tracking-[0.24em] text-white/45 sm:text-xs sm:tracking-[0.28em] md:text-sm'
            : 'text-xs tracking-[0.28em] text-white/50 sm:text-sm md:tracking-[0.32em]'
        }`}
      >
        {words.map((word, index) => (
          <motion.span
            key={word}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: [0.45, 1, 0.45], y: 0 }}
            transition={{
              opacity: { duration: 2.4, repeat: Infinity, delay: index * 0.55, ease: 'easeInOut' },
              y: { duration: 0.6, delay: 0.9 + index * 0.12, ease },
            }}
            className="inline-flex items-center"
          >
            {index > 0 && (
              <span aria-hidden className={`text-cyan-200/35 ${compact ? 'mx-1' : 'mx-2'}`}>
                ·
              </span>
            )}
            <span>{word}</span>
          </motion.span>
        ))}
      </div>

      {!compact && (
        <div className="mt-4 flex flex-col items-center gap-1" aria-hidden>
          {[0, 1, 2].map((chevron) => (
            <motion.span
              key={chevron}
              animate={reducedMotion ? undefined : { y: [0, 6, 0], opacity: [0.25, 0.85, 0.25] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: chevron * 0.18,
                ease: 'easeInOut',
              }}
              className="block h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-cyan-200/70"
            />
          ))}
        </div>
      )}

      {compact && (
        <motion.span
          aria-hidden
          animate={reducedMotion ? undefined : { y: [0, 4, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-2 block h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-cyan-200/50 sm:border-x-[6px] sm:border-t-[7px]"
        />
      )}
    </div>
  );
}
