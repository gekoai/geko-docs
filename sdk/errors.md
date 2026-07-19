# Errors & retries

The SDK throws two error types, and retries transient failures automatically.

## Error types

### `GekoError`

The API responded with a non-2xx status. Carries the HTTP `status` and the server's `detail` message.

```ts
import { GekoError } from "@gekoai/sdk";

try {
  await geko.tts.create({ text: "…" });
} catch (err) {
  if (err instanceof GekoError) {
    console.error(`Geko ${err.status}: ${err.detail}`);
  }
}
```

### `GekoConnectionError`

Extends `GekoError` (with `status === 0`). The request never reached the server — a network failure or a client-side timeout. Check `timedOut` and `cause`.

```ts
import { GekoError, GekoConnectionError } from "@gekoai/sdk";

try {
  await geko.tts.create({ text: "…" });
} catch (err) {
  if (err instanceof GekoConnectionError) {
    console.error(err.timedOut ? "timed out" : "network error", err.cause);
  } else if (err instanceof GekoError) {
    console.error(`Geko ${err.status}: ${err.detail}`);
  } else {
    throw err;
  }
}
```

## Status codes

| Status | Meaning | Retried? |
| --- | --- | --- |
| `400` | Bad request (e.g. empty `text`, unknown value). | No |
| `401` | Missing or invalid API key. | No |
| `404` | Unknown model or voice. | No |
| `429` | Out of credits — top up in the console. | **No** (a retry can't create credits) |
| `408` `409` `500` `502` `503` `504` | Transient / server-side. | **Yes** |
| network / timeout | No response received. | **Yes** |

## Automatic retries

On transient failures the SDK retries with **exponential backoff + jitter** (default **2** retries), honoring a `Retry-After` header when present. Configure it:

```ts
const geko = new Geko({
  apiKey: process.env.GEKO_API_KEY,
  maxRetries: 2,     // 0 disables retries
  timeout: 120_000,  // per-request ms; 0 disables
});
```

`429` is deliberately **not** retried — it means you're out of credits, which retrying won't fix.

## Timeouts & cancellation

The default timeout is **120 s** (generous, because a scaled-to-zero GPU can cold-start slowly). Override per client or per call, and cancel with an `AbortSignal`:

```ts
const controller = new AbortController();
const audio = await geko.tts.create({
  text: "…",
  signal: controller.signal,
  timeout: 30_000,
});
// controller.abort() elsewhere to cancel
```

A user-triggered `abort()` propagates as-is (it is **not** retried or wrapped). A client-side timeout surfaces as a `GekoConnectionError` with `timedOut === true`.

## A note on retrying `tts.create`

A `create()` call that times out is retried by default. In the rare case a retry re-triggers a synthesis that had already succeeded server-side, you could be billed twice. If you need strict once-only semantics, set `maxRetries: 0`.
