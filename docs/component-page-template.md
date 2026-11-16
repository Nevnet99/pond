# Component page template

Authoring bar for every Primitive / Component Starlight page. Implements Phase 9 polish locks. Pair with [component DoD](./component-dod.md) and [Starlight IA](./starlight.md).

**At-par test (~3 minutes):** a consumer can answer what it’s for, which parts/slots, which attributes, keyboard + AT guarantees, and a path to a real pattern — without reading source.

## Required page shape

Use `ComponentTabs` with all six tabs filled to the bar below. Empty **Patterns** (“None yet”) is **not** compliant.

### Intro (above tabs)

1. **Purpose** — 1–2 sentences: design rationale + when-_not_-this (link related components).
2. Optional one-liner for `appearance="plain"`.

### Examples

Progression (skip steps that do not apply; do not ship a naked gallery):

1. Default / happy path
2. Variants (each with **when to use**)
3. States (disabled, error, selected, **pending/busy** when shipped)
4. Controlled / form composition when relevant
5. Edge cases (truncation, overflow, empty)
6. Plain / reset

Each `PondDemo` needs a clear label and short when-to-use prose in the surrounding MDX.

### Code

1. Copy-paste happy-path snippet first.
2. **API** — attributes, events, slots, CSS `::part()` hooks, defaults. Prefer tables generated from CEM; hand-write only where CEM is incomplete.
3. Call out native HTML attribute exceptions and a11y consequences beside risky attrs (`disabled`, `pending`, overlays).

### Usage

1. **Purpose** restated if needed
2. **Anatomy** — parts + slots (labeled list or diagram)
3. **Do / Don’t** via `DosDonts` + any extra rules
4. **Content guidelines** — case, verbs, empty/error/confirm copy where the component shows text
5. **Related components** — choose-this-not-that
6. **Happy path vs `appearance="plain"`** — plain = consumer owns focus paint + contrast; behavior/slots/parts/a11y remain

### Accessibility

Use `<A11ySection component="…" />` backed by `apps/docs/src/data/a11y.ts`:

- Summary
- Keyboard list (required for interactive components)
- WCAG 2.2 AA criteria table
- Notes
- **Limitations** — required when anything is not fully accessible or is easy to misuse (disabled tab-order removal, plain-mode duties, live-region caveats, virtualization, etc.)

### Patterns

At least one of:

- A real composition demo, or
- Explicit “prefer **X** instead” with link

### Changelog

Component-scoped history in the same PR as the behavior/docs change.

## Pilot reference order

Button → Link → Text field → Modal → Select ([phase-9-slice](./phase-9-slice.md)).
