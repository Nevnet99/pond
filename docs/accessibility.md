# Accessibility

Pond treats **WCAG 2.2 AA** as merge-blocking for shipped Primitives and Components.

## Definition of Done (per component)

1. **Automated** — CI runs axe (or equivalent) against Storybook / component fixtures; configured serious rules fail the build. Keyboard smoke tests where automation is practical.
2. **Manual** — Short component-scoped checklist on the Starlight Accessibility tab: focus order, accessible name/role, contrast for that component’s parts, **known limitations**. Author completes before merge.
3. **Focus** — Uses the shared focus-ring token/primitive; no outline removal without an approved visible replacement.
4. **Motion** — Honors `prefers-reduced-motion` for Pond-shipped motion (decorative motion stops; essential status like a restrained spinner may remain).
5. **Disabled vs pending** — Prefer keeping controls pressable and validating on activation. Native `disabled` removes the control from the tab order — document that in **Limitations** when the attribute ships. For in-flight actions, prefer a **pending/busy** pattern that stays focusable and does not activate (see Button). Never attach a tooltip to a disabled control.
6. **Plain mode** — Consumer owns focus paint and contrast; document that duty on every plain-capable page.
7. **Catalog** — Interactive components register an entry in `apps/docs/src/data/a11y.ts` including `limitations` whenever there is a trap, escape hatch, or incomplete affordance.

End-user product audits and third-party conformance reports are out of scope for the design-system DoD; Consumers still own their full pages.
