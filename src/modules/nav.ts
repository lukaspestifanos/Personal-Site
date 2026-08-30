import { clamp, finePointer, prefersReducedMotion } from "../lib/dom";

interface SpringItem {
  element: HTMLElement;
  value: number;
  velocity: number;
  target: number;
}

const SPRING = 0.19;
const DAMPING = 0.7;
const PROXIMITY = 110;
const MAX_SCALE = 0.14;

/** Proximity spring on nav items (adapted dock physics) plus scrollspy. */
export function initNav(root: HTMLElement): void {
  const items: SpringItem[] = Array.from(
    root.querySelectorAll<HTMLElement>("[data-spring]"),
  ).map((element) => ({ element, value: 0, velocity: 0, target: 0 }));

  if (!prefersReducedMotion() && finePointer()) {
    let dirty = false;

    const setTargets = (clientX: number): void => {
      for (const item of items) {
        const rect = item.element.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const p = clamp(1 - Math.abs(clientX - center) / PROXIMITY, 0, 1);
        item.target = p * p * (3 - 2 * p);
      }
      dirty = true;
    };

    const reset = (): void => {
      for (const item of items) item.target = 0;
      dirty = true;
    };

    const draw = (): void => {
      if (dirty) {
        let moving = false;
        for (const item of items) {
          item.velocity += (item.target - item.value) * SPRING;
          item.velocity *= DAMPING;
          item.value += item.velocity;
          if (
            Math.abs(item.target - item.value) < 0.001 &&
            Math.abs(item.velocity) < 0.001
          ) {
            item.value = item.target;
            item.velocity = 0;
          } else {
            moving = true;
          }
          const scale = 1 + item.value * MAX_SCALE;
          item.element.style.transform =
            item.value > 0.001 ? `scale(${scale.toFixed(4)})` : "";
        }
        if (!moving) dirty = false;
      }
      requestAnimationFrame(draw);
    };

    root.addEventListener("pointermove", (event) => setTargets(event.clientX));
    root.addEventListener("pointerleave", reset);
    requestAnimationFrame(draw);
  }

  // scrollspy
  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
  const sections = links
    .map((a) => document.querySelector<HTMLElement>(a.getAttribute("href") ?? ""))
    .filter((s): s is HTMLElement => s !== null);

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of links) {
          link.setAttribute(
            "aria-current",
            link.getAttribute("href") === `#${entry.target.id}` ? "true" : "false",
          );
        }
      }
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  for (const section of sections) spy.observe(section);
}
