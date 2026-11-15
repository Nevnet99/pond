# Typography

Pond type is a **nine-step rem scale** from a 16px base, plus line-height and tracking tokens. Components consume the scale; they do not invent one-off sizes.

## Scale

| Step  | rem   | ≈px | Role                       |
| ----- | ----- | --- | -------------------------- |
| `xs`  | 0.75  | 12  | Captions, meta, timestamps |
| `sm`  | 0.875 | 14  | Secondary body, helpers    |
| `md`  | 1     | 16  | Default body (base)        |
| `lg`  | 1.125 | 18  | Lead / intro paragraphs    |
| `xl`  | 1.25  | 20  | Compact titles, h6 default |
| `2xl` | 1.5   | 24  | h5 default                 |
| `3xl` | 1.875 | 30  | h3 / h4 default            |
| `4xl` | 2.25  | 36  | h2 default                 |
| `5xl` | 3     | 48  | h1 / page title            |

CSS: `--pond-font-size-xs` … `--pond-font-size-5xl`.

## Line height & tracking

| Token                         | Value   | Use                          |
| ----------------------------- | ------- | ---------------------------- |
| `--pond-font-line-tight`      | 1.2     | Large headings               |
| `--pond-font-line-snug`       | 1.35    | Small headings               |
| `--pond-font-line-normal`     | 1.5     | Body                         |
| `--pond-font-line-relaxed`    | 1.65    | Long-form / lead             |
| `--pond-font-tracking-tight`  | -0.02em | Large display                |
| `--pond-font-tracking-normal` | 0       | Default                      |
| `--pond-font-tracking-wide`   | 0.05em  | Uppercase labels / overlines |

## Families

- `--pond-font-family-sans` — UI / body (IBM Plex Sans)
- `--pond-font-family-display` — headings (same face for v1; swap in a fork)
- `--pond-font-family-mono` — code

## Rendering defaults

- Root smoothing (`antialiased`) is emitted once from `@pond/tokens` — do not re-apply per component.
- Cap long-form measure (~60–75ch) on the reading column; `pond-text` does not force a max-width.
- Form controls use `--pond-font-size-md` (16px) so iOS does not zoom on focus.
- Changing numbers (Badge) use `tabular-nums`.

## Components

- **`pond-text`** — body steps `xs`–`xl` via `size`; `pretty` wrap + `overflow-wrap`
- **`pond-heading`** — `level` is semantics (h1–h6); visual size defaults from level, override with `size` when you need emphasis without skipping outline levels; `balance` wrap

```html
<pond-text size="lg">Lead paragraph</pond-text>
<pond-heading level="2">Section</pond-heading>
<pond-heading level="2" size="lg">Same outline level, smaller type</pond-heading>
```
