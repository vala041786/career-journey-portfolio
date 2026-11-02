'use client';

import { motion, type MotionValue } from 'framer-motion';

import {
  generateRoadPath,
  getRoadViewHeight,
  ROAD_ASPHALT_WIDTH,
  ROAD_EDGE_WHITE_WIDTH,
  ROAD_SHOULDER_WIDTH,
  ROAD_VIEW_WIDTH,
} from '../lib/roadway';

type RoadwayProps = {
  stopCount: number;
  pathLength: MotionValue<number>;
  pathOpacity: MotionValue<number>;
};

const roadCap = { strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function Roadway({ stopCount, pathLength, pathOpacity }: RoadwayProps) {
  const roadPath = generateRoadPath(stopCount);
  const viewHeight = getRoadViewHeight(stopCount);

  return (
    <svg
      aria-hidden
      className="roadway pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      viewBox={`0 0 ${ROAD_VIEW_WIDTH} ${viewHeight}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="road-asphalt" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" stopColor="#525a65" />
          <stop offset="45%" stopColor="#434b55" />
          <stop offset="100%" stopColor="#3a424c" />
        </linearGradient>
        <linearGradient id="road-shoulder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3028" />
          <stop offset="100%" stopColor="#1e231c" />
        </linearGradient>
        <filter id="asphalt-grain" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="8" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0" result="grain" />
          <feBlend in="SourceGraphic" in2="grain" mode="multiply" />
        </filter>
      </defs>

      {/* Full journey route — always visible (overview when zoomed out) */}
      <g className="road-overview" opacity={0.72}>
        <path
          d={roadPath}
          fill="none"
          stroke="url(#road-shoulder)"
          strokeWidth={ROAD_SHOULDER_WIDTH}
          {...roadCap}
        />
        <path
          d={roadPath}
          fill="none"
          stroke="#e8edf2"
          strokeWidth={ROAD_EDGE_WHITE_WIDTH}
          {...roadCap}
        />
        <path
          d={roadPath}
          fill="none"
          stroke="url(#road-asphalt)"
          strokeWidth={ROAD_ASPHALT_WIDTH}
          filter="url(#asphalt-grain)"
          {...roadCap}
        />
        <path
          d={roadPath}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="3"
          strokeDasharray="14 16"
          {...roadCap}
        />
      </g>

      {/* Scroll progress — brightens the portion you've traveled */}
      <motion.path
        d={roadPath}
        fill="none"
        stroke="url(#road-shoulder)"
        strokeWidth={ROAD_SHOULDER_WIDTH}
        style={{ pathLength, opacity: pathOpacity }}
        {...roadCap}
      />
      <motion.path
        d={roadPath}
        fill="none"
        stroke="#e8edf2"
        strokeWidth={ROAD_EDGE_WHITE_WIDTH}
        style={{ pathLength, opacity: pathOpacity }}
        {...roadCap}
      />
      <motion.path
        d={roadPath}
        fill="none"
        stroke="url(#road-asphalt)"
        strokeWidth={ROAD_ASPHALT_WIDTH}
        filter="url(#asphalt-grain)"
        style={{ pathLength, opacity: pathOpacity }}
        {...roadCap}
      />
      <motion.path
        d={roadPath}
        fill="none"
        stroke="#fbbf24"
        strokeWidth="3.5"
        strokeDasharray="14 16"
        style={{ pathLength, opacity: pathOpacity }}
        {...roadCap}
      />
    </svg>
  );
}
