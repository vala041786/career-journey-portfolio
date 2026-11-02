'use client';

import { useEffect, useState } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

import { getTravelerXOffset } from '../lib/roadway';
import { TravelerFigure } from './TravelerFigure';

type JourneyTravelerProps = {
  scrollProgress: MotionValue<number>;
  stopCount: number;
  visible?: boolean;
};

function measureRoadColumnWidthPx(): number {
  if (typeof window === 'undefined') return 112;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--road-col').trim();
  const probe = document.createElement('div');
  probe.style.width = raw || '7rem';
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  document.body.appendChild(probe);
  const width = probe.getBoundingClientRect().width || 112;
  probe.remove();
  return width;
}

export function JourneyTraveler({ scrollProgress, stopCount, visible = true }: JourneyTravelerProps) {
  const [columnWidthPx, setColumnWidthPx] = useState(112);
  const scrollOpacity = useTransform(scrollProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);
  const opacity = useTransform(scrollOpacity, (value) => (visible ? value : 0));
  const scale = useTransform(scrollProgress, [0, 0.06], [0.85, 1]);
  const x = useTransform(scrollProgress, (progress) =>
    getTravelerXOffset(progress, stopCount, columnWidthPx),
  );

  useEffect(() => {
    const update = () => setColumnWidthPx(measureRoadColumnWidthPx());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <motion.div
      style={{ opacity, scale, x }}
      className="journey-traveler pointer-events-none fixed left-1/2 top-[36vh] z-30 -translate-x-1/2 sm:top-[38vh] md:top-[40vh] lg:top-[42vh]"
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex flex-col items-center"
      >
        <TravelerFigure />
        {/* Direction — moving forward on the road */}
        <motion.span
          animate={{ opacity: [0.35, 0.7, 0.35], y: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-1 block h-4 w-px bg-gradient-to-b from-cyan-200/80 to-transparent"
        />
      </motion.div>
      <span className="sr-only">You are traveling through the journey</span>
    </motion.div>
  );
}
