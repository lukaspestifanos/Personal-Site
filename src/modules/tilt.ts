import { clamp, finePointer, prefersReducedMotion } from "../lib/dom";

/** feralui-style card interaction: pointer-tracked tilt plus a glare highlight
 *  driven by --px/--py custom properties (see [data-tilt]::after in CSS). */
export function initTilt(elements: HTMLElement[], maxDeg = 6): void {
  if (prefersReducedMotion() || !finePointer()) return;

  for (const card of elements) {
    let raf = 0;
    let targetRX = 0;
    let targetRY = 0;
    let rx = 0;
    let ry = 0;
    let hovering = false;

    const loop = (): void => {
      rx += (targetRX - rx) * 0.12;
      ry += (targetRY - ry) * 0.12;
      card.style.transform = `perspective(900px) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
      if (hovering || Math.abs(rx) > 0.01 || Math.abs(ry) > 0.01) {
        raf = requestAnimationFrame(loop);
      } else {
        card.style.transform = "";
        raf = 0;
      }
    };

    card.addEventListener("pointerenter", () => {
      hovering = true;
      if (!raf) raf = requestAnimationFrame(loop);
    });

    card.addEventListener("pointermove", (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const px = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      const py = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
      card.style.setProperty("--px", px.toFixed(2));
      card.style.setProperty("--py", py.toFixed(2));
      targetRY = ((px - 50) / 50) * maxDeg;
      targetRX = ((50 - py) / 50) * maxDeg;
    });

    card.addEventListener("pointerleave", () => {
      hovering = false;
      targetRX = 0;
      targetRY = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }
}
