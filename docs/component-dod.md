# Component definition of done

A Primitive or Component does not merge until this checklist is green. Interactive Components need the full set; layout-only Primitives may skip VRT when there is no meaningful paint diff — say so on the PR.

## Checklist

1. **Lit source** — Lives in `@pond/components`. Visuals consume `--pond-*` tokens only (no hard-coded palette). Documented `::part()` hooks where theming needs them. Prefer **native HTML/Lit attribute names** consumers already know (`disabled`, `aria-*`); do not rename to framework-fashion aliases.
2. **Plain / reset** — Host supports `appearance="plain"`. In plain mode there is **no Pond visual CSS** (color, type chrome, radius, shadow, decorative motion). Behavior, slots, Part names, and a11y semantics remain. Focus paint and other chrome are the Consumer’s job; Usage and Accessibility must say that for plain.
3. **Storybook** — Colocated `*.stories.ts` covering primary states (default, disabled, focus-visible, error/busy/**pending** when relevant) **and** a plain/reset story.
4. **Starlight** — Component page meets the [component page template](./component-page-template.md): purpose, anatomy, example progression with when-to-use, CEM-first API tables, Usage (do/don’t + content guidelines + related + plain escape hatch), Accessibility (keyboard + criteria + **limitations**), Patterns (no empty “None yet” for compliant pages), Changelog. Tabs: Examples, Code, Usage, Accessibility, Patterns, Changelog.
5. **Tests** — Unit/behavior tests, axe on fixtures, and VRT screenshots for canonical Example state(s) at **mobile (375)**, **tablet (768)**, and **desktop (1280)** via `matchScreenshotAtViewports`. Regenerate with `pnpm test:vrt:update` (Docker) and commit baselines in the PR — CI asserts them. Plain mode needs at least one axe run; VRT for plain is optional unless the story is the documented Example.
6. **Accessibility bar** — WCAG 2.2 AA merge-blocking ([accessibility](./accessibility.md)). Prefer keeping actions pressable and validating over `disabled`. If `disabled` ships, document tab-order / SR impact in Limitations. Loading that blocks activation should use a **focusable pending/busy** pattern where the control supports it (see Button). Never put a tooltip on a disabled control.
7. **Changelog / commits** — Conventional Commits that name the component (e.g. `feat(components): add Button`). Starlight Changelog tab updated in the same PR. Ship on a **pull request** (not direct push to `master`).

## Related

- [Component page template](./component-page-template.md) — tab-by-tab authoring bar
- [Phase 9 slice](./phase-9-slice.md) — polish wave order
- [Accessibility](./accessibility.md) — WCAG 2.2 AA merge bar
- [Storybook](./storybook.md) — workbench expectations
- [Starlight](./starlight.md) — docs IA and tabs
