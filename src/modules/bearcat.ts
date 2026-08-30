import { prefersReducedMotion } from "../lib/dom";

/** Easter egg: hover "University of Cincinnati" and a tiny pixel Bearcat
 *  sprints across the bottom of the viewport. UC red and black. */

const COLORS: Record<string, string> = {
  k: "#1a1a1a",
  r: "#e00122",
  w: "#ffffff",
};

const W = 22;
const H = 13;

// side view, running right; k body, r jersey band, w eye
const FRAME_A: string[] = [
  "......................",
  "..............kk.k....",
  ".............kkkkkk...",
  ".............kkkkwk...",
  "..kk.........kkkkkk...",
  ".kkkkkkkkkkkkkkkkkk...",
  "kk.kkrrrrrrrrkkkkk....",
  "...kkrrrrrrrrkkkk.....",
  "...kkkkkkkkkkkkkk.....",
  "...kk....kk....kk.....",
  "..kk......kk....kk....",
  "......................",
  "......................",
];

const FRAME_B: string[] = [
  "......................",
  "..............kk.k....",
  ".............kkkkkk...",
  ".............kkkkwk...",
  "..kk.........kkkkkk...",
  ".kkkkkkkkkkkkkkkkkk...",
  "kk.kkrrrrrrrrkkkkk....",
  "...kkrrrrrrrrkkkk.....",
  "...kkkkkkkkkkkkkk.....",
  "....kk..kk...kkkk.....",
  ".....kk..kk...kk......",
  "......................",
  "......................",
];

function paint(ctx: CanvasRenderingContext2D, grid: string[]): void {
  ctx.clearRect(0, 0, W, H);
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const color = COLORS[row[x] ?? "."];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }
  });
}

export function initBearcat(triggers: HTMLElement[]): void {
  if (prefersReducedMotion()) return;
  let running = false;

  const run = (): void => {
    if (running) return;
    running = true;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    canvas.className = "bearcat";
    canvas.setAttribute("aria-hidden", "true");
    document.body.append(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      canvas.remove();
      running = false;
      return;
    }

    const start = performance.now();
    const duration = 3200;

    const frame = (now: number): void => {
      const p = (now - start) / duration;
      if (p >= 1) {
        canvas.remove();
        running = false;
        return;
      }
      const x = -90 + (window.innerWidth + 180) * p;
      const hop = Math.abs(Math.sin(p * Math.PI * 16)) * 7;
      canvas.style.transform = `translate(${x.toFixed(1)}px, ${(-hop).toFixed(1)}px)`;
      paint(ctx, Math.floor(now / 90) % 2 === 0 ? FRAME_A : FRAME_B);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  for (const trigger of triggers) {
    trigger.addEventListener("pointerenter", run);
    trigger.addEventListener("click", run);
  }
}
