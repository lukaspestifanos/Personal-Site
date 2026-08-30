# lukasestifanos.xyz

Personal site for Lukas Estifanos, forward deployed engineer in New York.

One static `index.html`, no build step, no framework. Deploys as-is on Vercel.

## What is in it

- Palette and surface tokens from the ThreeUI dark theme (MengTo/threeui, MIT)
- Colour stops from feralui.dev Japanese gradients: SHIDEN (neon haze), KYOKKOU (aurora), AKEBONO (daybreak)
- Type: Instrument Serif and JetBrains Mono (ThreeUI), Fraunces and Inter (feralui), loaded from Google Fonts
- Interaction ported to vanilla JS from ThreeUI: animated top dock, constellation field background, decode headings
- Pip, an 8-bit pixel mascot that walks visitors through each section
- Content parsed from the resume; no em dashes anywhere

## Run locally

```bash
python3 -m http.server   # then open http://localhost:8000
```

## Deploy

```bash
vercel --prod
```

Framework preset: Other. Build command: none. Output directory: `./`.
