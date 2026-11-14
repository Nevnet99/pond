---

title: Tokens & themes
description: --pond-* custom properties and light/dark themes.
---

`@pond/tokens` emits `plain.css` with `--pond-*` custom properties.

```html
<link rel="stylesheet" href="node_modules/@pond/tokens/plain.css" />
<html data-theme="light">
```

Switch theme with `data-theme="dark"` on `html` (or `:root`). Prefer overriding **semantic** tokens before component-level ones.
