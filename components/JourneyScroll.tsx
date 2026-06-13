'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { journeyItems } from '../data/journeyItems';
import { JourneyNode } from './JourneyNode';

export function JourneyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const pathY = useTransform(smoothProgress, [0, 1], ['0%', '100%']);
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  const handleToggle = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section ref={containerRef} id="journey" className="relative pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-200/20 to-transparent" />
        <motion.div
          style={{ height: pathY }}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-200/80 to-violet-400/60"
        />
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden h-full w-40 -translate-x-1/2 md:block"
        viewBox="0 0 160 1200"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M80 0 C120 120 40 240 80 360 C120 480 40 600 80 720 C120 840 40 960 80 1080 C120 1140 60 1180 80 1200"
          fill="none"
          stroke="url(#journey-wave)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength, opacity: 0.45 }}
        />
        <defs>
          <linearGradient id="journey-wave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.8)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.6)" />
          </linearGradient>
        </defs>
      </svg>

      {journeyItems.map((item, index) => (
        <JourneyNode
          key={item.id}
          item={item}
          index={index}
          isActive={activeId === item.id}
          dimmed={activeId !== null && activeId !== item.id}
          onOpenDetails={() => handleToggle(item.id)}
        />
      ))}
    </section>
  );
}
