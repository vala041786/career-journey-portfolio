'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { introCardShellClass, introCardWidthClass } from '../lib/introCard';
import { RoadwayPreview } from './RoadwayPreview';
import { ScrollPathCta } from './ScrollPathCta';
import { YouAreHereMarker } from './YouAreHereMarker';

const ease = [0.16, 1, 0.3, 1] as const;

type JourneyLaunchPadProps = {
  className?: string;
  mapMode?: boolean;
};

export function JourneyLaunchPad({ className = '', mapMode = false }: JourneyLaunchPadProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.9, ease }}
      className={`mx-auto flex flex-col items-center ${mapMode ? 'w-full max-w-md' : introCardWidthClass} ${className}`}
      aria-label="Journey starting point"
    >
      <div className={`mb-3 flex w-full items-center gap-3 px-1 ${mapMode ? 'justify-center' : 'justify-between'}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50 sm:text-sm md:text-base">
          You Are Here
        </p>
        {!mapMode && (
          <span className="text-[0.65rem] uppercase tracking-[0.24em] text-cyan-200/50">Start</span>
        )}
      </div>

      <YouAreHereMarker compact showLabel={false} />

      {!mapMode && (
        <>
          <div className="relative my-2 flex h-9 w-full max-w-[4.5rem] flex-col items-center">
            <motion.div
              aria-hidden
              className="h-full w-px bg-gradient-to-b from-cyan-200/45 via-cyan-200/15 to-transparent"
              animate={reducedMotion ? undefined : { scaleY: [0.8, 1, 0.8], opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
            />
            {!reducedMotion && (
              <motion.span
                aria-hidden
                className="absolute top-1 h-1.5 w-1.5 rounded-full bg-cyan-200/90 shadow-[0_0_10px_rgba(34,211,238,0.75)]"
                animate={{ y: [0, 24, 0], opacity: [0.3, 0.95, 0.3] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>

          <motion.article
            animate={
              reducedMotion
                ? undefined
                : {
                    boxShadow: [
                      '0 12px 40px rgba(34,211,238,0.1)',
                      '0 16px 48px rgba(34,211,238,0.16)',
                      '0 12px 40px rgba(34,211,238,0.1)',
                    ],
                  }
            }
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-full border-cyan-200/30 bg-gradient-to-br from-cyan-300/14 via-cyan-400/8 to-slate-900/30 px-4 py-4 ${introCardShellClass}`}
          >
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, 3, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <RoadwayPreview animated fullWidth />
            </motion.div>
          </motion.article>
        </>
      )}

      <ScrollPathCta compact className="mt-7 md:mt-8" />
    </motion.div>
  );
}
