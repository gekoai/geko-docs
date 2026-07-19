---
layout: home
hero:
  name: Geko
  text: Text-to-speech for Kazakh — and beyond
  tagline: A thin, familiar SDK and a simple HTTP API. Named voices, one call, real WAV out.
  actions:
    - theme: brand
      text: Quickstart
      link: /quickstart
    - theme: alt
      text: API reference
      link: /api/reference
    - theme: alt
      text: View on npm
      link: https://www.npmjs.com/package/@gekoai/sdk
features:
  - title: One call to speech
    details: geko.tts.create({ text, voice }) returns WAV bytes. That's the whole happy path — no session setup, no polling.
  - title: Familiar & zero-dependency
    details: Mirrors the OpenAI / ElevenLabs ergonomics. Built on the global fetch — nothing to install beyond the SDK. Node, Deno, Bun, and browsers (via a proxy).
  - title: Named voices
    details: Pick a voice by name (Aigerim, Arman, …). Fetch the live catalog so your list is never stale.
  - title: Built for production
    details: Per-request timeouts, automatic retries with backoff, typed errors, and a CLI for one-liners.
---
