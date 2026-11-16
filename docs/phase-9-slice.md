# Phase 9 polish slice

Phase 9 is **docs / API / a11y polish** — not new catalog breadth. North star references: Atlassian Design Button pages, React Aria component docs (clarity bar), and DesignSystems.com purpose / compliance / content lessons. Research lives in the Hearthstone hub (`/maps/pond/research/docs-a11y-polish-bar`).

## Prerequisites

- Phase 0–8 shipped on `master`
- Component [DoD](./component-dod.md) + [component page template](./component-page-template.md) raised in this wave’s first PR
- Build wave uses GitHub first-party stacks (`gh stack`)

## Locked decisions

| Topic      | Lock                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| Shape      | Raise docs DoD + page template first, then pilot five, then family batches                                          |
| Tabs       | Keep **Accessibility** + **Patterns** tabs; deepen **Usage** (Parts, content, related, happy path vs `plain`)       |
| API naming | Native Lit/HTML attributes (`disabled`, `aria-*`); no Atlaskit-style `isDisabled` renames                           |
| Disabled   | Prefer keep pressable + validate; document tab-order / SR traps where `disabled` remains; never tooltip-on-disabled |
| Pending    | Button ships boolean `pending` — focusable, non-activating, busy for AT                                             |
| API tables | CEM-backed first; hand-fill gaps                                                                                    |
| Patterns   | Ban empty “None yet” for compliant pages — composition or “prefer X instead”                                        |
| Matrix     | Hub shipped-vs-docs-complete matrix deferred to **P2** after the pilot                                              |

## Build order (stack)

1. **Docs DoD + template + this slice** — shared a11y `limitations` catalog field; Starlight/DoD/page template
2. **Button** — ADS parity target; `pending`; avoid-first disabled docs
3. **Link** — button vs navigation disambiguation
4. **Text field** — labels / errors / content guidelines
5. **Modal** — trap, Escape, restore; content guidelines
6. **Select** — keyboard + naming; content guidelines

## After the pilot (family batches)

1. Forms
2. Overlays
3. Status / feedback
4. Nav / chrome
5. Data
6. Layout / primitives

Each batch applies the same page template + a11y contract. Prefer `gh stack` per family.

## Explicitly deferred (P2 / fog)

Hub compliance matrix UI, full UI glossary, localization / string-length notes, Figma outline mirroring, React/Vue wrappers, full Navigation system, Pressable/Anchor/Focusable primitives, remote Dynamic table.
