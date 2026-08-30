# lukasestifanos.xyz

Personal site for Lukas Estifanos, software engineer in New York.

## Stack

- Vite + strict TypeScript (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`)
- Zero runtime dependencies, no frameworks, no trackers
- All content lives in one typed module (`src/data/resume.ts`); the DOM is rendered from it
- System font stack throughout

## Architecture

```
src/
  data/resume.ts       typed content: highlights, jobs, project, skills, education
  render/sections.ts   builds the DOM from the data module
  modules/wash.ts      animated soft-gradient background (canvas, CSS-blurred, ~1% of viewport pixels)
  modules/tilt.ts      pointer-tracked card tilt + glare, spring-damped
  modules/nav.ts       proximity spring on nav items + IntersectionObserver scrollspy
  modules/reveal.ts    scroll reveals and count-up numbers
  lib/dom.ts           element builder and environment helpers
  styles/              tokens, base, components, sections
```

Every animation respects `prefers-reduced-motion` and disables pointer effects
on coarse pointers. The background canvas renders at a fraction of the viewport
and is blurred by the compositor, so the wash costs almost nothing.

Colour palette from feralui.dev gradient presets (AKEBONO, AERIAL, SOLAR).

## Develop

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
```

## Deploy

Vercel, configured by `vercel.json` (framework: vite, output: `dist`).
CI runs typecheck and build on every push.
