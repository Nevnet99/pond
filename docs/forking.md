# Forking

Pond is **fork-first**.

## Upstream vs fork

| Role | What it does |
| --- | --- |
| **Upstream** (`Nevnet99/pond` or successor) | Source of the system. Versions via git tags / GitHub Releases. **Does not publish to npm** — the owner will not ship registry packages from this repo. |
| **Fork** | The supported way to adopt Pond for a product. Forks may rename `@pond/*`, deploy docs, and **optionally publish to npm** if they want a registry package. |

Consumers of a fork use whatever distribution that fork chooses (path dependency, workspace, or npm).

## Fork checklist

1. Fork on GitHub; clone; enable Actions  
2. Corepack + pnpm (`packageManager` field enforces pnpm)  
3. Rename `@pond` scope if you are rebranding the system  
4. Configure docs deploy (Pages / Cloudflare / …)  
5. Optional: npm Trusted Publishing if *your fork* will publish — upstream never requires this  
6. release-please + `GITHUB_TOKEN` covers tags / GitHub Releases without a PAT for the happy path  

## Upstream sync

Forks are **independent** by default. Optional “sync from upstream” notes may live in docs later; v1 does not ship merge bots.

## What a ready fork contains

After bootstrap: NX + pnpm layout, `@pond/tokens` → `plain.css`, `@pond/components` (Lit), Storybook, Starlight, Vitest VRT project, release-please workflow, a11y DoD — even before the full component catalog exists.
