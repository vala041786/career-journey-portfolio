'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { RoadwayRectImage } from './RoadwayRectImage';

type RoadwayPreviewProps = {
  animated?: boolean;
  fullWidth?: boolean;
};

/** Rectangular earth tile with roadway below the landing “You are here” marker. */
export function RoadwayPreview({ animated = false, fullWidth = false }: RoadwayPreviewProps) {
  const reducedMotion = useReducedMotion();
  const shouldAnimate = animated && !reducedMotion;

  return (
    <div
      className={`roadway-preview relative mx-auto overflow-hidden rounded-lg ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      <motion.div
        animate={shouldAnimate ? { y: [0, 4, 0] } : undefined}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <RoadwayRectImage
          idPrefix="preview-road"
          animated={shouldAnimate}
          className={
            fullWidth
              ? 'roadway-preview__image h-[6.75rem] w-full opacity-95'
              : 'roadway-preview__image h-36 w-[7.5rem] opacity-95 sm:h-40 sm:w-[8.5rem] md:h-48 md:w-40 lg:h-56 lg:w-44'
          }
        />
      </motion.div>

      {shouldAnimate && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-6 bg-gradient-to-b from-cyan-200/25 to-transparent"
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}
