## Summary

<!-- What changed and why (1–3 bullets). Prefer motive over file lists. -->

-

## Test plan

- [ ] `pnpm lint` / `pnpm typecheck` / `pnpm build` locally (or trust CI)
- [ ] Browser unit/axe: `pnpm test:browser` (Docker)
- [ ] If visuals changed: `pnpm test:vrt:update` in Docker, **commit** the new `__screenshots__` baselines
- [ ] CI **browser** job green (unit/axe + VRT at 375 / 768 / 1280)

## Component DoD (when shipping a Primitive / Component)

- [ ] Lit source uses `--pond-*` tokens; `appearance="plain"` strips Pond visual CSS
- [ ] Storybook stories (primary states + plain)
- [ ] Starlight page with Examples / Code / Usage / Changelog / Accessibility / Patterns
- [ ] Unit + axe tests
- [ ] VRT screenshots at **mobile (375)**, **tablet (768)**, **desktop (1280)** — regenerated via Docker, committed
- [ ] Conventional commit naming the component (e.g. `feat(components): add Box`)

## Notes

<!-- Risk, follow-ups, screenshots, or “N/A — docs/chore only”. -->
