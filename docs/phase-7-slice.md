# Phase 7 component slice

North star breadth remains the Atlassian Design inventory. **Phase 7** is **app chrome & dense data** after [Phase 6](./phase-6-slice.md) — still not the full ADS list.

## Prerequisites

- Phase 0–6 shipped on `master` ([v1-slice.md](./v1-slice.md), [phase-3-slice.md](./phase-3-slice.md), [phase-4-slice.md](./phase-4-slice.md), [phase-5-slice.md](./phase-5-slice.md), [phase-6-slice.md](./phase-6-slice.md))
- Library improvement wave on `master`: spacing, motion, typography, Accessibility WCAG tabs, Usage do’s/don’ts
- Component [DoD](./component-dod.md) unchanged (`appearance="plain"`, stories, Starlight tabs, unit/axe/VRT)
- Build wave uses GitHub first-party stacks (`gh stack` / stack object on github.com)

## Product Components (build order)

1. **Page** — page layout grid / sections for main content chrome
2. **Panel** — contextual side container alongside the main page
3. **Side nav** — vertical nav: sections, items (link or button), optional one-level nest, section collapse/expand, current-item indicator; slot icons — **not** the full Atlassian Navigation system (no top bar, product switcher, or mega-nav)
4. **Inline dialog** — anchored pop-up for short content **and** optional actions/controls; Popup stays the lighter non-modal overlay shell
5. **Image** — image that can respect light/dark theme
6. **Tile** — rounded square asset representing a noun
7. **Time picker** — standalone time control (Date time picker already ships combined date+time)
8. **Comment** — single discussion item (Avatar + author/meta + body + optional action slot); no threaded nest, live editor, or reactions system
9. **Dynamic table** — on top of simple Table: client-side **column sort** + **pagination** (compose Pagination); **no** row reorder, **no** remote/async data API in this phase
10. **Table tree** — expandable nested rows with indent; **no** lazy-load children API, **no** tree+drag, **no** selection model beyond Dynamic table

Pond English names; Lit originals. ADS links may appear in docs for orientation.

## Chrome surfaces

| Surface      | Role                                                    |
| ------------ | ------------------------------------------------------- |
| **Page**     | Page-level layout sections                              |
| **Panel**    | Contextual side content                                 |
| **Side nav** | App navigation rail (sections / items / one nest level) |

## Overlay split

| Surface             | Role                                                   |
| ------------------- | ------------------------------------------------------ |
| **Popup** (shipped) | Light non-modal overlay shell                          |
| **Inline dialog**   | Anchored short content + optional interactive controls |

## Table surfaces

| Surface             | Role                        |
| ------------------- | --------------------------- |
| **Table** (shipped) | Simple data table           |
| **Dynamic table**   | Sort + pagination           |
| **Table tree**      | Expandable nested hierarchy |

## Explicitly deferred (later / fog)

Full **Navigation system** (Atlassian-style top + side + switcher), **Spotlight**, **Logo**, **Object**, custom **Inline edit** editors, collapsed icon-only side-nav rail polish, Dynamic table **reorder** / remote data, deprecated ADS entries, Atlaskit-only tooling, React/Vue wrappers, Figma source-of-truth, i18n/RTL-as-first-class.
