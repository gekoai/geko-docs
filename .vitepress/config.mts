import { defineConfig } from "vitepress";

// Docs for the Geko speech API + SDK.
// Content is grounded in the live API (serve/tokay_serve.py) and @gekoai/sdk.
export default defineConfig({
  title: "Geko",
  description: "Kazakh (and beyond) text-to-speech API — a thin, familiar SDK and a simple HTTP API.",
  lang: "en-US",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "Quickstart", link: "/quickstart" },
      { text: "SDK", link: "/sdk/typescript" },
      { text: "API", link: "/api/reference" },
      { text: "Voices", link: "/voices" },
      {
        text: "v0.2.0",
        items: [
          { text: "Changelog", link: "https://github.com/gekoai/geko-ts-sdk/blob/main/CHANGELOG.md" },
          { text: "npm", link: "https://www.npmjs.com/package/@gekoai/sdk" },
          { text: "Roadmap", link: "/roadmap" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Getting started",
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Quickstart", link: "/quickstart" },
          { text: "Authentication", link: "/authentication" },
        ],
      },
      {
        text: "SDK",
        items: [
          { text: "TypeScript / JavaScript", link: "/sdk/typescript" },
          { text: "CLI", link: "/sdk/cli" },
          { text: "Errors & retries", link: "/sdk/errors" },
        ],
      },
      {
        text: "API",
        items: [{ text: "HTTP reference", link: "/api/reference" }],
      },
      {
        text: "Guides",
        items: [
          { text: "Playing & saving audio", link: "/guides/playing-audio" },
          { text: "Use it in your app", link: "/guides/frameworks" },
          { text: "Latency & quality (NFE)", link: "/guides/latency" },
          { text: "Text normalization", link: "/guides/normalization" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Voices", link: "/voices" },
          { text: "Roadmap", link: "/roadmap" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/gekoai" }],
    search: { provider: "local" },
    editLink: {
      pattern: "https://github.com/gekoai/geko-docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "© Geko AI",
    },
  },
});
