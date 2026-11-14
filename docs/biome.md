# Biome

Pond uses [Biome](https://biomejs.dev) for format + lint. Defaults are mapped from [Nevnet99/prettier-defaults](https://github.com/Nevnet99/prettier-defaults):

| Intent             | Biome                                  |
| ------------------ | -------------------------------------- |
| width 80           | `lineWidth: 80`                        |
| 2 spaces           | `indentStyle: space`, `indentWidth: 2` |
| no semicolons      | `semicolons: asNeeded`                 |
| single quotes      | `quoteStyle: single`                   |
| no trailing commas | `trailingCommas: none`                 |
| bracket same line  | `bracketSameLine: true`                |

Config: `biome.json` at repo root. Run `pnpm lint` / `pnpm format`.
