# LukasLeak dot com

A personal site that parties like it's 2006. One part LiveLeak, one part DatPiff,
one part tweaked-out MySpace profile, all early-HTML energy: marquees, hit
counters, a Top 8, a mixtape rack, glitter text, a sparkle cursor trail, a
guestbook, and a fake Winamp player that plays an actual WebAudio chiptune.

No build step, no dependencies, no frameworks — one static `index.html`.
(The footer badge says "POWERED BY 1 HTML FILE" and it is not lying.)

## Run locally

```bash
# any static server works
python3 -m http.server   # then open http://localhost:8000
```

Or just open `index.html` in a browser. Everything is inline — no fonts, no
CDNs, no external images. Works offline like it's on a Zip disk.

## Deploy to Vercel

This folder *is* the deployable site — static project, no build command,
no framework preset.

```bash
npm i -g vercel        # if you don't have it
vercel                 # preview deploy
vercel --prod          # production deploy
```

When prompted: framework preset = **Other**, build command = **(none)**,
output directory = **./** (the default).

`vercel.json` already sets `cleanUrls` and sensible cache headers.

## What's in here

| File          | Purpose                                                    |
|---------------|------------------------------------------------------------|
| `index.html`  | The whole site — markup, styles, scripts, chiptune, chaos. |
| `favicon.svg` | The iCarly pineapple, used as the tab icon.                |
| `vercel.json` | Static-hosting config for Vercel.                          |

## Notes

- The guestbook and visitor counter persist to `localStorage` only — it's a
  static site, nothing is sent anywhere.
- The "1,000,000th visitor" popup shows once per browser session. Every
  visitor is the 1,000,000th visitor.
- Best viewed in IE6 at 800×600. (Renders fine everywhere else too,
  including phones, regrettably.)
