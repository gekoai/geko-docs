# geko-docs

Documentation for the [Geko](https://www.npmjs.com/package/@gekoai/sdk) speech API and SDK, built with [VitePress](https://vitepress.dev).

## Develop

```bash
npm install
npm run docs:dev      # local preview at http://localhost:5173
```

## Build

```bash
npm run docs:build    # static site → .vitepress/dist  (fails on dead links)
npm run docs:preview  # serve the built site locally
```

## Deploy

Static output lives in `.vitepress/dist`. On **Vercel** (auto-detects VitePress):

- Build command: `npm run docs:build`
- Output directory: `.vitepress/dist`

Also deployable to Cloudflare Pages, Netlify, or GitHub Pages — anywhere that serves static files.

## Structure

```
.vitepress/config.mts   nav, sidebar, theme
index.md                home
introduction, quickstart, authentication
sdk/                    typescript, cli, errors
api/reference           HTTP reference
guides/                 playing-audio, frameworks, latency, normalization
voices, roadmap
```

Content is grounded in the live API (`serve/tokay_serve.py`) and `@gekoai/sdk`. Keep it accurate — document what ships; put planned work in `roadmap.md`.
