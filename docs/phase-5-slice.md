# Phase 5 component slice

North star breadth remains the Atlassian Design inventory. **Phase 5** is overlays, loading, and composition helpers after [Phase 4](./phase-4-slice.md) — still not the full ADS list.

## Prerequisites

- Phase 0–4 shipped on `master` ([v1-slice.md](./v1-slice.md), [phase-3-slice.md](./phase-3-slice.md), [phase-4-slice.md](./phase-4-slice.md))
- Component [DoD](./component-dod.md) unchanged (`appearance="plain"`, stories, Starlight tabs, unit/axe/VRT)
- Build wave uses GitHub first-party stacks (`gh stack` / stack object on github.com)

## Product Components (build order)

1. **Visually hidden** — Lit `pond-visually-hidden` with a default slot (not CSS-only)
2. **Skeleton**
3. **Progress bar** — determinate `value` in `0–1` only (indeterminate later)
4. **Inline message** — compact field-/control-adjacent notice
5. **Avatar group** — layout/composition over existing Avatar
6. **Tag group** — layout/composition over existing Tag
7. **Blanket** — slottable full-viewport (or host-sized) backdrop; optional click-to-dismiss
8. **Popup** — anchored overlay for brief content/controls; **no** page dim; **no** focus trap; Escape-dismissible; restore focus on close
9. **Drawer** — slide-in panel shell (start/end); composes Blanket; **focus trapped** while open; dismissible — not the Navigation system

Pond English names; Lit originals. ADS links may appear in docs for orientation.

## Also in this wave

- **Spinner motion** — slow the existing Spinner spin (today it uses `--pond-motion-duration-normal` per revolution; lengthen so it reads calmer)
- **Modal** — refactor to compose `pond-blanket` and harden focus trap to match Drawer (not a new component)

## Inline message vs peers

| Surface             | Role                                                         |
| ------------------- | ------------------------------------------------------------ |
| **Section message** | Persistent sectional / in-flow alert (already shipped)       |
| **Banner**          | Persistent page-level notice (already shipped)               |
| **Flag**            | Transient toast-style feedback (already shipped)             |
| **Inline message**  | Compact field- or control-adjacent notice (errors / help)    |

## Overlay focus & dimming

| Surface    | Page dim (Blanket) | Focus trap | Notes                                      |
| ---------- | ------------------ | ---------- | ------------------------------------------ |
| **Modal**  | Yes (via Blanket)  | Yes        | Refactored onto Blanket in this wave       |
| **Drawer** | Yes (via Blanket)  | Yes        | Panel shell only                           |
| **Popup**  | No                 | No         | Anchored; restore focus on close           |
| **Blanket**| —                  | —          | Slottable backdrop for Modal/Drawer/custom |

## Explicitly deferred (later / fog)

Full **Navigation system**, **Dynamic table**, **Table tree**, **Inline dialog** (Popup covers the need), Calendar / Date time picker / Range / Form wrapper, Spotlight, Panel / Page, Code / Inline edit, indeterminate Progress bar, deprecated ADS entries, Atlaskit-only tooling, React/Vue wrappers, Figma source-of-truth, i18n/RTL-as-first-class.
