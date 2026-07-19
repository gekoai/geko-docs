# Text normalization

By default (`normalize: true`) Geko expands machine-y text — numbers, currency, percentages, dates, times — into how a Kazakh speaker would actually **say** it, before synthesis. This is why `152` comes out as words, not "one-five-two".

```ts
await geko.tts.create({
  text: "Тапсырыс нөмірі 152, сомасы 5500 ₸, жеңілдік 15%.",
  voice: "Aigerim",
});
// "152", "5500 ₸", "15%" are spoken as full Kazakh words
```

## What it handles

- **Numbers** — `152` → spoken cardinal form.
- **Currency** — `5500 ₸` → the amount in words + "теңге".
- **Percentages** — `15%` → "…пайыз".
- **Dates & times** — written forms → spoken forms.
- Common abbreviations and symbols.

The normalizer is **Kazakh-specific** (it lives in `serve/normalize.py`). As more languages ship, each gets its own normalizer.

## When to turn it off

Set `normalize: false` if:

- Your text is **already** written exactly as it should be spoken.
- You're feeding pre-processed / SSML-like text from your own pipeline.
- You want digits read out literally by your own rules.

```ts
await geko.tts.create({ text: "бір бір бір", voice: "Aigerim", normalize: false });
```

CLI:

```bash
gekoai say "бір бір бір" --no-normalize -o out.wav
```

## Tips

- Keep punctuation — it guides phrasing and pauses. A trailing `.`/`!`/`?` helps the model finish the last word cleanly (the server adds one if you omit it).
- If a specific number or name is mispronounced, try spelling it phonetically in the text with `normalize: false`, or open an issue with the example.
