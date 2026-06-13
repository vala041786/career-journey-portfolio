'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { recognitionScrollItems } from '../data/recognitionScroll';
import { introCardShellClass, introCardWidthClass } from '../lib/introCard';

const DISPLAY_MS = 4000;
const ease = [0.16, 1, 0.3, 1] as const;

type RecognitionScrollerProps = {
  className?: string;
  variant?: 'default' | 'legend';
};

function getResponsiveTextSizes(width: number) {
  if (width >= 200) return { max: 17, min: 11 };
  if (width >= 160) return { max: 15, min: 10 };
  return { max: 13, min: 9 };
}

type RecognitionAutoFitTextProps = {
  text: string;
  colorClass: string;
};

function RecognitionAutoFitText({ text, colorClass }: RecognitionAutoFitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const parent = el.parentElement;
      const width = el.clientWidth || parent?.clientWidth || 240;
      const maxHeight = parent?.clientHeight;

      if (maxHeight) {
        el.style.maxHeight = `${maxHeight}px`;
      }

      const { max: maxSize, min: minSize } = getResponsiveTextSizes(width);
      let size = maxSize;
      el.style.fontSize = `${size}px`;
      el.style.lineHeight = '1.35';

      const fits = () =>
        el.scrollHeight <= el.clientHeight + 1 && el.scrollWidth <= el.clientWidth + 1;

      while (size > minSize && !fits()) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(el);
    if (el.parentElement) observer.observe(el.parentElement);
    return () => observer.disconnect();
  }, [text]);

  return (
    <p
      ref={ref}
      className={`w-full overflow-hidden font-medium leading-snug ${colorClass}`}
    >
      {text}
    </p>
  );
}

export function RecognitionScroller({ className = '', variant = 'default' }: RecognitionScrollerProps) {
  const reducedMotion = useReducedMotion();
  const items = recognitionScrollItems;
  const [index, setIndex] = useState(0);
  const current = items[index];
  const isLegend = variant === 'legend';
  const cardWidthClass = isLegend ? 'w-[15.5rem] sm:w-[17rem] md:w-[18rem]' : introCardWidthClass;
  const cardHeightClass = isLegend ? 'h-[6.5rem] sm:h-[7rem] md:h-[7.25rem]' : 'h-[12rem] sm:h-[12.5rem]';

  useEffect(() => {
    if (reducedMotion) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, DISPLAY_MS);

    return () => window.clearInterval(id);
  }, [items.length, reducedMotion]);

  return (
    <div className={className} aria-live="polite" aria-label="Recognition highlights">
      {isLegend && (
        <p className="mb-2 text-right text-xs font-semibold uppercase tracking-[0.34em] text-white/45 sm:text-sm">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease }}
            >
              {index + 1}/{items.length} Recognitions
            </motion.span>
          </AnimatePresence>
        </p>
      )}

      <AnimatePresence mode="wait">
        <motion.article
          key={current.label}
          initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.5, ease }}
          className={`recognition-card flex flex-col ${cardWidthClass} ${cardHeightClass} ${introCardShellClass} ${
            isLegend ? 'ml-auto bg-[#0c1018]/80 shadow-[0_12px_40px_rgba(0,0,0,0.35)]' : 'mx-auto md:mx-0'
          } ${current.cardClass}`}
        >
          {!isLegend && (
            <div className="flex h-11 shrink-0 items-center border-b border-white/10 bg-white/[0.04] px-4 sm:h-12 md:px-5">
              <div className="flex w-full items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/55 sm:text-sm">
                  Recognition
                </p>
                <span className="rounded-md border border-white/10 bg-black/20 px-2.5 py-0.5 text-xs text-white/50 sm:text-sm">
                  {index + 1} / {items.length}
                </span>
              </div>
            </div>
          )}

          <div
            className={`flex h-full min-h-0 flex-1 items-center gap-2.5 sm:gap-3 ${
              isLegend ? 'px-3 py-2 sm:px-3.5 sm:py-2.5' : 'px-4 py-3.5 sm:px-5 sm:py-4'
            }`}
          >
            <span
              aria-hidden
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-lg shadow-inner sm:h-9 sm:w-9 sm:text-xl ${current.iconClass}`}
            >
              {current.symbol}
            </span>

            <div className="flex h-full min-h-0 flex-1 items-center">
              <RecognitionAutoFitText text={current.label} colorClass={current.colorClass} />
            </div>
          </div>
        </motion.article>
      </AnimatePresence>

      {!isLegend && (
        <div
          className={`mt-3 flex flex-wrap items-center gap-2 ${cardWidthClass} mx-auto justify-center md:justify-start`}
        >
          {items.map((item, itemIndex) => (
            <button
              key={item.label}
              type="button"
              aria-label={`Show recognition ${itemIndex + 1}: ${item.label}`}
              aria-current={itemIndex === index ? 'true' : undefined}
              onClick={() => setIndex(itemIndex)}
              className={`h-2 rounded-full transition-all ${
                itemIndex === index ? `w-6 ${item.dotClass}` : 'w-2 bg-white/20 hover:bg-white/35'
              }`}
            />
          ))}
        </div>
      )}

      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.label}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
}
