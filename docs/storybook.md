# Storybook

Pond’s component workbench.

## Decisions

- **Framework:** `@storybook/web-components-vite` on current stable Storybook (10.x), Lit 3+, Vite 5+
- **App:** `apps/storybook` configures the monorepo; stories are **colocated** as `*.stories.ts` under `packages/components`
- **CEM:** Generate `custom-elements.json` (Lit / CEM analyzer) and load it in Storybook for controls and docs
- **Testing:** a11y addon + Storybook ↔ Vitest (`addon-vitest`) for interaction/a11y on stories; **VRT** remains the dedicated Vitest Browser `toMatchScreenshot` project
- **Themes:** Storybook toolbar (or equivalent) switches Pond **light / dark** CSS themes
- **Sidebar groups:** Story `title` prefixes match Starlight — `Primitives/`, `Forms/`, `Feedback/`, `Navigation/`, `Overlays/`, `Data display/`, `Media/` (Pond categories from the ADS inventory research)
