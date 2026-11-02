'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export type JourneyCameraMode = 'overview' | 'travel';

type JourneyStageProps = {
  mode: JourneyCameraMode;
  onModeChange: (mode: JourneyCameraMode) => void;
  children: ReactNode;
};

/** Stable SSR/client-initial camera — responsive tweaks apply only after mount. */
const SSR_OVERVIEW = { scale: 0.48, tilt: 58, panY: 56 } as const;
const TRAVEL_SCALE = 1;
/** Keep travel flat — any rotateX skews hit-testing away from visible labels. */
const TRAVEL_TILT = 0;
const MIN_SCALE = 0.34;
const MAX_SCALE = 1.08;
const PAN_LIMIT_X = 320;
const PAN_LIMIT_Y = 480;

function getOverviewDefaults() {
  const width = window.innerWidth;
  if (width < 640) return { scale: 0.36, tilt: 50, panY: 36 };
  if (width < 768) return { scale: 0.42, tilt: 54, panY: 44 };
  if (width < 1024) return { scale: 0.48, tilt: 58, panY: 56 };
  return { scale: 0.52, tilt: 60, panY: 64 };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function JourneyStage({ mode, onModeChange, children }: JourneyStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originPanX: number;
    originPanY: number;
  } | null>(null);
  const pinchRef = useRef<{ distance: number; scale: number } | null>(null);
  const panXValue = useRef(0);
  const panYValue = useRef(mode === 'overview' ? SSR_OVERVIEW.panY : 0);
  const scaleValue = useRef(mode === 'overview' ? SSR_OVERVIEW.scale : TRAVEL_SCALE);

  const panX = useMotionValue(0);
  const panY = useMotionValue(mode === 'overview' ? SSR_OVERVIEW.panY : 0);
  const scaleMv = useMotionValue(mode === 'overview' ? SSR_OVERVIEW.scale : TRAVEL_SCALE);
  const tilt = useMotionValue(mode === 'overview' ? SSR_OVERVIEW.tilt : TRAVEL_TILT);

  const springPanX = useSpring(panX, { stiffness: 120, damping: 26, mass: 0.8 });
  const springPanY = useSpring(panY, { stiffness: 120, damping: 26, mass: 0.8 });
  const springScale = useSpring(scaleMv, { stiffness: 140, damping: 28, mass: 0.7 });
  const springTilt = useSpring(tilt, { stiffness: 110, damping: 24, mass: 0.75 });

  const [hintVisible, setHintVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const applyCamera = useCallback(
    (next: JourneyCameraMode, useResponsiveOverview: boolean) => {
      if (next === 'overview') {
        const defaults = useResponsiveOverview ? getOverviewDefaults() : SSR_OVERVIEW;
        scaleValue.current = defaults.scale;
        panXValue.current = 0;
        panYValue.current = defaults.panY;
        scaleMv.set(defaults.scale);
        panX.set(0);
        panY.set(defaults.panY);
        tilt.set(defaults.tilt);
        return;
      }
      scaleValue.current = TRAVEL_SCALE;
      panXValue.current = 0;
      panYValue.current = 0;
      scaleMv.set(TRAVEL_SCALE);
      panX.set(0);
      panY.set(0);
      tilt.set(TRAVEL_TILT);
    },
    [panX, panY, scaleMv, tilt],
  );

  useEffect(() => {
    setHasMounted(true);
    applyCamera(mode, true);

    const onResize = () => {
      if (mode === 'overview' && !dragRef.current && !pinchRef.current) {
        applyCamera('overview', true);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [applyCamera, mode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mode === 'travel') {
        onModeChange('overview');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode, onModeChange]);

  useEffect(() => {
    setHintVisible(true);
    const timer = window.setTimeout(() => setHintVisible(false), 5600);
    return () => window.clearTimeout(timer);
  }, [mode]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyReduced = () => {
      if (!media.matches) return;
      tilt.set(0);
      if (mode === 'overview') {
        scaleValue.current = 0.62;
        scaleMv.set(0.62);
        panY.set(24);
      }
    };
    applyReduced();
    media.addEventListener('change', applyReduced);
    return () => media.removeEventListener('change', applyReduced);
  }, [mode, panY, scaleMv, tilt]);

  const applyScale = useCallback(
    (nextScale: number, originX?: number, originY?: number) => {
      const clamped = clamp(nextScale, MIN_SCALE, MAX_SCALE);
      const prev = scaleValue.current || SSR_OVERVIEW.scale;
      scaleValue.current = clamped;
      scaleMv.set(clamped);

      if (originX != null && originY != null && stageRef.current) {
        const rect = stageRef.current.getBoundingClientRect();
        const cx = originX - rect.left - rect.width / 2;
        const cy = originY - rect.top - rect.height / 2;
        const ratio = clamped / prev;
        panXValue.current = clamp(panXValue.current * ratio + cx * (1 - ratio), -PAN_LIMIT_X, PAN_LIMIT_X);
        panYValue.current = clamp(panYValue.current * ratio + cy * (1 - ratio), -PAN_LIMIT_Y, PAN_LIMIT_Y);
        panX.set(panXValue.current);
        panY.set(panYValue.current);
      }

      if (clamped >= 0.9 && mode === 'overview') {
        onModeChange('travel');
      }
    },
    [mode, onModeChange, panX, panY, scaleMv],
  );

  useEffect(() => {
    const node = stageRef.current;
    if (!node || mode !== 'overview') return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (event.ctrlKey || event.metaKey) {
        const zoomFactor = Math.exp(-event.deltaY * 0.0015);
        applyScale(scaleValue.current * zoomFactor, event.clientX, event.clientY);
        return;
      }
      panXValue.current = clamp(panXValue.current - event.deltaX, -PAN_LIMIT_X, PAN_LIMIT_X);
      panYValue.current = clamp(panYValue.current - event.deltaY, -PAN_LIMIT_Y, PAN_LIMIT_Y);
      panX.set(panXValue.current);
      panY.set(panYValue.current);
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [applyScale, mode, panX, panY]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (mode !== 'overview') return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest('button, a, input, textarea, select, [role="button"], .journey-pin, .journey-pin-label')) {
      return;
    }
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originPanX: panXValue.current,
      originPanY: panYValue.current,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (mode !== 'overview' || !dragRef.current) return;
    if (event.pointerId !== dragRef.current.pointerId) return;
    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;
    panXValue.current = clamp(dragRef.current.originPanX + dx, -PAN_LIMIT_X, PAN_LIMIT_X);
    panYValue.current = clamp(dragRef.current.originPanY + dy, -PAN_LIMIT_Y, PAN_LIMIT_Y);
    panX.set(panXValue.current);
    panY.set(panYValue.current);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || event.pointerId !== dragRef.current.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (mode !== 'overview' || event.touches.length !== 2) {
      pinchRef.current = null;
      return;
    }
    const [a, b] = [event.touches[0], event.touches[1]];
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    pinchRef.current = { distance, scale: scaleValue.current };
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (mode !== 'overview' || event.touches.length !== 2 || !pinchRef.current) return;
    event.preventDefault();
    const [a, b] = [event.touches[0], event.touches[1]];
    const distance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    const midX = (a.clientX + b.clientX) / 2;
    const midY = (a.clientY + b.clientY) / 2;
    const next = pinchRef.current.scale * (distance / Math.max(1, pinchRef.current.distance));
    applyScale(next, midX, midY);
  };

  const onTouchEnd = () => {
    pinchRef.current = null;
  };

  const mapTransform = useTransform(
    [springPanX, springPanY, springScale, springTilt],
    ([x, y, s, r]) => `translate3d(${x}px, ${y}px, 0) rotateX(${r}deg) scale(${s})`,
  );

  return (
    <div
      className={`journey-stage relative ${
        mode === 'overview' ? 'journey-stage--overview' : 'journey-stage--travel'
      }`}
    >
      <div className="journey-stage-chrome pointer-events-none absolute inset-x-0 top-0 z-40 flex flex-col items-center gap-2.5 px-4 pt-1">
        {mode === 'overview' && (
          <p className="journey-stage-caption max-w-lg text-center text-[0.7rem] tracking-[0.04em] text-white/55 sm:text-xs">
            15+ years · AI product · 3 continents
          </p>
        )}

        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-[#0c1018]/85 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => onModeChange('overview')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
              mode === 'overview' ? 'bg-cyan-300/20 text-cyan-100' : 'text-white/55 hover:text-white/85'
            }`}
            aria-pressed={mode === 'overview'}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => onModeChange('travel')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition ${
              mode === 'travel' ? 'bg-cyan-300/20 text-cyan-100' : 'text-white/55 hover:text-white/85'
            }`}
            aria-pressed={mode === 'travel'}
          >
            Travel
          </button>
        </div>

        {hintVisible && (
          <p className="journey-stage-hint max-w-md text-center text-[0.65rem] uppercase tracking-[0.18em] text-white/45 sm:text-xs">
            {mode === 'overview'
              ? 'Drag to pan · Click a pin to travel'
              : 'Scroll to travel · Esc or Overview for the map'}
          </p>
        )}
      </div>

      <div
        ref={stageRef}
        className="journey-stage-viewport"
        onPointerDown={mode === 'overview' ? onPointerDown : undefined}
        onPointerMove={mode === 'overview' ? onPointerMove : undefined}
        onPointerUp={mode === 'overview' ? endDrag : undefined}
        onPointerCancel={mode === 'overview' ? endDrag : undefined}
        onTouchStart={mode === 'overview' ? onTouchStart : undefined}
        onTouchMove={mode === 'overview' ? onTouchMove : undefined}
        onTouchEnd={mode === 'overview' ? onTouchEnd : undefined}
        style={{
          cursor: mode === 'overview' ? (isDragging ? 'grabbing' : 'grab') : 'auto',
          touchAction: mode === 'overview' ? 'none' : 'pan-y',
        }}
      >
        <motion.div
          className={mode === 'travel' ? 'journey-stage-map journey-stage-map--travel' : 'journey-stage-map'}
          style={
            hasMounted
              ? { transform: mapTransform }
              : {
                  transform:
                    mode === 'overview'
                      ? `translate3d(0px, ${SSR_OVERVIEW.panY}px, 0) rotateX(${SSR_OVERVIEW.tilt}deg) scale(${SSR_OVERVIEW.scale})`
                      : 'translate3d(0px, 0px, 0) rotateX(0deg) scale(1)',
                }
          }
          suppressHydrationWarning
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
