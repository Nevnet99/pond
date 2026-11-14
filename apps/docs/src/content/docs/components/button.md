---

title: Button
description: Primary action control.
---

Triggers an action. Default appearance uses accent tokens; `appearance="plain"` strips Pond visuals.

## Examples

Default, disabled, and plain stories live in Storybook under Components/Button.

## Code

```html
<pond-button>Save changes</pond-button>
<pond-button appearance="plain">Unstyled action</pond-button>
<pond-button disabled>Disabled</pond-button>
```

## Usage

**Do** use for actions. **Don't** use for navigation — use Link (when it ships).

## Changelog

Unreleased — initial Button.

## Accessibility

Native `<button>` with visible focus ring in default appearance. Manual checklist: focus order, accessible name, disabled state announced. In plain mode Pond applies no visual CSS — you own focus paint.

## Patterns

None yet.
