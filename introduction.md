# Introduction

Geko is a text-to-speech (TTS) API. You send text and a voice name; you get back speech audio. Today it speaks **Kazakh** (model `tokay-kk-v1`); more languages and models arrive on the same endpoints over time.

The API is deliberately small — the whole surface is:

| Method | Endpoint | Auth | What it does |
| --- | --- | --- | --- |
| `POST` | `/v1/tts` | required | synthesize text → `audio/wav` |
| `GET` | `/v1/models` | open | list models + their voices |
| `GET` | `/v1/voices` | open | voice catalog for a model |
| `GET` | `/health` | open | service status |

**Base URL:** `https://geko--tokay-serve-web.modal.run`

## Two ways to call it

- **The SDK** (`@gekoai/sdk`) — a thin, typed TypeScript/JavaScript client with timeouts, retries, and a CLI. Start at [SDK → TypeScript](/sdk/typescript).
- **Raw HTTP** — it's a normal JSON + `audio/wav` API; call it from any language with `curl`, `fetch`, `requests`, etc. See the [HTTP reference](/api/reference).

## What you get back

`POST /v1/tts` returns raw **WAV audio, 24 kHz, 16-bit PCM, mono**. Save it, stream it to a player, or pipe it into your telephony/agent stack.

## Next steps

- [Quickstart](/quickstart) — from an API key to your first `hello.wav` in under a minute.
- [Authentication](/authentication) — creating and using API keys.
- [Voices](/voices) — who's available and how to audition them.
- [Roadmap](/roadmap) — streaming, MP3/Opus, an OpenAI-compatible endpoint, a Python SDK, and more.
