import { prefersReducedMotion } from "../lib/dom";

/** Easter egg: hover "University of Cincinnati" and an 8-bit UC Bearcat
 *  mascot walks across the bottom of the viewport on two legs.
 *  Dark fur, red jersey, white C. */

const COLORS: Record<string, string> = {
  k: "#1a1a1a", // fur
  r: "#e00122", // UC red jersey
  w: "#ffffff", // eyes, jersey C
  t: "#d9b38c", // muzzle
};

const W = 16;
const H = 24;

// upright mascot, facing forward, mid-stride
const FRAME_A: string[] = [
  "................",
  "..kk......kk....",
  "..kkkkkkkkkk....",
  ".kkkkkkkkkkkk...",
  ".kkwwkkkkwwkk...",
  ".kkkkkkkkkkkk...",
  ".kkkttttttkkk...",
  "..kkttttttkk....",
  "..kktkkkktkk....",
  "...kkttttkk.....",
  "....kkkkkk......",
  "...rrrrrrrr.....",
  "..krrwwwwrrrk...",
  "..krrwrrrrrrk...",
  "..krrwwwwrrrk...",
  "..kkrrrrrrrkk...",
  "....kkkkkk......",
  "....kkkkkk......",
  "...kkk...kkk....",
  "..kkk.....kkk...",
  "..kkk......kkk..",
  ".kkk........kkk.",
  ".kkkk.......kkkk",
  "................",
];

// legs passing under the body
const FRAME_B: string[] = [
  "................",
  "..kk......kk....",
  "..kkkkkkkkkk....",
  ".kkkkkkkkkkkk...",
  ".kkwwkkkkwwkk...",
  ".kkkkkkkkkkkk...",
  ".kkkttttttkkk...",
  "..kkttttttkk....",
  "..kktkkkktkk....",
  "...kkttttkk.....",
  "....kkkkkk......",
  "...rrrrrrrr.....",
  "..krrwwwwrrrk...",
  "..krrwrrrrrrk...",
  "..krrwwwwrrrk...",
  "..kkrrrrrrrkk...",
  "....kkkkkk......",
  "....kkkkkk......",
  "....kkk.kkk.....",
  "....kkk.kkk.....",
  "....kkk.kkk.....",
  "....kkk.kkk.....",
  "...kkkk.kkkk....",
  "................",
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
    const duration = 4400;

    const frame = (now: number): void => {
      const p = (now - start) / duration;
      if (p >= 1) {
        canvas.remove();
        running = false;
        return;
      }
      const x = -80 + (window.innerWidth + 160) * p;
      const bob = Math.abs(Math.sin(p * Math.PI * 22)) * 2.5;
      canvas.style.transform = `translate(${x.toFixed(1)}px, ${(-bob).toFixed(1)}px)`;
      paint(ctx, Math.floor(now / 150) % 2 === 0 ? FRAME_A : FRAME_B);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  for (const trigger of triggers) {
    trigger.addEventListener("pointerenter", run);
    trigger.addEventListener("click", run);
  }
}
