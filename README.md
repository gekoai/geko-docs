# geko-docs

Documentation for the [Geko](https://www.npmjs.com/package/@gekoai/sdk) speech API and SDK, built with [Mintlify](https://mintlify.com).

## Develop

The Mintlify CLI requires a **Node LTS** (18 / 20 / 22) — it does not support Node 25+.

```bash
npm i -g mint        # or: npx mint@latest <cmd>
mint dev             # local preview at http://localhost:3000
mint broken-links    # validate internal links
```

## Deploy

Connect this repo to **Mintlify** (the Mintlify GitHub app / dashboard). Mintlify builds directly from `docs.json` + the `.mdx` pages on every push to `main` — no build step or output directory to configure.

## Structure

```
docs.json               config: theme, colors, navigation
index.mdx               landing / overview
quickstart, authentication
sdk/                    typescript, cli, errors
api/reference           HTTP reference
guides/                 playing-audio, frameworks, latency, normalization
voices, roadmap
```

Content is grounded in the live API (`serve/tokay_serve.py`) and `@gekoai/sdk`. Keep it accurate — document what ships; put planned work in `roadmap.mdx`.
