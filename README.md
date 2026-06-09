# Lukas Estifanos — OS

A personal site that boots up and behaves like a macOS desktop, rendered in
editorial serif type. No build step, no dependencies — one static `index.html`.

## Run locally

```bash
# any static server works
python3 -m http.server   # then open http://localhost:8000
```

Or just open `index.html` in a browser. (Fonts load from Google Fonts, so the
first load needs internet; after that they're cached.)

## Deploy to Vercel

This folder *is* the deployable site — it's a static project, so there is no
build command and no framework preset.

### Option A — CLI

```bash
npm i -g vercel        # if you don't have it
cd site
vercel                 # preview deploy
vercel --prod          # production deploy
```

When prompted: framework preset = **Other**, build command = **(none)**,
output directory = **./** (the default).

### Option B — Git + dashboard

1. Push the repo to GitHub.
2. In the Vercel dashboard: **New Project → import the repo**.
3. Set **Root Directory** to `site`.
4. Framework preset: **Other**. Leave build & output empty.
5. Deploy.

`vercel.json` already sets `cleanUrls` and sensible cache headers.

## What's in here

| File          | Purpose                                          |
|---------------|--------------------------------------------------|
| `index.html`  | The whole site — markup, styles, scripts, icons. |
| `favicon.svg` | The iCarly pineapple, used as the tab icon.      |
| `vercel.json` | Static-hosting config for Vercel.                |
# Personal-Site
