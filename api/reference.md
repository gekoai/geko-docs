# HTTP API reference

Geko is a plain JSON + `audio/wav` API — call it from any language.

**Base URL**

```
https://geko--tokay-serve-web.modal.run
```

**Auth** — `POST /v1/tts` requires `Authorization: Bearer <key>`. The `GET` catalog endpoints are open.

Interactive OpenAPI docs are served at `/docs`.

---

## `POST /v1/tts`

Synthesize speech. Returns raw **WAV** (`audio/wav`, 24 kHz, PCM16, mono).

**Headers**

```
Authorization: Bearer sk-tokay-...
Content-Type: application/json
```

**Body**

```json
{
  "text": "Сәлеметсіз бе! Тапсырыс нөмірі 152, сомасы 5500 ₸.",
  "model": "tokay-kk-v1",
  "voice": "Aigerim",
  "speed": 1.0,
  "nfe": 32,
  "normalize": true
}
```

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `text` | string | — (required) | Text to synthesize (up to ~5000 chars). |
| `model` | string | `tokay-kk-v1` | Model id. |
| `voice` | string | model default (`Aigerim`) | Voice name from `/v1/voices`. |
| `speed` | number | `1.0` | Speed multiplier (0.5–2). |
| `nfe` | integer | `32` | Diffusion steps: `16` fast, `32` quality. |
| `normalize` | boolean | `true` | Expand numbers/currency/dates into spoken Kazakh. |

**Response** — `200 OK`, body is WAV bytes. Header `X-Tokay-Chars` reports the billed character count.

**Example**

```bash
curl -X POST https://geko--tokay-serve-web.modal.run/v1/tts \
  -H "Authorization: Bearer $GEKO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"Сәлеметсіз бе!","model":"tokay-kk-v1","voice":"Aigerim"}' \
  --output out.wav
```

---

## `GET /v1/models`

List models on the platform and their voices. **Open** (no key).

```bash
curl https://geko--tokay-serve-web.modal.run/v1/models
```

```json
{
  "data": [
    {
      "name": "tokay-kk-v1",
      "lang": "kk",
      "sample_rate": 24000,
      "voices": ["Aigerim", "Arman", "Ainur", "Aruzhan", "Sanzhar", "Yerlan"],
      "default_voice": "Aigerim"
    }
  ]
}
```

---

## `GET /v1/voices`

Voice catalog for a model. **Open** (no key).

**Query** — `model` (default `tokay-kk-v1`).

```bash
curl "https://geko--tokay-serve-web.modal.run/v1/voices?model=tokay-kk-v1"
```

```json
{
  "model": "tokay-kk-v1",
  "voices": [
    { "name": "Aigerim", "gender": "female", "style": "Warm, professional", "best_for": "Reception, customer support" }
  ]
}
```

---

## `GET /health`

Service status. **Open** (no key).

```bash
curl https://geko--tokay-serve-web.modal.run/health
```

```json
{ "status": "ok", "models": ["tokay-kk-v1"] }
```

---

## Errors

Errors come back as JSON with a `detail` string and the matching HTTP status:

```json
{ "detail": "out of credits — top up in the geko console" }
```

| Status | Meaning |
| --- | --- |
| `400` | Bad request — missing `text`, malformed body, or an invalid value. |
| `401` | Missing or invalid API key. |
| `404` | Unknown model or voice. |
| `429` | Out of credits. |
| `503` | Auth backend temporarily unavailable (transient — retry). |

See [Errors & retries](/sdk/errors) for retry guidance.
