# Phase 8 component slice

North star breadth remains the Atlassian Design inventory. **Phase 8** **finishes the remaining product + foundation surfaces** after [Phase 7](./phase-7-slice.md) — still not a 1:1 Atlaskit clone.

## Prerequisites

- Phase 0–7 shipped on `master`
- Component [DoD](./component-dod.md) unchanged (`appearance="plain"`, stories, Starlight tabs, unit/axe/VRT)
- Build wave uses GitHub first-party stacks (`gh stack` / stack object on github.com)

## Product & foundation (build order)

1. **Logo** — brand mark: optional image + wordmark slot; consumer-owned assets — **no** Atlassian product logos
2. **Object** — content-type glyph for generic nouns (document, folder, link, image, code, person); **not** Atlassian product icons
3. **Flag group** — stacked region for multiple Flags (toast stack)
4. **Spotlight** — coachmark that highlights a target control and teaches a step; dismiss / next — **not** Atlassian onboarding product chrome
5. **Flex** — flexbox layout primitive (beyond Stack / Inline)
6. **Grid** — CSS grid layout primitive
7. **Bleed** — negative-margin layout helper
8. **Metric text** — token-backed typography for numeric metrics
9. **Side nav collapsed rail** — icon-only collapsed mode on Side nav (+ items hide labels, keep accessible names)
10. **Dynamic table reorder** — client-side row reorder controls; **no** remote/async data API

Pond English names; Lit originals. ADS links may appear in docs for orientation.

## Media split

| Surface    | Role                                          |
| ---------- | --------------------------------------------- |
| **Image**  | Photographic / illustrative bitmap            |
| **Tile**   | Rounded square noun asset                     |
| **Logo**   | Brand mark (image and/or wordmark)            |
| **Object** | Content-type glyph for lists, tables, pickers |

## Feedback split

| Surface        | Role                          |
| -------------- | ----------------------------- |
| **Flag**       | Single transient toast        |
| **Flag group** | Stacked Flags region          |
| **Spotlight**  | Feature coachmark on a target |

## Explicitly deferred (later / fog)

Full **Navigation system** (Atlassian-style top + product switcher + mega-nav), **Pressable** / **Anchor** / public **Focusable** primitives (Button + Link cover v1), custom **Inline edit** editors beyond text field, Dynamic table **remote/async** data, **Pragmatic drag and drop** library, deprecated ADS entries, Atlaskit-only tooling, React/Vue wrappers, Figma source-of-truth, i18n/RTL-as-first-class.
