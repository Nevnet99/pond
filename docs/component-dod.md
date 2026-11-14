# Component definition of done

A Primitive or Component does not merge until this checklist is green. Interactive Components need the full set; layout-only Primitives may skip VRT when there is no meaningful paint diff — say so on the PR.

## Checklist

1. **Lit source** — Lives in `@pond/components`. Visuals consume `--pond-*` tokens only (no hard-coded palette). Documented `::part()` hooks where theming needs them.
2. **Plain / reset** — Host supports `appearance="plain"`. In plain mode there is **no Pond visual CSS** (color, type chrome, radius, shadow, decorative motion). Behavior, slots, Part names, and a11y semantics remain. Focus paint and other chrome are the Consumer’s job; the Starlight Accessibility tab must say that for plain.
3. **Storybook** — Colocated `*.stories.ts` covering primary states (default, disabled, focus-visible, error/busy when relevant) **and** a plain/reset story.
4. **Starlight** — Component page with six tabs: Examples, Code, Usage, Changelog, Accessibility, Patterns. Changelog may start as Unreleased / first entry.
5. **Tests** — Unit/behavior tests, axe on fixtures, and VRT screenshot(s) for canonical Example state(s). Plain mode needs at least one axe run; VRT for plain is optional unless the story is the documented Example.
6. **Changelog / commits** — Conventional Commits that name the component (e.g. `feat(components): add Button`). Starlight Changelog tab updated in the same PR.

## Related

- [Accessibility](./accessibility.md) — WCAG 2.2 AA merge bar
- [Storybook](./storybook.md) — workbench expectations
- [Starlight](./starlight.md) — docs IA and tabs
