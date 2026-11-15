# Phase 3 component slice

North star breadth remains the Atlassian Design inventory. **Phase 3** is navigation and structure after the [v1 slice](./v1-slice.md) — still not the full ADS list.

## Prerequisites

- Phase 0–2 from [v1-slice.md](./v1-slice.md) shipped on `master`
- Component [DoD](./component-dod.md) unchanged (`appearance="plain"`, stories, Starlight tabs, unit/axe/VRT)

## Product Components (build order)

1. **Tabs**
2. **Breadcrumbs**
3. **Pagination**
4. **Menu** (dropdown actions — not the full Navigation system)
5. **Page header** (slot-based shell last so it can compose the others)

Pond English names; Lit originals. ADS links may appear in docs for orientation.

## Icons

Phase 3 ships with **slots / text labels** for leading visuals. Consumers may drop in SVG. An Icon system does **not** block this slice.

## Page header

**Page header** is a slot-based shell (title, actions, breadcrumbs region, optional bottom region). Consumers compose Breadcrumbs, Tabs, and peers into slots — Pond does not hard-wire those components inside the header.

## Explicitly deferred from Phase 3

Flag, Banner, Avatar, Table, Empty state, Icon set, Tag, Radio, multi-select Select, full Navigation system / drawers / side nav, deprecated ADS entries, and Atlaskit-only tooling stayed out of Phase 3.

**Phase 4** (data & density + deferred forms) is locked in [phase-4-slice.md](./phase-4-slice.md).
