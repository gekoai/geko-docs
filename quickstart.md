# Quickstart

From zero to your first `hello.wav` in three steps.

## 1. Get an API key

Create a key in the [Geko console](https://github.com/gekoai/geko-console). Keys look like `sk-tokay-…`. Keep it server-side — treat it like a password.

```bash
export GEKO_API_KEY=sk-tokay-...
```

## 2. Make a sound

Pick whichever feels natural — all three do the same thing.

::: code-group

```bash [CLI]
# no code, no install
npx @gekoai/sdk say "Сәлеметсіз бе!" --voice Aigerim -o hello.wav
```

```ts [SDK (Node)]
import { Geko } from "@gekoai/sdk";
import { writeFile } from "node:fs/promises";

const geko = new Geko({ apiKey: process.env.GEKO_API_KEY });

const audio = await geko.tts.create({
  text: "Сәлеметсіз бе!",
  voice: "Aigerim",
});

await writeFile("hello.wav", Buffer.from(audio));
```

```bash [curl]
curl -X POST https://geko--tokay-serve-web.modal.run/v1/tts \
  -H "Authorization: Bearer $GEKO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"Сәлеметсіз бе!","voice":"Aigerim"}' \
  --output hello.wav
```

:::

## 3. Play it

```bash
# macOS
afplay hello.wav
# Linux
aplay hello.wav
```

That's it. `hello.wav` is 24 kHz, 16-bit PCM mono.

## Install the SDK

```bash
npm install @gekoai/sdk
```

The SDK has **no runtime dependencies** and ships both ESM and CommonJS with types. Requires Node 20+ (or Deno/Bun/modern browsers).

## What next

- Browse [voices](/voices) and pick one by ear.
- Tune [latency vs. quality](/guides/latency) with `nfe`.
- Wire it into [your app](/guides/frameworks) (Next.js, Express) — the right way, server-side.
- Handle [errors & retries](/sdk/errors) for production.

> **First call slow?** The GPU backend scales to zero when idle, so a cold start can take tens of seconds; subsequent calls are fast. The SDK's default timeout (120 s) accounts for this.
