# Starlight docs

Pond’s narrative documentation site (`apps/docs`).

## Role vs Storybook

| Surface       | Job                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **Starlight** | Get started, theming, contributing, Patterns, and per-component narrative pages with **live Lit demos** |
| **Storybook** | Full state matrix, controls, CEM-backed API                                                             |

## Sidebar groups

Component pages stay under `content/docs/components/` (and primitives under `primitives/`). The Starlight sidebar groups them the same way as Storybook: **Primitives**, **Forms**, **Feedback**, **Navigation**, **Overlays**, **Data display**, **Media**.

## Component page shape (Atlassian-like)

Each Component / Primitive page uses **`ComponentTabs`** — a horizontal tab bar under the title:

| Tab               | Content                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| **Examples**      | Live `<PondDemo>` frames — default → variants → states → form → edges   |
| **Code**          | Happy-path snippet + **API** (attrs / events / slots / parts; CEM-first) |
| **Usage**         | Purpose, anatomy/Parts, do/don’t, content guidelines, related, plain    |
| **Accessibility** | Keyboard, WCAG criteria, notes, **limitations** (`A11ySection`)         |
| **Patterns**      | Real composition or “prefer X instead” — not empty for compliant pages  |
| **Changelog**     | Component-scoped history                                                |

ADS folds a11y into Usage; Pond keeps a dedicated **Accessibility** tab so keyboard matrices and limitations stay findable. Put Parts, content guidelines, and related-component links in **Usage**.

Full authoring bar: [component-page-template.md](./component-page-template.md).

Implementation: `apps/docs/src/components/ComponentTabs.astro` + `PondDemo.astro` (registers `@pond/components` on the client). We do **not** use Starlight’s built-in `<Tabs>` / `<TabItem>` (Astro 7 MDX native-binding breakage).

Tokens load via Starlight `customCss` → `src/styles/pond-docs.css`.

## Theme

Docs use Pond light/dark tokens on demos. Starlight chrome stays best-effort.

## Deploy

`apps/docs` is deployable on its own (GitHub Pages, Cloudflare Pages, etc.) from any fork.
