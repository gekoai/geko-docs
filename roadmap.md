# Roadmap

What exists today is the honest, working surface documented throughout these docs: `tts.create`, `voices`, `models`, `health`, over WAV, with a typed SDK and CLI.

The items below are **planned, not yet available**. This page exists so you can plan around them — nothing here is callable today. Track progress on [GitHub](https://github.com/gekoai).

## Streaming

Stream audio as it's generated instead of waiting for the full clip — the key unlock for real-time voice agents and IVR (start speaking on first chunk). Will add a streaming endpoint and an SDK `tts.stream()` returning an async iterable / `ReadableStream`.

_Status: planned. Today `tts.create()` returns the complete WAV in one response._

## More output formats

Native **MP3**, **Opus**, and 8 kHz **µ-law** (telephony) alongside WAV, via a `format` parameter — smaller payloads and no client-side transcoding. Until then, [convert with `ffmpeg`](/guides/playing-audio#need-mp3-opus).

_Status: planned. Today the API returns WAV (24 kHz, PCM16)._

## OpenAI-compatible endpoint

An `/v1/audio/speech` endpoint matching OpenAI's TTS shape, so you can point the OpenAI SDK (and the wider ecosystem) at Geko by changing the base URL and model.

_Status: planned._

## Python SDK

A `geko` Python package mirroring this SDK's surface (`geko.tts.create(...)`), for Python-first backends and agents.

_Status: planned. Today the official SDK is TypeScript/JavaScript (`@gekoai/sdk`)._

## Word / character timestamps

Optional alignment data for captions, subtitles, and highlight-as-it-speaks UIs.

_Status: planned._

## Browser (CORS)

CORS support so key-restricted frontends can call the API directly. Until then, [proxy through your server](/guides/frameworks) and keep your key server-side.

_Status: planned._

## More languages & voices

Tokay is Kazakh today. New languages and voices appear on the same endpoints — `GET /v1/models` and `GET /v1/voices` are the source of truth, so code that reads them adapts automatically.

---

> Want one of these sooner, or have a use case that needs it? Open an issue on [GitHub](https://github.com/gekoai) — it genuinely helps prioritize.
