# Visual regression (VRT)

Pond VRT uses Vitest Browser Mode + Playwright `toMatchScreenshot`.

## Why Docker

Playwright only officially supports specific Linux distros (and macOS/Windows for _running_, not for shared baselines). Host installs hang or fail on unsupported distros (e.g. Garuda/Arch). Even when they work, **OS/font/GPU drift** makes screenshots disagree with CI.

**Rule:** generate, update, and assert baselines only inside the pinned Playwright Ubuntu image — the same image CI uses.

| Surface              | How                                                                     |
| -------------------- | ----------------------------------------------------------------------- |
| Local                | `pnpm test:vrt` → Docker (`mcr.microsoft.com/playwright:v1.58.2-jammy`) |
| Update baselines     | `pnpm test:vrt:update`                                                  |
| Unit / axe (browser) | `pnpm test:browser` → same image                                        |
| CI                   | Job `container:` set to that image                                      |

Do **not** commit baselines from bare-metal host runs.

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

Baselines land next to tests as `**/__screenshots__/**/*-chromium-linux.png`. Commit those; CI asserts against them. First create fails once on purpose, then `pnpm test:vrt` should pass. Intentional UI changes: `pnpm test:vrt:update`.
