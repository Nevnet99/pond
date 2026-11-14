# Starlight docs

Pond’s narrative documentation site (`apps/docs`).

## Role vs Storybook

| Surface | Job |
| --- | --- |
| **Starlight** | Get started, theming, contributing, Patterns, and per-component narrative pages |
| **Storybook** | Live states, controls, CEM-backed API |

Starlight does not re-host every Storybook control. Component pages **link** to Storybook for interactive playgrounds where useful.

## Site IA (sidebar)

1. Getting started  
2. Theming (tokens, `--pond-*`, light / dark)  
3. Primitives  
4. Components  
5. Patterns  
6. Accessibility  
7. Contributing / forking  

## Component page shape (Atlassian-like)

Each Component page opens with a short header (name + one-line purpose), then **tabs**:

| Tab | Content |
| --- | --- |
| **Examples** | Canonical compositions / screenshots or embedded demos |
| **Code** | Install/import snippets; deep API stays in Storybook/CEM with a link |
| **Usage** | When to use / when not; do–don’t |
| **Changelog** | Component-scoped history (ties into release notes later) |
| **Accessibility** | That component’s manual AA checklist + notes |
| **Patterns** | Related Patterns that use this Component (or “none yet”) |

Primitives may use a thinner tab set if some tabs don’t apply.

## Theme

Docs use Pond light/dark tokens where practical so the site demos the system. Best-effort — don’t block docs if Starlight chrome can’t map 1:1.

## Deploy

`apps/docs` is deployable on its own (GitHub Pages, Cloudflare Pages, etc.) from any fork.
