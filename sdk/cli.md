# CLI

`@gekoai/sdk` ships a CLI, so you can synthesize speech and browse the catalog without writing code.

```bash
# run without installing
npx @gekoai/sdk say "Сәлеметсіз бе!" --voice Aigerim -o hello.wav

# or install globally → `gekoai`
npm install -g @gekoai/sdk
gekoai say "Сәлем" -o hello.wav
```

Set your key once:

```bash
export GEKO_API_KEY=sk-tokay-...
```

## Commands

### `say <text>`

Synthesize text to a `.wav` file.

```bash
gekoai say "Тапсырыс нөмірі 152 дайын." --voice Arman --nfe 32 -o order.wav
```

| Option | Description |
| --- | --- |
| `--voice <name>` | Voice (default: the model's default, `Aigerim`). |
| `--model <id>` | Model id (default: `tokay-kk-v1`). |
| `--nfe <n>` | Diffusion steps: `16` fast, `32` quality. |
| `--speed <n>` | Speed multiplier (0.5–2). |
| `--no-normalize` | Disable number/currency/date normalization. |
| `--out, -o <file>` | Output path (default: `speech.wav`). |

### `voices`

List voices for a model (no key required).

```bash
gekoai voices
gekoai voices --model tokay-kk-v1 --json
```

### `models`

List available models (no key required).

```bash
gekoai models
gekoai models --json
```

## Global flags

| Flag | Description |
| --- | --- |
| `--api-key <key>` | Override `$GEKO_API_KEY`. |
| `--base-url <url>` | Override the API base URL. |
| `--json` | Machine-readable output (for `voices` / `models`). |
| `--help, -h` | Show help. |
| `--version, -v` | Print the SDK version. |

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success. |
| `1` | API error (the server responded with an error, or the request failed). |
| `2` | Usage error (missing text, missing key, unknown command). |

## Scripting example

Generate a clip per line of a file:

```bash
i=0
while IFS= read -r line; do
  gekoai say "$line" --voice Aigerim -o "clip_$i.wav"
  i=$((i+1))
done < lines.txt
```
