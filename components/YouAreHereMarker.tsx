'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useId } from 'react';

type YouAreHereMarkerProps = {
  className?: string;
  compact?: boolean;
  showLabel?: boolean;
};

/** Map-style starting pin with a person silhouette inside the badge. */
export function YouAreHereMarker({
  className = '',
  compact = false,
  showLabel = true,
}: YouAreHereMarkerProps) {
  const reducedMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const pinGlowId = `pin-glow-${uid}`;
  const pinShineId = `pin-shine-${uid}`;
  const badgeGlowId = `badge-glow-${uid}`;

  const sizeClass = compact
    ? 'relative -mt-0.5 h-[5.5rem] w-[4rem] sm:h-[6rem] sm:w-[4.35rem] md:h-[6.75rem] md:w-[4.85rem]'
    : 'relative -mt-0.5 h-[7.75rem] w-[5.6rem] md:h-[9.25rem] md:w-[6.65rem]';

  const pulseClass = compact
    ? 'bottom-3 h-14 w-14 sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]'
    : 'bottom-6 h-20 w-20 md:bottom-8 md:h-24 md:w-24';

  return (
    <motion.div
      animate={reducedMotion ? undefined : { y: [0, compact ? -4 : -6, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      className={`relative flex flex-col items-center ${className}`}
    >
      {!reducedMotion && (
        <>
          <motion.span
            aria-hidden
            className={`absolute rounded-full border border-cyan-200/25 ${pulseClass}`}
            animate={{ scale: [0.75, 1.35], opacity: [0.45, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            aria-hidden
            className={`absolute rounded-full border border-cyan-200/15 ${pulseClass}`}
            animate={{ scale: [0.75, 1.55], opacity: [0.3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 0.55 }}
          />
        </>
      )}

      {showLabel && (
        <>
          <motion.div
            animate={
              reducedMotion
                ? undefined
                : {
                    boxShadow: [
                      '0 0 20px rgba(34,211,238,0.15)',
                      '0 0 32px rgba(34,211,238,0.35)',
                      '0 0 20px rgba(34,211,238,0.15)',
                    ],
                  }
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 mb-1 rounded-md border border-cyan-200/35 bg-[#0c1018]/95 px-3 py-1.5 md:px-4 md:py-2"
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-100 md:text-xs">
              You are here
            </p>
          </motion.div>

          <motion.span
            aria-hidden
            animate={reducedMotion ? undefined : { y: [0, 2, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative -mt-px block h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent border-t-cyan-200/35"
          />
        </>
      )}

      <motion.svg
        aria-hidden
        viewBox="0 0 120 176"
        animate={reducedMotion ? undefined : { rotate: [-1.25, 1.25, -1.25] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '60px 54px' }}
        className={sizeClass}
        fill="none"
      >
        <ellipse cx="60" cy="168" rx="16" ry="4.5" fill="rgba(0,0,0,0.42)" />

        <path
          d="M60 8 C34 8 14 30 14 56c0 22 46 104 46 104s46-82 46-104C106 30 86 8 60 8z"
          fill="#A16207"
          transform="translate(0, 1.5)"
          opacity={0.35}
        />

        <path
          d="M60 8 C34 8 14 30 14 56c0 22 46 104 46 104s46-82 46-104C106 30 86 8 60 8z"
          fill={`url(#${pinGlowId})`}
          stroke="#B45309"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        <path
          d="M60 8 C34 8 14 30 14 56c0 22 46 104 46 104s46-82 46-104C106 30 86 8 60 8z"
          fill={`url(#${pinShineId})`}
          opacity={0.55}
        />

        <circle
          cx="60"
          cy="54"
          r="31"
          fill="#05080f"
          stroke="rgba(34,211,238,0.45)"
          strokeWidth="2"
        />
        <circle cx="60" cy="54" r="31" fill={`url(#${badgeGlowId})`} />
        <circle cx="60" cy="54" r="27.5" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        <motion.g
          animate={reducedMotion ? undefined : { y: [0, -1.25, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          fill="#F8FAFC"
        >
          <circle cx="60" cy="37" r="7.2" />
          <path d="M60 45.5 C49.5 45.5 42.5 50.5 41 57.5 C40 61.5 40.8 64.8 42.8 67.5 L45.5 72.5 H51.5 L53 67 H67 L68.5 72.5 H74.5 L77.2 67.5 C79.2 64.8 80 61.5 79 57.5 C77.5 50.5 70.5 45.5 60 45.5 Z" />
          <path d="M44.5 56.5 C41.5 58.2 39.5 61 38.5 64.2 L42.5 65.5 C43.2 63.2 44.8 61.5 47 60.5 Z" />
          <path d="M75.5 56.5 C78.5 58.2 80.5 61 81.5 64.2 L77.5 65.5 C76.8 63.2 75.2 61.5 73 60.5 Z" />
        </motion.g>

        <circle cx="48" cy="30" r="5" fill="rgba(255,255,255,0.28)" opacity={0.7} />

        <defs>
          <radialGradient id={pinGlowId} cx="42%" cy="24%" r="72%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="55%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </radialGradient>
          <linearGradient id={pinShineId} x1="28" y1="18" x2="78" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={badgeGlowId} cx="50%" cy="32%" r="68%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.22)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>
      </motion.svg>

      <span className="sr-only">You are here — starting point</span>
    </motion.div>
  );
}
