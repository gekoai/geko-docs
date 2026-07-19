# Playing & saving audio

`tts.create()` (and `POST /v1/tts`) return raw **WAV** bytes — 24 kHz, 16-bit PCM, mono. Here's how to use them in each environment.

## Node — save to a file

```ts
import { Geko } from "@gekoai/sdk";
import { writeFile } from "node:fs/promises";

const geko = new Geko({ apiKey: process.env.GEKO_API_KEY });
const audio = await geko.tts.create({ text: "Сәлем", voice: "Aigerim" });

await writeFile("hello.wav", Buffer.from(audio));
```

`audio` is an `ArrayBuffer`; `Buffer.from(audio)` wraps it without copying the underlying bytes.

## Node — play it

```ts
import { spawn } from "node:child_process";
// after writing hello.wav:
spawn(process.platform === "darwin" ? "afplay" : "aplay", ["hello.wav"]);
```

## Browser — play from bytes

Fetch the audio from **your own server endpoint** (never call Geko directly from the browser — see [Use it in your app](/guides/frameworks)), then:

```ts
const res = await fetch("/api/tts", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ text: "Сәлем", voice: "Aigerim" }),
});
const bytes = await res.arrayBuffer();

const url = URL.createObjectURL(new Blob([bytes], { type: "audio/wav" }));
new Audio(url).play();
// revoke when done: URL.revokeObjectURL(url)
```

## curl — straight to disk

```bash
curl -X POST https://geko--tokay-serve-web.modal.run/v1/tts \
  -H "Authorization: Bearer $GEKO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"Сәлем","voice":"Aigerim"}' \
  --output hello.wav
```

## Need MP3 / Opus?

The API returns WAV today (MP3/Opus are on the [roadmap](/roadmap)). Convert locally with `ffmpeg` in the meantime:

```bash
ffmpeg -i hello.wav -b:a 128k hello.mp3      # MP3
ffmpeg -i hello.wav -c:a libopus hello.opus  # Opus
```

## Telephony (8 kHz µ-law)

For Twilio/SIP you'll want 8 kHz µ-law. Until it's a native output option, transcode:

```bash
ffmpeg -i hello.wav -ar 8000 -ac 1 -f mulaw hello.ulaw
```
