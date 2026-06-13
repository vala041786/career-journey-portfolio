'use client';

import { motion } from 'framer-motion';

import { HeroIdentity } from './HeroIdentity';
import { JourneyLaunchPad } from './JourneyLaunchPad';
import { LandingMap } from './LandingMap';
import { RecognitionScroller } from './RecognitionScroller';

export function Intro() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
      <LandingMap className="w-full max-w-6xl">
        <RecognitionScroller
          variant="legend"
          className="pointer-events-auto absolute right-3 top-3 z-30 sm:right-5 sm:top-5 md:right-8 md:top-8"
        />

        <div className="relative z-10 flex min-h-[min(88vh,52rem)] flex-col items-center justify-center px-5 py-12 sm:px-8 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            <HeroIdentity centered />
          </motion.div>

          <JourneyLaunchPad mapMode className="mt-8 md:mt-10" />
        </div>
      </LandingMap>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.8 }}
        className="absolute bottom-6 md:bottom-8"
        aria-hidden
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-12 w-px bg-gradient-to-b from-cyan-200/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}
