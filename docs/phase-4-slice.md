# Phase 4 component slice

North star breadth remains the Atlassian Design inventory. **Phase 4** is data & density (plus deferred forms) after [Phase 3](./phase-3-slice.md) — still not the full ADS list.

## Prerequisites

- Phase 0–3 shipped on `master` ([v1-slice.md](./v1-slice.md), [phase-3-slice.md](./phase-3-slice.md))
- Component [DoD](./component-dod.md) unchanged (`appearance="plain"`, stories, Starlight tabs, unit/axe/VRT)
- Build wave uses GitHub first-party stacks (`gh stack` / stack object on github.com)

## Product Components (build order)

1. **Icon**
2. **Avatar**
3. **Tag**
4. **Empty state**
5. **Banner** — persistent in-page / page-top notice (closable optional)
6. **Flag** — transient toast-style feedback (auto-dismiss optional)
7. **Radio**
8. **Select (multi)** — extends existing `pond-select` (multi mode); not a second component
9. **Table** — simple data table only (not Dynamic table / Table tree)

Pond English names; Lit originals. ADS links may appear in docs for orientation.

## Banner vs Flag vs Section message

| Surface             | Role                                                   |
| ------------------- | ------------------------------------------------------ |
| **Section message** | Persistent sectional / in-flow alert (already shipped) |
| **Banner**          | Persistent page-level notice                           |
| **Flag**            | Transient toast-style feedback                         |

## Icon

Icon ships in this slice (early) so Avatar / Tag / Empty can use it. Delivery shape (custom set vs remix vs sprite) is an implementation decision under the Icon ticket — not a separate charting blocker.

## Explicitly deferred (later / fog)

Full Navigation system / drawers / side nav, Dynamic table / Table tree, deprecated ADS entries, Atlaskit-only tooling, React/Vue wrappers, Figma source-of-truth, i18n/RTL-as-first-class.
