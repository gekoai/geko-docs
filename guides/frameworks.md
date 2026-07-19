# Use it in your app

The golden rule: **call Geko from your server, and let your frontend call your server.** Your API key stays secret, and you avoid the browser CORS wall.

```
browser ──▶ your backend (holds GEKO_API_KEY) ──▶ Geko API
```

## Next.js (App Router)

A route handler that proxies synthesis. The key never leaves the server.

```ts
// app/api/tts/route.ts
import { Geko, GekoError } from "@gekoai/sdk";

const geko = new Geko({ apiKey: process.env.GEKO_API_KEY });

// cold starts can be slow — give the function room (Vercel: see maxDuration limits)
export const maxDuration = 120;

export async function POST(req: Request) {
  const { text, voice } = await req.json();
  if (!text?.trim()) {
    return Response.json({ error: "text is required" }, { status: 400 });
  }
  try {
    const audio = await geko.tts.create({ text, voice });
    return new Response(audio, {
      headers: { "content-type": "audio/wav", "cache-control": "no-store" },
    });
  } catch (err) {
    if (err instanceof GekoError) {
      return Response.json({ error: err.detail }, { status: err.status || 502 });
    }
    return Response.json({ error: "synthesis failed" }, { status: 502 });
  }
}
```

Call it from a client component:

```ts
async function speak(text: string, voice = "Aigerim") {
  const res = await fetch("/api/tts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text, voice }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  const bytes = await res.arrayBuffer();
  new Audio(URL.createObjectURL(new Blob([bytes], { type: "audio/wav" }))).play();
}
```

## Express

```ts
import express from "express";
import { Geko, GekoError } from "@gekoai/sdk";

const app = express();
app.use(express.json());
const geko = new Geko({ apiKey: process.env.GEKO_API_KEY });

app.post("/tts", async (req, res) => {
  try {
    const audio = await geko.tts.create({ text: req.body.text, voice: req.body.voice });
    res.setHeader("content-type", "audio/wav");
    res.send(Buffer.from(audio));
  } catch (err) {
    const status = err instanceof GekoError ? err.status || 502 : 502;
    res.status(status).json({ error: err instanceof GekoError ? err.detail : "synthesis failed" });
  }
});

app.listen(3000);
```

## Serverless notes

- **Cold starts:** the GPU backend scales to zero, so the first request after idle can take tens of seconds. Raise your function's max duration (e.g. Next.js `maxDuration`) and keep the SDK's default 120 s timeout.
- **Reuse the client:** construct `new Geko(...)` once at module scope, not per request.
- **Don't stream half-built audio:** the API returns the complete WAV in one response today (streaming is on the [roadmap](/roadmap)).
