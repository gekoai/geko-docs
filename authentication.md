# Authentication

## API keys

`POST /v1/tts` is authenticated with a **bearer token**:

```
Authorization: Bearer sk-tokay-...
```

Create and manage keys in the [Geko console](https://github.com/gekoai/geko-console). A key is shown **once** at creation — store it then; the server only keeps a hash.

The catalog endpoints — `/v1/models`, `/v1/voices`, `/health` — are **open** and need no key, so docs, playgrounds, and voice pickers can render without one.

## With the SDK

Pass the key explicitly, or let the SDK read it from the environment:

```ts
import { Geko } from "@gekoai/sdk";

// explicit
const geko = new Geko({ apiKey: "sk-tokay-..." });

// or from GEKO_API_KEY (falls back to TOKAY_API_KEY)
const geko2 = new Geko();
```

```bash
export GEKO_API_KEY=sk-tokay-...
```

## Keep keys server-side

Your key grants billable usage. **Never ship it to a browser or mobile app.**

- ✅ Call Geko from your backend (API route, server, worker, function).
- ✅ Expose your *own* thin endpoint to your frontend; keep the Geko key on the server.
- ❌ Don't put the key in client-side JS, a public repo, or a mobile bundle.

The API also does not currently send CORS headers, so direct cross-origin browser calls are blocked anyway — another reason to proxy through your server. See [Use it in your app](/guides/frameworks) for a Next.js route example. (Browser CORS is on the [roadmap](/roadmap).)

## Quotas & billing

Keys are metered per organization. If you run out of credits, `POST /v1/tts` returns **HTTP 429** with a `detail` explaining you're out of credits — top up in the console. The SDK surfaces this as a `GekoError` (`status === 429`) and does **not** retry it (a retry can't create credits). See [Errors & retries](/sdk/errors).

## Rotating a key

Revoke a key in the console and issue a new one. Revocation takes effect within a short caching window (the API caches key lookups for ~30 s).
