import { prefersReducedMotion } from "../lib/dom";

/** Scroll-linked reveals plus count-up animation for [data-count] numbers. */
export function initReveal(): void {
  const revealables = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
  revealables.forEach((element, index) => {
    element.style.setProperty("--rv-i", String(index % 4));
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.12 },
  );
  for (const element of revealables) io.observe(element);

  // count-up
  const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
  const format = (value: number, decimals: number): string =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const run = (element: HTMLElement): void => {
    const target = Number(element.dataset.count ?? "0");
    const decimals = Number(element.dataset.decimals ?? "0");
    const suffix = element.dataset.suffix ?? "";
    if (prefersReducedMotion()) {
      element.textContent = format(target, decimals) + suffix;
      return;
    }
    const duration = 1300;
    const start = performance.now();
    const frame = (now: number): void => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      element.textContent = format(target * eased, decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const counterIO = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        run(entry.target as HTMLElement);
        counterIO.unobserve(entry.target);
      }
    },
    { threshold: 0.5 },
  );
  for (const counter of counters) counterIO.observe(counter);
}
