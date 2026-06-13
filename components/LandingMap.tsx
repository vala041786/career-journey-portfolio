import type { ReactNode } from 'react';

type LandingMapProps = {
  children: ReactNode;
  className?: string;
};

export function LandingMap({ children, className = '' }: LandingMapProps) {
  return (
    <div
      className={`landing-map relative overflow-hidden rounded-3xl border border-white/10 shadow-[inset_0_0_80px_rgba(9,11,18,0.5),0_24px_80px_rgba(0,0,0,0.3)] ${className}`}
    >
      <div aria-hidden className="landing-map__earth-image pointer-events-none absolute inset-0" />
      <div aria-hidden className="landing-map__blend pointer-events-none absolute inset-0" />
      <div aria-hidden className="landing-map__atmosphere pointer-events-none absolute inset-0" />
      <div aria-hidden className="landing-map__frame pointer-events-none absolute inset-3 rounded-2xl border border-white/[0.08] sm:inset-4" />

      <svg
        aria-hidden
        className="landing-map__route pointer-events-none absolute inset-0 h-full w-full text-cyan-100/30"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
        <path
          d="M120 620 C220 520 180 380 320 340 S520 220 500 120 S720 180 860 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 10"
        />
      </svg>

      {children}
    </div>
  );
}
