/** Road geometry shared by the SVG path and milestone stop placement. */

export const ROAD_VIEW_WIDTH = 1000;
export const ROAD_STEP_Y = 120;
export const ROAD_START_Y = 60;

/** Narrow corridor — road swings slightly around center. */
export const ROAD_CENTER_X = 500;
export const ROAD_SWING_X = 32;
export const ROAD_LEFT_X = ROAD_CENTER_X - ROAD_SWING_X;
export const ROAD_RIGHT_X = ROAD_CENTER_X + ROAD_SWING_X;

export const ROAD_SHOULDER_WIDTH = 72;
export const ROAD_EDGE_WHITE_WIDTH = 58;
export const ROAD_ASPHALT_WIDTH = 48;
export const ROAD_GHOST_SHOULDER = 76;

/** Layout width for the road column — keep in sync with JourneyNode grid. */
export const ROAD_COLUMN_WIDTH = '7rem';
export const ROAD_COLUMN_WIDTH_MD = '8.5rem';

/** @deprecated use ROAD_ASPHALT_WIDTH */
export const ROAD_STROKE_WIDTH = ROAD_ASPHALT_WIDTH;
export const ROAD_EDGE_WIDTH = ROAD_EDGE_WHITE_WIDTH;
export const ROAD_GHOST_WIDTH = ROAD_GHOST_SHOULDER;

/** Lower = gentler bends; higher = tighter curves through each stop. */
export const ROAD_CURVE_TENSION = 5.5;

export type RoadPoint = { x: number; y: number };

export function getStopX(index: number): number {
  return index % 2 === 0 ? ROAD_LEFT_X : ROAD_RIGHT_X;
}

export function getStopY(index: number): number {
  return ROAD_START_Y + index * ROAD_STEP_Y;
}

export function getRoadStopPoints(stopCount: number): RoadPoint[] {
  return Array.from({ length: stopCount }, (_, index) => ({
    x: getStopX(index),
    y: getStopY(index),
  }));
}

/** Smooth curved path through all stops — rounded bends like a real road. */
export function generateRoadPath(stopCount: number): string {
  const points = getRoadStopPoints(stopCount);
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  const tension = ROAD_CURVE_TENSION;
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / tension;
    const cp1y = p1.y + (p2.y - p0.y) / tension;
    const cp2x = p2.x - (p3.x - p1.x) / tension;
    const cp2y = p2.y - (p3.y - p1.y) / tension;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

export function getRoadViewHeight(stopCount: number): number {
  if (stopCount <= 0) return ROAD_STEP_Y;
  return getStopY(stopCount - 1) + ROAD_STEP_Y;
}

/** Details sit on the outer side, away from the road bend. */
export function getDetailsSide(index: number): 'left' | 'right' {
  return index % 2 === 0 ? 'right' : 'left';
}
