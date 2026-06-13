'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { journeyItems } from '../data/journeyItems';
import { JourneyNode } from './JourneyNode';
import { JourneyTraveler } from './JourneyTraveler';
import { Roadway } from './Roadway';
import { useCompactView } from '../hooks/useCompactView';

type JourneySectionProps = {
  onFocusChange: (focused: boolean) => void;
};

export function JourneySection({ onFocusChange }: JourneySectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const stopCount = journeyItems.length;
  const isFocused = activeId !== null;
  const compactView = useCompactView();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);
  const pathOpacity = useTransform(smoothProgress, [0, 0.06, 1], [0.2, 0.85, 1]);

  useEffect(() => {
    onFocusChange(isFocused);
  }, [isFocused, onFocusChange]);

  const handleToggle = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <>
      <JourneyTraveler scrollProgress={smoothProgress} />

      <motion.section
        ref={containerRef}
        id="journey"
        className="relative pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative px-6 pb-6 pt-8 text-center md:pt-10 lg:pt-12"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70 md:text-sm lg:tracking-[0.4em]">Vaishali&apos;s Career Journey</p>
        </motion.div>

        <div className="journey-shell relative px-4 sm:px-6 md:px-8 lg:px-10">
          <div
            aria-hidden
            className="road-column pointer-events-none absolute inset-y-0 left-1/2 z-0 -translate-x-1/2"
          >
            <Roadway
              stopCount={stopCount}
              pathLength={pathLength}
              pathOpacity={pathOpacity}
            />
          </div>

          <div className="journey-milestones relative z-[2]">
            {journeyItems.map((item, index) => (
              <JourneyNode
                key={item.id}
                item={item}
                index={index}
                stopCount={stopCount}
                scrollProgress={smoothProgress}
                compactView={compactView}
                isActive={activeId === item.id}
                dimmed={isFocused && activeId !== item.id}
                onOpenDetails={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
