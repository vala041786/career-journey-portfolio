'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion';

import { journeyItems } from '../data/journeyItems';
import { JourneyNode } from './JourneyNode';
import { JourneyStage, type JourneyCameraMode } from './JourneyStage';
import { JourneyTraveler } from './JourneyTraveler';
import { Roadway } from './Roadway';
import { useCompactView } from '../hooks/useCompactView';

type JourneySectionProps = {
  onFocusChange: (focused: boolean) => void;
};

function scrollToJourneyStop(id: string) {
  const node = document.querySelector<HTMLElement>(`[data-journey-id="${CSS.escape(id)}"]`);
  node?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function JourneySection({ onFocusChange }: JourneySectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [cameraMode, setCameraMode] = useState<JourneyCameraMode>('travel');
  const stopCount = journeyItems.length;
  const isFocused = activeId !== null;
  const compactView = useCompactView();
  const isTravel = cameraMode === 'travel';
  const isOverview = cameraMode === 'overview';
  const journeyInView = useInView(containerRef, { amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);
  const pathOpacity = useTransform(smoothProgress, [0, 0.06, 1], [0.2, 0.85, 1]);

  useEffect(() => {
    onFocusChange(isFocused && isTravel);
  }, [isFocused, isTravel, onFocusChange]);

  useEffect(() => {
    const shouldLock = isOverview && journeyInView;
    document.documentElement.classList.toggle('journey-overview-lock', shouldLock);
    return () => document.documentElement.classList.remove('journey-overview-lock');
  }, [isOverview, journeyInView]);

  const handleModeChange = useCallback((mode: JourneyCameraMode) => {
    setCameraMode(mode);
    if (mode === 'overview') {
      setActiveId(null);
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handlePinSelect = useCallback((id: string) => {
    setCameraMode('travel');
    setActiveId(id);
    window.setTimeout(() => scrollToJourneyStop(id), 120);
  }, []);

  const handleToggle = useCallback(
    (id: string) => {
      if (!isTravel) {
        handlePinSelect(id);
        return;
      }
      setActiveId((current) => (current === id ? null : id));
    },
    [handlePinSelect, isTravel],
  );

  return (
    <>
      <JourneyTraveler
        scrollProgress={smoothProgress}
        stopCount={stopCount}
        visible={isTravel}
      />

      <motion.section
        ref={containerRef}
        id="journey"
        className={`relative pb-24 ${isTravel ? '' : 'journey-section--overview'}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative z-40 px-6 pb-2 pt-8 text-center md:pt-10 lg:pt-12"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/70 md:text-sm lg:tracking-[0.4em]">
            Vaishali&apos;s Career Journey
          </p>
        </motion.div>

        <JourneyStage mode={cameraMode} onModeChange={handleModeChange}>
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

            <div
              className={`journey-milestones relative z-[2] ${
                isTravel ? '' : 'journey-milestones--overview'
              }`}
            >
              {journeyItems.map((item, index) => (
                <JourneyNode
                  key={item.id}
                  item={item}
                  index={index}
                  stopCount={stopCount}
                  scrollProgress={smoothProgress}
                  compactView={compactView || isOverview}
                  overviewMode={isOverview}
                  isActive={isTravel && activeId === item.id}
                  dimmed={isTravel && isFocused && activeId !== item.id}
                  onOpenDetails={() => handleToggle(item.id)}
                  onPinSelect={() => handlePinSelect(item.id)}
                />
              ))}
            </div>
          </div>
        </JourneyStage>
      </motion.section>
    </>
  );
}
