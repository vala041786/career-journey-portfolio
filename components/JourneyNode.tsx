'use client';

import { useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform, type MotionValue, type Variants } from 'framer-motion';
import type { JourneyItem } from '../data/journeyItems';
import { useTravelerProximity, MIN_STOP_REVEAL_SCALE } from '../hooks/useTravelerProximityGlow';
import { getDetailsSide } from '../lib/roadway';
import { getJourneyTitleColor } from '../lib/journeyColors';

type JourneyNodeProps = {
  item: JourneyItem;
  index: number;
  stopCount?: number;
  scrollProgress?: MotionValue<number>;
  compactView?: boolean;
  isActive: boolean;
  dimmed: boolean;
  onOpenDetails: () => void;
};

const panelVariants: Variants = {
  hidden: { opacity: 0, x: -20, height: 0 },
  visible: {
    opacity: 1,
    x: 0,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    x: -12,
    height: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

const panelVariantsRight: Variants = {
  hidden: { opacity: 0, x: 20, height: 0 },
  visible: {
    opacity: 1,
    x: 0,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    x: 12,
    height: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

const detailItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

function useMilestoneScrollEffects(
  index: number,
  stopCount: number | undefined,
  scrollProgress: MotionValue<number> | undefined,
  fallbackProgress: MotionValue<number>,
) {
  const progress = scrollProgress ?? fallbackProgress;

  const travelOpacity = useTransform(progress, (p) => {
    if (!scrollProgress || !stopCount) return 1;
    const leg = p * Math.max(1, stopCount - 1);
    const delta = index - leg;
    if (delta < -1.4) return 0.62;
    if (delta < 0) return 0.72 + (1 + delta / 1.4) * 0.22;
    if (delta < 0.55) return 1;
    return Math.max(0.68, 0.9 - delta * 0.12);
  });

  const glowIntensity = useTransform(progress, (p) => {
    if (!scrollProgress || !stopCount) return 0;
    const leg = p * Math.max(1, stopCount - 1);
    const delta = Math.abs(index - leg);
    const outer = 1.05;
    const inner = 0.42;
    if (delta > outer) return 0;
    if (delta <= inner) return 1;
    return 1 - ((delta - inner) / (outer - inner)) * 0.5;
  });

  /** 0 = far ahead (small dot), 1 = at / past traveler (full size). */
  const scrollApproach = useTransform(progress, (p) => {
    if (!scrollProgress || !stopCount) return 1;
    const leg = p * Math.max(1, stopCount - 1);
    const delta = index - leg;
    if (delta <= 0) return 1;
    const approachSpan = 2.6;
    if (delta >= approachSpan) return 0;
    const t = 1 - delta / approachSpan;
    return t < 0.45 ? (t / 0.45) * 0.65 : 0.65 + ((t - 0.45) / 0.55) * 0.35;
  });

  return { travelOpacity, glowIntensity, scrollApproach };
}

export function JourneyNode({
  item,
  index,
  stopCount,
  scrollProgress,
  compactView = false,
  isActive,
  dimmed,
  onOpenDetails,
}: JourneyNodeProps) {
  const detailsSide = getDetailsSide(index);
  const detailsOnRight = detailsSide === 'right';
  const titleColor = getJourneyTitleColor(index);
  const fallbackProgress = useMotionValue(0);
  const stopRef = useRef<HTMLDivElement>(null);
  const { glow: proximityGlow, reveal: proximityReveal } = useTravelerProximity(stopRef);
  const { travelOpacity, glowIntensity: scrollGlow, scrollApproach } = useMilestoneScrollEffects(
    index,
    stopCount,
    scrollProgress,
    fallbackProgress,
  );

  const revealProgress = useTransform([scrollApproach, proximityReveal], ([scrollR, proxR]) =>
    Math.max(Number(scrollR ?? 0), Number(proxR ?? 0)),
  );

  const glowIntensity = useTransform([scrollGlow, proximityGlow, revealProgress], ([scrollG, proxG, reveal]) => {
    const r = Number(reveal ?? 0);
    const peak = Math.max(Number(scrollG ?? 0), Number(proxG ?? 0));
    return peak * (0.12 + r * 0.88);
  });

  const stopSizeScale = useTransform(revealProgress, (r) =>
    MIN_STOP_REVEAL_SCALE + Number(r) * (1 - MIN_STOP_REVEAL_SCALE),
  );

  const stopPulseScale = useTransform(glowIntensity, (g) => 1 + Number(g) * 0.08);
  const finalStopScale = useTransform([stopSizeScale, stopPulseScale], ([size, pulse]) =>
    Number(size) * Number(pulse),
  );

  const stopShadow = useTransform(glowIntensity, (g) => {
    const gv = Number(g);
    return `0 0 0 ${2 + gv * 4}px rgba(34,211,238,${0.08 + gv * 0.2}), 0 0 ${12 + gv * 32}px rgba(34,211,238,${0.1 + gv * 0.5}), 0 0 ${gv * 44}px rgba(139,92,246,${gv * 0.28})`;
  });

  const midRingOpacity = useTransform(glowIntensity, (g) => Number(g) * 0.75);
  const ringScale = useTransform([stopSizeScale, glowIntensity], ([size, g]) =>
    Number(size) * (0.85 + Number(g) * 0.2),
  );
  const symbolOpacity = useTransform(revealProgress, (r) => (Number(r) < 0.22 ? 0 : (Number(r) - 0.22) / 0.78));
  const symbolScale = useTransform(revealProgress, (r) => 0.5 + Number(r) * 0.5);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={dimmed || !scrollProgress || compactView ? undefined : { opacity: travelOpacity }}
      animate={dimmed ? { opacity: 0.35 } : scrollProgress && !compactView ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.55, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className={`journey-node scroll-section journey-grid relative ${
        isActive ? 'min-h-[calc(var(--milestone-min-h)+6vh)]' : ''
      }`}
    >
      {/* Scroll glow backdrop when this milestone is on screen */}
      <motion.div
        aria-hidden
        style={{ opacity: glowIntensity }}
        className={`pointer-events-none absolute inset-3 -z-10 rounded-3xl bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/8 blur-xl sm:inset-4 md:inset-6 lg:inset-8 ${
          detailsOnRight ? 'left-[5%] right-[38%] lg:left-[8%] lg:right-[35%]' : 'left-[38%] right-[5%] lg:left-[35%] lg:right-[8%]'
        }`}
      />

      {/* Left — title always visible; details on click */}
      <div className="col-start-1 relative z-20">
        {!detailsOnRight && (
          <MilestoneSide
            item={item}
            align="left"
            titleColor={titleColor}
            glowIntensity={glowIntensity}
            isActive={isActive}
            onOpenDetails={onOpenDetails}
            panelVariants={panelVariants}
            detailItemVariants={detailItemVariants}
          />
        )}
      </div>

      {/* Center — stop + glow rings clipped to road column */}
      <div ref={stopRef} className="journey-stop-column col-start-2 relative z-10 flex justify-center">
        <div className="relative flex items-center justify-center">
          <motion.div
            aria-hidden
            style={{ opacity: glowIntensity, scale: ringScale }}
            className="pointer-events-none absolute -inset-7 rounded-full border border-cyan-300/20 sm:-inset-8 md:-inset-8 lg:-inset-10 xl:-inset-11"
          />
          <motion.div
            aria-hidden
            style={{ opacity: midRingOpacity, scale: ringScale }}
            className="pointer-events-none absolute -inset-5 rounded-full border-2 border-cyan-300/30 shadow-[0_0_40px_rgba(34,211,238,0.25)] sm:-inset-6 md:-inset-6 lg:-inset-8 xl:-inset-9"
          />
          <motion.div
            aria-hidden
            style={{ opacity: glowIntensity, scale: stopSizeScale }}
            className="pointer-events-none absolute -inset-3 rounded-full bg-cyan-400/10 blur-md sm:-inset-4 md:-inset-4"
          />

          <motion.button
            type="button"
            onClick={onOpenDetails}
            aria-expanded={isActive}
            aria-label={`${item.title} — ${isActive ? 'close details' : 'view details'}`}
            style={{
              scale: isActive ? undefined : finalStopScale,
              boxShadow: isActive
                ? '0 0 0 4px rgba(34,211,238,0.2), 0 0 28px rgba(34,211,238,0.45)'
                : stopShadow,
            }}
            whileTap={{ scale: 0.92 }}
            animate={{
              scale: isActive ? 1.12 : undefined,
              borderColor: isActive ? 'rgba(34,211,238,0.85)' : 'rgba(255,255,255,0.18)',
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className={`pathway-stop pathway-stop-size relative flex shrink-0 items-center justify-center rounded-full border-2 bg-[#0c1018] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 ${
              isActive ? 'bg-white/[0.09]' : 'hover:border-cyan-200/40'
            }`}
          >
            <motion.span
              aria-hidden
              style={{ opacity: glowIntensity }}
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/25 via-transparent to-violet-400/15"
            />
            <motion.span
              aria-hidden
              style={{ opacity: symbolOpacity, scale: symbolScale }}
              className="stop-symbol relative block origin-center"
            >
              {item.symbol}
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Right — title always visible; details on click */}
      <div className="col-start-3 relative z-20">
        {detailsOnRight && (
          <MilestoneSide
            item={item}
            align="right"
            titleColor={titleColor}
            glowIntensity={glowIntensity}
            isActive={isActive}
            onOpenDetails={onOpenDetails}
            panelVariants={panelVariantsRight}
            detailItemVariants={detailItemVariants}
          />
        )}
      </div>

      {/* Mobile — title on scroll; details on click */}
      <div className="col-span-3 md:hidden">
        <MilestoneTitle
          item={item}
          align="center"
          titleColor={titleColor}
          glowIntensity={glowIntensity}
          isActive={isActive}
          onOpenDetails={onOpenDetails}
        />
        {isActive && (
          <div className="mt-4">
            <DetailCard
              item={item}
              align="center"
              titleColor={titleColor}
              detailItemVariants={detailItemVariants}
              showMeta
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}

type MilestoneSideProps = {
  item: JourneyItem;
  align: 'left' | 'right';
  titleColor: ReturnType<typeof getJourneyTitleColor>;
  glowIntensity: MotionValue<number>;
  isActive: boolean;
  onOpenDetails: () => void;
  panelVariants: Variants;
  detailItemVariants: Variants;
};

function MilestoneSide({
  item,
  align,
  titleColor,
  glowIntensity,
  isActive,
  onOpenDetails,
  panelVariants,
  detailItemVariants,
}: MilestoneSideProps) {
  const alignClass = align === 'left' ? 'text-left' : 'text-right';

  return (
    <div className={`hidden md:block ${alignClass} milestone-side-panel milestone-side-panel--${align}`}>
      <motion.div style={{ opacity: glowIntensity }} className="milestone-label-glow rounded-2xl p-3">
        <MilestoneTitle
          item={item}
          align={align}
          titleColor={titleColor}
          glowIntensity={glowIntensity}
          isActive={isActive}
          onOpenDetails={onOpenDetails}
        />
      </motion.div>

      <AnimatePresence initial={false} mode="wait">
        {isActive && (
          <motion.div
            key="details"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <DetailCard
              item={item}
              align={align}
              titleColor={titleColor}
              detailItemVariants={detailItemVariants}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type MilestoneTitleProps = {
  item: JourneyItem;
  align: 'left' | 'right' | 'center';
  titleColor: ReturnType<typeof getJourneyTitleColor>;
  glowIntensity: MotionValue<number>;
  isActive: boolean;
  onOpenDetails: () => void;
};

function MilestoneTitle({ item, align, titleColor, glowIntensity, isActive, onOpenDetails }: MilestoneTitleProps) {
  const alignClass =
    align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right';

  const titleShadow = useTransform(glowIntensity, (g) => {
    const gv = Number(g);
    if (gv <= 0.05) return 'none';
    return `0 0 ${8 + gv * 24}px rgba(${titleColor.glowRgb}, ${0.25 + gv * 0.45})`;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'right' ? 20 : align === 'left' ? -20 : 0, y: align === 'center' ? 12 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const }}
      className={alignClass}
    >
      <motion.button
        type="button"
        onClick={onOpenDetails}
        aria-expanded={isActive}
        className={`group w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/60 ${alignClass}`}
      >
        <motion.h2
          style={{ textShadow: titleShadow }}
          className={`milestone-title font-semibold transition ${titleColor.colorClass} ${titleColor.hoverClass} ${
            isActive ? 'brightness-110' : ''
          }`}
        >
          {item.title}
        </motion.h2>
        {item.meta && (
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">{item.meta}</p>
        )}
        <p className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-white/30 transition group-hover:text-white/50">
          {isActive ? 'Click to close' : 'Click to see more'}
        </p>
      </motion.button>
    </motion.div>
  );
}

type DetailCardProps = {
  item: JourneyItem;
  align: 'left' | 'right' | 'center';
  titleColor: ReturnType<typeof getJourneyTitleColor>;
  detailItemVariants: Variants;
  showMeta?: boolean;
};

function isDescriptionRedundant(title: string, description: string): boolean {
  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9\s+]/g, '').replace(/\s+/g, ' ').trim();

  const normalizedTitle = normalize(title);
  const normalizedDescription = normalize(description);

  if (!normalizedTitle || !normalizedDescription) return false;
  if (normalizedDescription.includes(normalizedTitle)) return true;
  if (normalizedTitle.includes(normalizedDescription)) return true;

  const titleTokens = normalizedTitle.split(' ').filter((token) => token.length > 2);
  const descriptionTokens = normalizedDescription.split(' ').filter((token) => token.length > 2);

  if (titleTokens.length === 0 || descriptionTokens.length === 0) return false;

  const shared = descriptionTokens.filter((token) => titleTokens.includes(token)).length;
  return shared / descriptionTokens.length >= 0.65;
}

function DetailCard({ item, align, titleColor, detailItemVariants, showMeta = false }: DetailCardProps) {
  const showDescription = Boolean(
    item.description && !isDescriptionRedundant(item.title, item.description),
  );
  const showMetaLine = Boolean((showMeta || align === 'center') && item.meta);
  const hasContent =
    showMetaLine ||
    showDescription ||
    Boolean(item.impact) ||
    (item.tags?.length ?? 0) > 0 ||
    (item.recognitions?.length ?? 0) > 0 ||
    (item.links?.length ?? 0) > 0;

  if (!hasContent) return null;

  const panelGlow = `0 0 0 1px rgba(${titleColor.glowRgb}, 0.14), 0 24px 48px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)`;

  return (
    <motion.div
      variants={detailItemVariants}
      initial="hidden"
      animate="visible"
      style={{ boxShadow: panelGlow }}
      className={`journey-detail-panel mt-4 rounded-2xl border bg-[#0c1018]/95 p-5 text-center md:rounded-3xl md:p-6 lg:p-8 ${titleColor.borderClass}`}
    >
      {showMetaLine && item.meta && (
        <motion.p variants={detailItemVariants} className={`text-sm font-medium ${titleColor.colorClass}`}>
          {item.meta}
        </motion.p>
      )}
      {showDescription && item.description && (
        <motion.p
          variants={detailItemVariants}
          className={`mx-auto max-w-prose leading-7 text-white/90 lg:text-lg lg:leading-8 ${showMetaLine ? 'mt-3' : ''}`}
        >
          {item.description}
        </motion.p>
      )}
      {item.impact && (
        <motion.p
          variants={detailItemVariants}
          className={`mx-auto mt-4 max-w-prose rounded-2xl p-4 text-sm ${titleColor.impactBgClass} ${titleColor.impactTextClass}`}
        >
          {item.impact}
        </motion.p>
      )}
      {item.tags && item.tags.length > 0 && (
        <motion.div
          variants={detailItemVariants}
          className="mt-4 flex flex-nowrap items-center justify-center gap-1.5 overflow-x-auto"
        >
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`shrink-0 whitespace-nowrap rounded-full border px-2 py-0.5 text-[0.625rem] sm:text-[0.65rem] ${titleColor.borderClass} ${titleColor.colorClass}`}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      )}
      {item.recognitions && item.recognitions.length > 0 && (
        <motion.ul
          variants={detailItemVariants}
          className="mt-4 max-h-[min(24rem,55vh)] space-y-2 overflow-y-auto text-left [scrollbar-width:thin]"
        >
          {item.recognitions.map((recognition) => (
            <motion.li
              key={recognition.label}
              variants={detailItemVariants}
              className="flex items-center justify-center gap-2.5 px-1 py-1.5"
            >
              <span aria-hidden className="shrink-0 text-sm">
                {recognition.symbol}
              </span>
              <span className="min-w-0 flex-1 text-center text-[0.7rem] leading-snug text-white/85 sm:text-xs">
                {recognition.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      )}
      {item.links && item.links.length > 0 && (
        <motion.div
          variants={detailItemVariants}
          className="mt-5 flex flex-wrap justify-center gap-3"
        >
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-200/40 hover:bg-white/10"
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
