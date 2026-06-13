type RoadwayRectImageProps = {
  idPrefix?: string;
  className?: string;
  animated?: boolean;
};

/** Top-down earth tile with a centered roadway strip. */
export function RoadwayRectImage({ idPrefix = 'road-rect', className = '', animated = false }: RoadwayRectImageProps) {
  const asphalt = `${idPrefix}-asphalt`;
  const shoulder = `${idPrefix}-shoulder`;
  const earth = `${idPrefix}-earth`;
  const earthLight = `${idPrefix}-earth-light`;
  const asphaltGrain = `${idPrefix}-asphalt-grain`;
  const earthGrain = `${idPrefix}-earth-grain`;
  const topFade = `${idPrefix}-top-fade`;
  const clip = `${idPrefix}-clip`;

  const roadX = 36;
  const roadW = 88;
  const earthW = 160;
  const earthH = 320;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${earthW} ${earthH}`}
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={earth} x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor="#4a5c38" />
          <stop offset="35%" stopColor="#3d4f2f" />
          <stop offset="70%" stopColor="#354428" />
          <stop offset="100%" stopColor="#2a3520" />
        </linearGradient>
        <linearGradient id={earthLight} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(120,145,80,0.35)" />
          <stop offset="100%" stopColor="rgba(60,75,45,0)" />
        </linearGradient>
        <linearGradient id={asphalt} x1="0" y1="0" x2="0.12" y2="1">
          <stop offset="0%" stopColor="#565e68" />
          <stop offset="45%" stopColor="#434b55" />
          <stop offset="100%" stopColor="#3a424c" />
        </linearGradient>
        <linearGradient id={shoulder} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a4530" />
          <stop offset="100%" stopColor="#2a3222" />
        </linearGradient>
        <linearGradient id={topFade} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#090B12" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id={earthGrain} x="-4%" y="-2%" width="108%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" seed="12" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.08  0 0 0 0 0.12  0 0 0 0 0.04  0 0 0 0.22 0"
            result="tint"
          />
          <feBlend in="SourceGraphic" in2="tint" mode="multiply" />
        </filter>
        <filter id={asphaltGrain} x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.1 0"
            result="grain"
          />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
        <clipPath id={clip}>
          <rect x="0" y="0" width={earthW} height={earthH} rx="8" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clip})`}>
        {/* Earth / ground base */}
        <rect x="0" y="0" width={earthW} height={earthH} fill={`url(#${earth})`} filter={`url(#${earthGrain})`} />
        <rect x="0" y="0" width={earthW} height={earthH} fill={`url(#${earthLight})`} />

        {/* Grass patches beside the road */}
        <ellipse cx="18" cy="72" rx="14" ry="22" fill="rgba(90,115,55,0.35)" />
        <ellipse cx="142" cy="140" rx="16" ry="26" fill="rgba(75,98,48,0.3)" />
        <ellipse cx="22" cy="220" rx="12" ry="20" fill="rgba(85,108,52,0.28)" />
        <ellipse cx="138" cy="268" rx="14" ry="18" fill="rgba(70,92,44,0.32)" />

        {/* Dirt wear along road edges */}
        <rect x={roadX - 4} y="0" width="6" height={earthH} fill="rgba(55,48,36,0.25)" />
        <rect x={roadX + roadW - 2} y="0" width="6" height={earthH} fill="rgba(55,48,36,0.25)" />

        {/* Road shadow on ground */}
        <rect x={roadX - 2} y="4" width={roadW + 4} height={earthH - 8} fill="rgba(0,0,0,0.18)" rx="2" />

        {/* Shoulders */}
        <rect x={roadX} y="0" width="12" height={earthH} fill={`url(#${shoulder})`} />
        <rect x={roadX + roadW - 12} y="0" width="12" height={earthH} fill={`url(#${shoulder})`} />

        {/* White edge lines */}
        <rect x={roadX + 11} y="0" width="2.5" height={earthH} fill="#e8edf2" opacity="0.95" />
        <rect x={roadX + roadW - 13.5} y="0" width="2.5" height={earthH} fill="#e8edf2" opacity="0.95" />

        {/* Asphalt */}
        <rect
          x={roadX + 13}
          y="0"
          width={roadW - 26}
          height={earthH}
          fill={`url(#${asphalt})`}
          filter={`url(#${asphaltGrain})`}
        />

        <rect x={roadX + 18} y="0" width="24" height={earthH} fill="rgba(255,255,255,0.02)" />
        <rect x={roadX + 46} y="0" width="24" height={earthH} fill="rgba(0,0,0,0.04)" />

        {/* Center dashes */}
        <line
          x1={roadX + roadW / 2}
          y1="8"
          x2={roadX + roadW / 2}
          y2={earthH - 8}
          stroke="#fbbf24"
          strokeWidth="2.8"
          strokeDasharray="14 18"
          strokeLinecap="butt"
        >
          {animated && (
            <animate attributeName="stroke-dashoffset" values="0;-32" dur="1.1s" repeatCount="indefinite" />
          )}
        </line>

        {/* Top blend into page background */}
        <rect x="0" y="0" width={earthW} height="32" fill={`url(#${topFade})`} opacity="0.4" />

        {/* Ground shadow at bottom */}
        <ellipse cx={earthW / 2} cy={earthH - 4} rx="52" ry="6" fill="rgba(0,0,0,0.4)" />
      </g>

      {/* Tile border */}
      <rect
        x="0.75"
        y="0.75"
        width={earthW - 1.5}
        height={earthH - 1.5}
        rx="8"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
