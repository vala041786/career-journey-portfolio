'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  tone: 'white' | 'cyan' | 'violet';
};

function buildStars(count: number): Star[] {
  const tones: Star['tone'][] = ['white', 'cyan', 'violet'];

  return Array.from({ length: count }, (_, id) => ({
    id,
    x: ((id * 47 + 11) % 980) / 10,
    y: ((id * 73 + 19) % 960) / 10,
    size: (id % 3) + 2,
    tone: tones[id % 3]!,
  }));
}

const toneColor: Record<Star['tone'], string> = {
  white: '#ffffff',
  cyan: '#67e8f9',
  violet: '#a78bfa',
};

const toneHalo: Record<Star['tone'], { inner: string; outer: string }> = {
  white: { inner: 'rgba(255,255,255,0.95)', outer: 'rgba(255,255,255,0.5)' },
  cyan: { inner: 'rgba(103,232,249,0.9)', outer: 'rgba(103,232,249,0.45)' },
  violet: { inner: 'rgba(167,139,250,0.9)', outer: 'rgba(167,139,250,0.45)' },
};

type StarfieldProps = {
  isFocused: boolean;
};

export function Starfield({ isFocused }: StarfieldProps) {
  const stars = useMemo(() => buildStars(90), []);
  const { scrollYProgress } = useScroll();
  const glowMotion = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.6, 1], [0, 0.25, 0.55, 0.85, 1]);
  const smoothGlow = useSpring(glowMotion, { stiffness: 90, damping: 20 });
  const [glow, setGlow] = useState(0);

  useMotionValueEvent(smoothGlow, 'change', setGlow);
  useEffect(() => {
    setGlow(smoothGlow.get());
  }, [smoothGlow]);

  const scrollOpacity = 0.2 + glow * 0.75;
  const scrollBlur = Math.max(0, 2.8 - glow * 2.6);
  const innerGlow = 6 + glow * 18;
  const outerGlow = 12 + glow * 36;

  const starOpacity = isFocused ? scrollOpacity * 0.55 : scrollOpacity;
  const starBlur = isFocused ? scrollBlur + 0.6 : scrollBlur;
  const starInner = isFocused ? innerGlow * 0.45 : innerGlow;
  const starOuter = isFocused ? outerGlow * 0.45 : outerGlow;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="scroll-flow-bg absolute inset-0" />
      <div className="absolute inset-0">
        {stars.map((star) => {
          const { inner: innerColor, outer: outerColor } = toneHalo[star.tone];
          const color = toneColor[star.tone];

          return (
            <motion.span
              key={star.id}
              className="absolute block rounded-full"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size + 1 + glow * 1.5,
                height: star.size + 1 + glow * 1.5,
                backgroundColor: color,
              }}
              animate={{
                opacity: starOpacity,
                scale: 1 + glow * 0.2,
                filter: [
                  `blur(${starBlur}px)`,
                  `drop-shadow(0 0 ${starInner}px ${innerColor})`,
                  `drop-shadow(0 0 ${starOuter}px ${outerColor})`,
                ].join(' '),
                boxShadow: `0 0 ${starInner}px ${innerColor}, 0 0 ${starOuter}px ${outerColor}`,
              }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </div>
    </div>
  );
}
