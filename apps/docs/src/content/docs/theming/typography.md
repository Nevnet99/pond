---

title: Typography
description: Pond type scale, line height, and how Text / Heading use it.
---

Pond ships a **nine-step rem scale** (16px base). See the repo [docs/typography.md](https://github.com/Nevnet99/pond/blob/master/docs/typography.md) for the full table.

## Quick map

| Step        | rem        | Use                  |
| ----------- | ---------- | -------------------- |
| `xs`–`sm`   | 0.75–0.875 | Caption / helper     |
| `md`        | 1          | Body                 |
| `lg`–`xl`   | 1.125–1.25 | Lead / compact title |
| `2xl`–`5xl` | 1.5–3      | Headings             |

## Text

```html
<pond-text size="sm" muted>Helper</pond-text>
<pond-text>Body</pond-text>
<pond-text size="lg">Lead</pond-text>
```

## Heading

`level` = document outline. `size` = visual step (optional; defaults from level).

```html
<pond-heading level="1">Page title</pond-heading>
<pond-heading level="2" size="lg">h2 that looks smaller</pond-heading>
```

Do **not** skip heading levels to change size — use `size`.
