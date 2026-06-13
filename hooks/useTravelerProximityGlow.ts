'use client';

import { useEffect, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

/** Viewport Y of the fixed journey traveler — keep in sync with JourneyTraveler top offsets. */
export function getTravelerAnchorY(): number {
  const vh = window.innerHeight / 100;
  let topVh = 36;
  if (window.innerWidth >= 1024) topVh = 42;
  else if (window.innerWidth >= 768) topVh = 40;
  else if (window.innerWidth >= 640) topVh = 38;

  const travelerEl = document.querySelector('.journey-traveler .traveler-size');
  const travelerHalf = travelerEl ? travelerEl.getBoundingClientRect().height / 2 : 22;

  return topVh * vh + travelerHalf;
}

/** Distance (px) over which a milestone grows from dot → full size while scrolling toward traveler. */
export const TRAVELER_APPROACH_RADIUS_PX = 320;

/** Half-height of peak glow zone around the traveler (px). */
export const TRAVELER_GLOW_RADIUS_PX = 200;

/** Smallest milestone circle scale before scroll reveal (0–1). */
export const MIN_STOP_REVEAL_SCALE = 0.34;

type TravelerProximity = {
  glow: MotionValue<number>;
  reveal: MotionValue<number>;
};

/** Glow + size reveal while a milestone approaches the fixed traveler figure. */
export function useTravelerProximity(targetRef: RefObject<HTMLElement | null>): TravelerProximity {
  const glow = useMotionValue(0);
  const reveal = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = targetRef.current;
      if (!el) {
        glow.set(0);
        reveal.set(0);
        return;
      }

      const rect = el.getBoundingClientRect();
      const stopCenterY = rect.top + rect.height / 2;
      const travelerY = getTravelerAnchorY();
      const signedDistance = stopCenterY - travelerY;

      // Milestone far below traveler — tiny dot, no glow
      if (signedDistance > TRAVELER_APPROACH_RADIUS_PX) {
        glow.set(0);
        reveal.set(0);
        return;
      }

      // Milestone passed above traveler — stay full size, glow fades
      if (signedDistance < -72) {
        glow.set(0.15);
        reveal.set(1);
        return;
      }

      // Approaching or aligned with traveler — grow + glow
      const approachT = 1 - Math.max(0, signedDistance) / TRAVELER_APPROACH_RADIUS_PX;
      const easedReveal = approachT < 0.5 ? (approachT / 0.5) * 0.72 : 0.72 + ((approachT - 0.5) / 0.5) * 0.28;
      reveal.set(Math.min(1, Math.max(0, easedReveal)));

      const glowDistance = Math.abs(signedDistance);
      if (glowDistance >= TRAVELER_GLOW_RADIUS_PX) {
        glow.set(approachT * 0.35);
        return;
      }

      const glowT = 1 - glowDistance / TRAVELER_GLOW_RADIUS_PX;
      const easedGlow = glowT < 0.55 ? (glowT / 0.55) * approachT : approachT;
      glow.set(Math.min(1, easedGlow));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [targetRef, glow, reveal]);

  return { glow, reveal };
}

/** @deprecated use useTravelerProximity */
export function useTravelerProximityGlow(targetRef: RefObject<HTMLElement | null>): MotionValue<number> {
  return useTravelerProximity(targetRef).glow;
}
