---

title: Install / fork
description: How to adopt Pond.
---

Adopt Pond by forking the repository. See the repo root [docs/forking.md](https://github.com/Nevnet99/pond/blob/master/docs/forking.md) for the checklist.

```bash
gh repo fork Nevnet99/pond --clone
cd pond
pnpm install
pnpm storybook
pnpm docs:dev
```

Upstream never publishes to npm. Your fork may, if you choose.
