# Pond

A WCAG AA–oriented design system built with [Lit](https://lit.dev). Brandable defaults, meant to be **forked** and owned.

This upstream repo is **not** published to npm by its owner. Registry publishing is for forks that choose it. See [docs/forking.md](./docs/forking.md).

## Intent

- Accessible primitives and patterns (WCAG AA as a Definition of Done)
- Sensible theme defaults that consumers can restyle
- Storybook for components, Astro Starlight for docs
- Visual regression via Vitest
- GitHub Actions releases that stay usable after a fork

Component breadth aims at the scale of [Atlassian Design](https://atlassian.design/components) over time — Lit originals, not a React clone.

## Status

Early. Architecture and roadmap are being charted; the catalog is not shipped yet.

Planned layout (not scaffolded yet):

- **NX** monorepo, **pnpm** via Corepack
- `packages/tokens` (`@pond/tokens`) — Style Dictionary → `plain.css`
- `packages/components` (`@pond/components`) — Lit
- `apps/storybook`, `apps/docs` (Starlight)

See [GLOSSARY.md](./GLOSSARY.md) and [docs/component-dod.md](./docs/component-dod.md). Planning continues on the Hearthstone hub map: Pond.

## License

[MIT](./LICENSE)
