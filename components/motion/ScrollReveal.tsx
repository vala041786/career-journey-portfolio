'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  drift?: 'left' | 'right' | 'none';
};

export function ScrollReveal({ children, className, delay = 0, drift = 'none' }: ScrollRevealProps) {
  const driftX = drift === 'left' ? -28 : drift === 'right' ? 28 : 0;

  const variants: Variants = {
    hidden: { opacity: 0, y: 56, x: driftX, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </motion.div>
  );
}
