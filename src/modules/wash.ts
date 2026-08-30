import { prefersReducedMotion } from "../lib/dom";

/** Animated soft gradient wash, ported from feralui.dev's animated gradients:
 *  large radial colour fields drifting on slow sine orbits, blurred by CSS. */

interface Blob {
  color: [number, number, number];
  alpha: number;
  /** orbit center as fractions of the viewport */
  cx: number;
  cy: number;
  /** orbit radii */
  ox: number;
  oy: number;
  /** radius as a fraction of the larger viewport side */
  r: number;
  speed: number;
  phase: number;
}

/* AKEBONO + AERIAL stops at low alpha over Paper white */
const BLOBS: Blob[] = [
  { color: [255, 182, 92], alpha: 0.5, cx: 0.16, cy: 0.1, ox: 0.08, oy: 0.06, r: 0.42, speed: 0.06, phase: 0.0 },
  { color: [232, 138, 160], alpha: 0.4, cx: 0.82, cy: 0.06, ox: 0.1, oy: 0.05, r: 0.4, speed: 0.05, phase: 1.7 },
  { color: [122, 199, 222], alpha: 0.42, cx: 0.62, cy: 0.3, ox: 0.12, oy: 0.09, r: 0.46, speed: 0.04, phase: 3.4 },
  { color: [98, 105, 232], alpha: 0.2, cx: 0.3, cy: 0.42, ox: 0.1, oy: 0.08, r: 0.4, speed: 0.045, phase: 5.0 },
];

export function initWash(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;

  const resize = (): void => {
    // The canvas is CSS-blurred, so it can render at a fraction of the viewport.
    const scale = 0.14;
    width = Math.max(64, Math.floor(window.innerWidth * scale));
    height = Math.max(64, Math.floor(window.innerHeight * scale));
    canvas.width = width;
    canvas.height = height;
  };

  const paint = (t: number): void => {
    ctx.clearRect(0, 0, width, height);
    const side = Math.max(width, height);
    for (const b of BLOBS) {
      const x = (b.cx + Math.sin(t * b.speed + b.phase) * b.ox) * width;
      const y = (b.cy + Math.cos(t * b.speed * 0.8 + b.phase) * b.oy) * height;
      const r = b.r * side;
      const [cr, cg, cb] = b.color;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${cr},${cg},${cb},${b.alpha})`);
      g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    }
    // fade the wash toward white lower down the page
    const fade = ctx.createLinearGradient(0, 0, 0, height);
    fade.addColorStop(0.35, "rgba(255,253,247,0)");
    fade.addColorStop(1, "rgba(255,253,247,1)");
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, width, height);
  };

  window.addEventListener("resize", () => {
    resize();
    paint(performance.now() * 0.001);
  });
  resize();

  if (prefersReducedMotion()) {
    paint(0);
    return;
  }

  let raf = 0;
  const frame = (now: number): void => {
    paint(now * 0.001);
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(frame);
  });
}
