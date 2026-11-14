# Accessibility

Pond treats **WCAG 2.2 AA** as merge-blocking for shipped Primitives and Components.

## Definition of Done (per component)

1. **Automated** — CI runs axe (or equivalent) against Storybook / component fixtures; configured serious rules fail the build. Keyboard smoke tests where automation is practical.
2. **Manual** — Short component-scoped checklist on the Starlight (or story) page: focus order, accessible name/role, contrast for that component’s parts. Author completes before merge.
3. **Focus** — Uses the shared focus-ring token/primitive; no outline removal without an approved visible replacement.
4. **Motion** — Honors `prefers-reduced-motion` for Pond-shipped motion (decorative motion stops; essential status like a restrained spinner may remain).

End-user product audits and third-party conformance reports are out of scope for the design-system DoD; Consumers still own their full pages.
