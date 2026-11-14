# Pond

A WCAG AA–oriented design system built with [Lit](https://lit.dev). Brandable defaults, meant to be **forked** and owned.

This upstream repo is **not** published to npm by its owner. Registry publishing is for forks that choose it. See [docs/forking.md](./docs/forking.md).

## Intent

- Accessible primitives and patterns (WCAG AA as a Definition of Done)
- Sensible theme defaults that consumers can restyle (`appearance="plain"` reset)
- Storybook for components, Astro Starlight for docs
- Visual regression via Vitest Browser **in Docker** at **375 / 768 / 1280** (see [docs/vrt.md](./docs/vrt.md))
- Biome format/lint (see [docs/biome.md](./docs/biome.md))
- Changes land via **pull requests**; GitHub Actions releases stay usable after a fork

Component breadth aims at the scale of [Atlassian Design](https://atlassian.design/components) over time — Lit originals, not a React clone.

## Monorepo

| Path                  | Package            | Role                                        |
| --------------------- | ------------------ | ------------------------------------------- |
| `packages/tokens`     | `@pond/tokens`     | Style Dictionary → `plain.css` (`--pond-*`) |
| `packages/components` | `@pond/components` | Lit primitives / components                 |
| `apps/storybook`      | `@pond/storybook`  | Component workbench                         |
| `apps/docs`           | `@pond/docs`       | Starlight docs                              |

NX + **pnpm** (`packageManager` field). Prefer Corepack when available: `corepack enable && corepack prepare`.

## Commands

```bash
pnpm install
pnpm build
pnpm lint
pnpm typecheck
pnpm storybook
pnpm docs:dev

# Browser unit/axe + VRT — requires Docker (not bare-metal host)
pnpm test
pnpm test:vrt
pnpm test:vrt:update   # refresh baselines (mobile/tablet/desktop) inside the image
```

## Contributing

Work on a branch and open a **pull request** against `master`. The PR template asks for DoD + VRT checklist. After visual changes, regenerate baselines with `pnpm test:vrt:update` and commit the `__screenshots__` files so CI can verify them.

## Docs

- [GLOSSARY.md](./GLOSSARY.md)
- [docs/component-dod.md](./docs/component-dod.md)
- [docs/v1-slice.md](./docs/v1-slice.md)
- [docs/vrt.md](./docs/vrt.md)
- [docs/typography.md](./docs/typography.md)
- [docs/accessibility.md](./docs/accessibility.md)
- [docs/forking.md](./docs/forking.md)

## License

[MIT](./LICENSE)
