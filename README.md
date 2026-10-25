# Alžbeta Jakšová — Portfolio

A static, dependency-free portfolio site (HTML + CSS + vanilla JS). No build step.

## Structure

| File | What it is |
| --- | --- |
| `index.html` | All page markup and most of the text (About, Skills, Thesis, Education, Contact) |
| `data.js` | Experience and Projects content — edit text here |
| `main.js` | Interactions: custom cursor, pointer-driven hero, tilt cards, dialogs, theme tuner |
| `styles.css` | Design tokens (light/dark × 4 palettes) and all styles |
| `img/`, `cv/` | Images and the downloadable CV |

## Run locally

Any static server works, for example:

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Deploy on Vercel

1. Import this repository at https://vercel.com/new.
2. Framework preset: **Other**. Leave Build Command and Output Directory empty.
3. Deploy. Every push to `main` redeploys automatically.
