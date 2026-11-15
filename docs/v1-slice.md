# v1 component slice

North star breadth remains the Atlassian Design inventory. **v1** is the first consumer-visible catalog after foundations — not the full ADS list.

## Phase 0 — Foundations

- Design tokens (`@pond/tokens` → `plain.css`, `--pond-*`)
- Shared focus ring / focusable affordance
- Light + dark themes

## Phase 1 — Layout & type (Primitives)

Must ship before product Components:

1. **Box**
2. **Stack**
3. **Inline**
4. **Text**
5. **Heading**

Text and Heading are both required in v1 (not optional).

## Phase 2 — Product Components (build order)

1. **Button**
2. **Link**
3. **Text field**
4. **Text area**
5. **Checkbox**
6. **Toggle**
7. **Select** (single-select first)
8. **Badge**
9. **Lozenge**
10. **Spinner**
11. **Tooltip**
12. **Modal**
13. **Section message**

Pond English names; Lit originals. ADS links may appear in docs for orientation. Every entry follows [component-dod.md](./component-dod.md), including `appearance="plain"`.

## Explicitly deferred from v1

Tabs, Breadcrumbs, Pagination, Menu, Page header, Navigation system, Table, Banner/Flag, Avatar, Icon set, Empty state, deprecated ADS entries, and Atlaskit-only tooling stayed out of v1.

**Phase 3** (nav/structure) is locked in [phase-3-slice.md](./phase-3-slice.md).
