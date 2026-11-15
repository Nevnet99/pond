# Phase 6 component slice

North star breadth remains the Atlassian Design inventory. **Phase 6** is forms & journeys after [Phase 5](./phase-5-slice.md) — still not the full ADS list.

## Prerequisites

- Phase 0–5 shipped on `master` ([v1-slice.md](./v1-slice.md), [phase-3-slice.md](./phase-3-slice.md), [phase-4-slice.md](./phase-4-slice.md), [phase-5-slice.md](./phase-5-slice.md))
- Component [DoD](./component-dod.md) unchanged (`appearance="plain"`, stories, Starlight tabs, unit/axe/VRT)
- Build wave uses GitHub first-party stacks (`gh stack` / stack object on github.com)

## Product Components (build order)

1. **Range**
2. **Calendar** — month grid; single-date select; prev/next month (no range-select, no multi-month, no time)
3. **Date time picker** — date (via Calendar) + time in one control; no standalone Time picker in this phase
4. **Date label** — non-interactive date display
5. **Form** — layout + validation shell; consumers slot existing fields (not a new input)
6. **Progress indicator** — short sequence position (e.g. dots / “step 2 of 4”)
7. **Progress tracker** — labeled multi-step journey with statuses (todo / current / done)
8. **Progress bar (indeterminate)** — extend existing `pond-progress-bar` (not a second component)
9. **Code** — inline snippet; optional simple block variant; **no** syntax-highlighter dependency
10. **Inline edit** — read → edit → commit/cancel; default **text field** editor only

Pond English names; Lit originals. ADS links may appear in docs for orientation.

## Also in this wave

- **Avatar group polish** — fix overlap rings so they follow the circular face (no hard rectangular lines from host box-shadow)

## Progress surfaces

| Surface                | Role                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| **Progress bar**       | Continuous fill — determinate (shipped) / indeterminate (Phase 6) |
| **Progress indicator** | Position in a short sequence                                      |
| **Progress tracker**   | Labeled steps with per-step status                                |

## Date surfaces

| Surface              | Role                                |
| -------------------- | ----------------------------------- |
| **Calendar**         | Interactive month grid; single date |
| **Date time picker** | Combined date + time value          |
| **Date label**       | Non-interactive formatted date      |

## Explicitly deferred (later / fog)

Items pulled into **Phase 7** are locked in [phase-7-slice.md](./phase-7-slice.md). Still later: full **Navigation system**, Spotlight, Logo, Object, custom Inline edit editors, deprecated ADS entries, Atlaskit-only tooling, React/Vue wrappers, Figma source-of-truth, i18n/RTL-as-first-class.
