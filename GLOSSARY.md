# Pond

A WCAG AA–oriented design system of Lit web components, meant to be forked and owned. Brandable through tokens and themes; documented for continuous growth toward a large catalog.

## Language

**Pond**:
The design system as a whole — this repository or a fork of it — not a single npm package name.
_Avoid_: the component library (too narrow), the brand, Atlaskit

**Token**:
A named design value (color, space, type, radius, motion, …) that components consume. Tokens are authored for Style Dictionary and, for v1, emitted as `plain.css` (CSS custom properties); more formats may be added later.
_Avoid_: variable (alone), CSS variable (implementation detail), brand color

**Theme**:
A named set of token values applied by a consumer (for example default light, later dark). Pond ships themes; there is no separate “brand” layer in this vocabulary.
_Avoid_: Brand, skin, stylesheet pack

**Primitive**:
A Lit building block with little product meaning of its own — layout and type foundations such as Box, Stack, Inline, Text, focus helpers.
_Avoid_: atom (atomic-design jargon), base component (vague)

**Component**:
A named Lit UI element with roles, states, and documented behavior (Button, Modal, Select, …).
_Avoid_: widget, control (unless talking about form controls specifically)

**Part**:
A documented shadow-tree style hook exposed for theming, corresponding to CSS `::part()`. Content projection uses slots; branding docs prefer Part for style hooks.
_Avoid_: slot (for styling), CSS shadow pierce, deep selector

**Pattern**:
A documented composition of Primitives and/or Components that solves a recurring UI job (for example an empty state). Patterns are guidance first; they are not required to be their own Lit packages in v1.
_Avoid_: Recipe, template, example (examples illustrate; Patterns prescribe)

**Fork**:
A copy of the Pond repository that someone owns and evolves as their system.
_Avoid_: clone (git mechanic only), downstream (vague)

**Consumer**:
An application or site that uses a Pond (upstream or forked) in a product UI.
_Avoid_: user (end user of the product), customer
