/** Road geometry shared by the SVG path and milestone stop placement. */

export const ROAD_VIEW_WIDTH = 1000;
export const ROAD_STEP_Y = 120;
export const ROAD_START_Y = 60;

/**
 * Zig-zag corridor inside the road column.
 * Kept well inside the viewBox so asphalt/shoulder strokes never spill into content panels.
 */
export const ROAD_CENTER_X = 500;
export const ROAD_SWING_X = 168;
export const ROAD_LEFT_X = ROAD_CENTER_X - ROAD_SWING_X;
export const ROAD_RIGHT_X = ROAD_CENTER_X + ROAD_SWING_X;

/** Stroke widths in viewBox units — sized so bends stay inside the road column. */
export const ROAD_SHOULDER_WIDTH = 58;
export const ROAD_EDGE_WHITE_WIDTH = 46;
export const ROAD_ASPHALT_WIDTH = 38;

/** Lower = gentler bends; higher = tighter curves through each stop. */
export const ROAD_CURVE_TENSION = 4.6;

export type RoadPoint = { x: number; y: number };

export function getStopX(index: number): number {
  return index % 2 === 0 ? ROAD_LEFT_X : ROAD_RIGHT_X;
}

export function getStopY(index: number): number {
  return ROAD_START_Y + index * ROAD_STEP_Y;
}

/** Horizontal stop position as % of the road column (for DOM alignment with the SVG). */
export function getStopXPercent(index: number): number {
  return (getStopX(index) / ROAD_VIEW_WIDTH) * 100;
}

/** Interpolated X along the zig-zag for a 0–1 scroll progress. */
export function getProgressX(progress: number, stopCount: number): number {
  if (stopCount <= 1) return ROAD_CENTER_X;
  const leg = Math.min(1, Math.max(0, progress)) * (stopCount - 1);
  const i = Math.floor(leg);
  const t = leg - i;
  const x0 = getStopX(i);
  const x1 = getStopX(Math.min(i + 1, stopCount - 1));
  return x0 + (x1 - x0) * t;
}

/** Pixel offset from center for traveler, scaled to a typical road-column width. */
export function getTravelerXOffset(progress: number, stopCount: number, columnWidthPx = 112): number {
  const x = getProgressX(progress, stopCount);
  return ((x - ROAD_CENTER_X) / ROAD_VIEW_WIDTH) * columnWidthPx;
}

export function getRoadStopPoints(stopCount: number): RoadPoint[] {
  return Array.from({ length: stopCount }, (_, index) => ({
    x: getStopX(index),
    y: getStopY(index),
  }));
}

/** Smooth curved path through all stops — rounded zig-zag like a real road. */
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

/** Details sit on the outer side, away from the road bend — keeps panels clear of the path. */
export function getDetailsSide(index: number): 'left' | 'right' {
  return index % 2 === 0 ? 'right' : 'left';
}
