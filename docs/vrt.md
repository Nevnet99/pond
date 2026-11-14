# Visual regression (VRT)

Pond VRT uses Vitest Browser Mode + Playwright `toMatchScreenshot`.

## Breakpoints (required)

Every VRT assertion runs at **three** widths. Use `matchScreenshotAtViewports` from `@pond/components` test helpers (`src/test/match-screenshot.ts`):

| Name      | Width | Height (iframe chrome) |
| --------- | ----- | ---------------------- |
| `mobile`  | 375   | 812                    |
| `tablet`  | 768   | 1024                   |
| `desktop` | 1280  | 720                    |

Baselines are named `{case}-{mobile|tablet|desktop}-chromium-linux.png` under `**/__screenshots__/`.

## Why Docker

Playwright only officially supports specific Linux distros (and macOS/Windows for _running_, not for shared baselines). Host installs hang or fail on unsupported distros (e.g. Garuda/Arch). Even when they work, **OS/font/GPU drift** makes screenshots disagree with CI.

**Rule:** generate, update, and assert baselines only inside the pinned Playwright Ubuntu image — the same image CI uses.

| Surface              | How                                                                              |
| -------------------- | -------------------------------------------------------------------------------- |
| Local                | `pnpm test:vrt` → Docker (`mcr.microsoft.com/playwright:v1.58.2-jammy`)          |
| Update baselines     | `pnpm test:vrt:update`                                                           |
| Unit / axe (browser) | `pnpm test:browser` → same image                                                 |
| CI                   | Job `browser` in `.github/workflows/ci.yml` (same image); must stay green on PRs |

Do **not** commit baselines from bare-metal host runs.

## Workflow (PRs)

1. Change component visuals (or layout that affects paint).
2. Run **`pnpm test:vrt:update`** (Docker) so baselines regenerate at 375 / 768 / 1280.
3. **Commit** the updated `__screenshots__` files in the same PR as the UI change.
4. Open a PR — CI re-runs VRT (no `--update`) and fails if baselines drift.

## Prerequisites

[Docker](https://docs.docker.com/engine/install/) (or compatible engine) with Compose v2, and your user in the `docker` group (`newgrp docker` or re-login). Without it, skip host Playwright installs — they are unsupported for Pond baselines.

The browser container runs as your host uid/gid, installs pnpm under `/tmp` (no `corepack enable` / no root `.pnpm-store` in the repo).

## Commands

```bash
# Needs Docker
pnpm test:vrt
pnpm test:vrt:update
pnpm test:browser

# Escape hatch (CI / already inside the image only)
pnpm test:vrt:native
pnpm test:browser:native
```

First create fails once on purpose (missing baselines), then `pnpm test:vrt:update` writes them and `pnpm test:vrt` should pass. Intentional UI changes: always `pnpm test:vrt:update` and commit.
