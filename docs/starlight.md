# Starlight docs

Pond’s narrative documentation site (`apps/docs`).

## Role vs Storybook

| Surface       | Job                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **Starlight** | Get started, theming, contributing, Patterns, and per-component narrative pages with **live Lit demos** |
| **Storybook** | Full state matrix, controls, CEM-backed API                                                             |

## Component page shape (Atlassian-like)

Each Component / Primitive page uses **`ComponentTabs`** — a horizontal tab bar under the title:

| Tab               | Content                                              |
| ----------------- | ---------------------------------------------------- |
| **Examples**      | Live `<PondDemo>` frames with real Pond Lit elements |
| **Code**          | Snippets                                             |
| **Usage**         | When to use / when not                               |
| **Changelog**     | Component-scoped history                             |
| **Accessibility** | Manual AA checklist + notes                          |
| **Patterns**      | Related Patterns (or “none yet”)                     |

Implementation: `apps/docs/src/components/ComponentTabs.astro` + `PondDemo.astro` (registers `@pond/components` on the client). We do **not** use Starlight’s built-in `<Tabs>` / `<TabItem>` (Astro 7 MDX native-binding breakage).

Tokens load via Starlight `customCss` → `src/styles/pond-docs.css`.

## Theme

Docs use Pond light/dark tokens on demos. Starlight chrome stays best-effort.

## Deploy

`apps/docs` is deployable on its own (GitHub Pages, Cloudflare Pages, etc.) from any fork.
