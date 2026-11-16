/** Accessibility catalog for component docs — WCAG 2.2 AA oriented. */

export type A11yCriterion = {
  id: string
  title: string
  how: string
}

export type A11yEntry = {
  summary: string
  keyboard?: string[]
  criteria: A11yCriterion[]
  notes?: string[]
}

const focus = (
  how = 'Visible `:focus-visible` ring via Pond focus tokens (or host-owned in plain mode).'
): A11yCriterion => ({
  id: '2.4.7',
  title: 'Focus Visible',
  how
})

const name = (how: string): A11yCriterion => ({
  id: '4.1.2',
  title: 'Name, Role, Value',
  how
})

const keyboard = (how: string): A11yCriterion => ({
  id: '2.1.1',
  title: 'Keyboard',
  how
})

const labels = (how: string): A11yCriterion => ({
  id: '1.3.1',
  title: 'Info and Relationships',
  how
})

const contrast = (
  how = 'Default theme text and control chrome target WCAG AA contrast (1.4.3 / 1.4.11). Verify forks.'
): A11yCriterion => ({
  id: '1.4.3',
  title: 'Contrast (Minimum)',
  how
})

const catalog: Record<string, A11yEntry> = {
  button: {
    summary:
      'Native `<button>` with variants for emphasis. The `link` variant is still a button (Enter/Space), not navigation.',
    keyboard: [
      'Tab focuses the control',
      'Enter or Space activates',
      'Disabled removes the control from tab order'
    ],
    criteria: [
      keyboard('Full activation without a pointer.'),
      focus(),
      name(
        'Accessible name from slotted text or `aria-label` on icon-only uses.'
      ),
      contrast()
    ],
    notes: [
      'Use Link for page navigation. Prefer one `primary` per region.',
      'Plain mode: you own focus paint and contrast.'
    ]
  },
  link: {
    summary: 'Native `<a>` for navigation between pages or URLs.',
    keyboard: [
      'Tab focuses',
      'Enter activates',
      'Cmd/Ctrl/middle-click open in new context'
    ],
    criteria: [
      keyboard('Standard link keyboard behavior.'),
      focus(),
      name('Name from link text; avoid “click here” alone.'),
      {
        id: '2.4.4',
        title: 'Link Purpose (In Context)',
        how: 'Visible text should describe the destination.'
      }
    ]
  },
  'text-field': {
    summary: 'Labeled native text input with optional error description.',
    keyboard: ['Tab to field', 'Type to edit', 'Errors do not trap focus'],
    criteria: [
      labels('Visible label associated via `for`/`id`.'),
      name('`aria-invalid` and `aria-describedby` when an error is shown.'),
      {
        id: '3.3.2',
        title: 'Labels or Instructions',
        how: 'Label (and helper/error) always present for the control.'
      },
      focus(),
      contrast()
    ],
    notes: [
      'Control text is 16px (`md`) to avoid iOS zoom.',
      'Plain mode: you own chrome.'
    ]
  },
  'text-area': {
    summary:
      'Labeled native textarea with the same label/error pattern as Text field.',
    keyboard: ['Tab to field', 'Type and use arrows within the value'],
    criteria: [
      labels('Label associated via `for`/`id`.'),
      name('Errors linked with `aria-describedby`.'),
      {
        id: '3.3.2',
        title: 'Labels or Instructions',
        how: 'Label required; placeholder is never the only label.'
      },
      focus()
    ]
  },
  select: {
    summary:
      'Native `<select>` (single or `multiple`) with an associated label.',
    keyboard: ['Tab to control', 'Arrows / typeahead per platform select'],
    criteria: [
      labels('Label associated with the select.'),
      keyboard('Platform select keyboard map.'),
      focus(),
      name('Selected option exposed by the native control.')
    ]
  },
  checkbox: {
    summary: 'Native checkbox + label sharing one hit target.',
    keyboard: ['Tab to checkbox', 'Space toggles'],
    criteria: [
      labels('Wrapping or `for`/`id` label.'),
      keyboard('Space toggles checked state.'),
      name('Role and checked state from the native input.'),
      focus()
    ]
  },
  radio: {
    summary: 'Native radios grouped in a fieldset with a legend.',
    keyboard: [
      'Tab into the group',
      'Arrow keys move selection within the group'
    ],
    criteria: [
      labels('Fieldset + legend name the group; each radio has a label.'),
      keyboard('Arrow keys per native radio group.'),
      name('Checked state from the native input.'),
      focus()
    ]
  },
  toggle: {
    summary: 'Switch pattern with `role="switch"` and `aria-checked`.',
    keyboard: ['Tab to switch', 'Space or Enter toggles'],
    criteria: [
      keyboard('Keyboard toggles without a pointer.'),
      name('`role="switch"` + `aria-checked` reflect state.'),
      focus(),
      {
        id: '1.4.1',
        title: 'Use of Color',
        how: 'On/off is not color-only — thumb position also changes.'
      }
    ]
  },
  range: {
    summary: 'Labeled native range input exposing valuemin/max/now.',
    keyboard: ['Tab to slider', 'Arrows adjust value'],
    criteria: [
      labels('Accessible name from the label.'),
      keyboard('Arrow keys adjust the value.'),
      name('Native range exposes current value.'),
      focus()
    ]
  },
  form: {
    summary: 'Native `<form>` wrapper; validation errors use `role="alert"`.',
    keyboard: ['Tab through fields', 'Enter submits from text fields'],
    criteria: [
      {
        id: '3.3.1',
        title: 'Error Identification',
        how: 'Errors identified in text; alert region announces on submit failure.'
      },
      {
        id: '3.3.3',
        title: 'Error Suggestion',
        how: 'Inline messages describe what to fix (host content).'
      },
      labels('Group related fields; associate every control with a label.')
    ]
  },
  'inline-edit': {
    summary:
      'Read mode is a button; edit mode is a labeled field with Confirm/Cancel.',
    keyboard: [
      'Enter/Space opens edit from the read control',
      'Confirm/Cancel are reachable buttons',
      'Escape cancels when implemented by the host pattern'
    ],
    criteria: [
      keyboard('Full edit cycle without a pointer.'),
      name('Read control named; edit field labeled; actions named.'),
      focus('Focus moves into the field on edit and returns on exit.')
    ]
  },
  calendar: {
    summary: 'Date grid with labeled prev/next controls and a selected day.',
    keyboard: [
      'Tab to month controls and grid',
      'Arrow keys move the day (when grid is focused)',
      'Enter/Space selects'
    ],
    criteria: [
      keyboard('Month navigation and day selection without a pointer.'),
      name('Buttons labeled; selected day exposed to AT.'),
      labels('Grid relationships convey weekday/month structure.'),
      focus()
    ]
  },
  'date-time-picker': {
    summary: 'Calendar grid plus a labeled time input.',
    keyboard: [
      'Same as Calendar for the grid',
      'Tab to the time field and type a value'
    ],
    criteria: [
      keyboard('Date and time reachable by keyboard.'),
      labels('Time field labeled; calendar controls named.'),
      name('Selected date/time reflected in accessible state.'),
      focus()
    ]
  },
  'date-label': {
    summary: 'Native `<time datetime>` for machine-readable dates.',
    criteria: [
      labels('`datetime` provides a parseable value alongside visible text.'),
      name('Time element exposes the absolute date to AT.')
    ]
  },
  modal: {
    summary:
      'Modal dialog on Blanket: `role="dialog"`, `aria-modal`, labelled by title; focus moves in on open.',
    keyboard: [
      'Focus moves into the dialog when opened',
      'Tab cycles within the dialog',
      'Escape dismisses',
      'Focus restores to the trigger on close'
    ],
    criteria: [
      keyboard('Open, operate, and dismiss without a pointer.'),
      {
        id: '2.4.3',
        title: 'Focus Order',
        how: 'Focus is moved into the dialog and restored on close.'
      },
      name('`role="dialog"` + `aria-modal="true"`; title labels the dialog.'),
      {
        id: '1.3.2',
        title: 'Meaningful Sequence',
        how: 'Background content is not interactable while open (via host + blanket).'
      }
    ]
  },
  drawer: {
    summary:
      '`aria-modal` dialog panel; Tab cycled inside; Escape / backdrop dismiss; focus restored.',
    keyboard: [
      'Focus enters the panel on open',
      'Tab cycles inside',
      'Escape or backdrop dismisses',
      'Focus returns to the opener'
    ],
    criteria: [
      keyboard('Full open/close cycle by keyboard.'),
      name('Dialog semantics with an accessible name (title).'),
      focus(),
      {
        id: '2.4.3',
        title: 'Focus Order',
        how: 'Focus trapped while open; restored on close.'
      }
    ]
  },
  blanket: {
    summary:
      'Decorative dimming layer. Focus management belongs to Modal/Drawer hosts.',
    criteria: [
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Does not introduce an interactive role by itself.'
      },
      {
        id: '2.4.3',
        title: 'Focus Order',
        how: 'Hosts must move/restore focus; Blanket alone does not steal it.'
      }
    ],
    notes: [
      'Prefer composing via Modal or Drawer rather than using Blanket alone.'
    ]
  },
  popup: {
    summary: '`role="dialog"` without `aria-modal`; restore focus on close.',
    keyboard: [
      'Open from a trigger',
      'Tab within content',
      'Escape closes',
      'Focus restores'
    ],
    criteria: [
      keyboard('Dismiss and navigate without a pointer.'),
      name('Dialog role with an accessible name when titled.'),
      {
        id: '2.4.3',
        title: 'Focus Order',
        how: 'Focus restores to the trigger on close.'
      }
    ]
  },
  'inline-dialog': {
    summary:
      'Non-modal `role="dialog"` with optional heading, actions, and close control; restore focus on close.',
    keyboard: [
      'Open from a trigger',
      'Tab through body and actions',
      'Escape / close control dismisses',
      'Focus restores'
    ],
    criteria: [
      keyboard('Dismiss and navigate without a pointer.'),
      labels(
        'Named via heading (`aria-labelledby`) or a fallback dialog label.'
      ),
      {
        id: '2.4.3',
        title: 'Focus Order',
        how: 'Focus moves into the panel when opened and restores to the trigger on close.'
      }
    ],
    notes: ['Prefer Modal when the task needs a dimmed focus trap.']
  },
  image: {
    summary: 'Image with required `alt` (empty only when decorative).',
    criteria: [
      labels('Meaningful alternative text, or empty alt when decorative.'),
      {
        id: '1.1.1',
        title: 'Non-text Content',
        how: 'Provide `alt` that describes the image purpose.'
      }
    ]
  },
  tile: {
    summary: 'Noun tile; use `label` when the slot is visual-only.',
    criteria: [
      labels('`role="img"` + `aria-label` when `label` is set.'),
      {
        id: '1.1.1',
        title: 'Non-text Content',
        how: 'Name icon-only tiles via `label`.'
      }
    ]
  },
  menu: {
    summary:
      'Menu trigger with `aria-haspopup` / `aria-expanded`; items use menu roles.',
    keyboard: [
      'Enter/Space opens from the trigger',
      'Arrow keys move between items',
      'Escape closes and returns focus'
    ],
    criteria: [
      keyboard('APG-style menu keyboard map.'),
      name('`role="menu"` / `menuitem`; trigger exposes expanded state.'),
      focus()
    ]
  },
  tooltip: {
    summary: '`role="tooltip"` when open. Trigger must be keyboard-focusable.',
    keyboard: [
      'Focus or pointer shows the tip',
      'Escape dismisses when focus-triggered'
    ],
    criteria: [
      keyboard('Content available from keyboard focus, not hover-only.'),
      name('`role="tooltip"` referenced from the trigger when shown.'),
      {
        id: '1.4.13',
        title: 'Content on Hover or Focus',
        how: 'Dismissible and does not obscure the trigger permanently.'
      }
    ]
  },
  tabs: {
    summary: '`tablist` / `tab` / `tabpanel` with arrow keys, Home, and End.',
    keyboard: [
      'Tab moves into the tab list',
      'Left/Right (or Up/Down) move between tabs',
      'Home / End jump to ends',
      'Tab leaves into the active panel'
    ],
    criteria: [
      keyboard('Roving tabindex / APG tabs pattern.'),
      name('`aria-selected` and `aria-controls` wire tabs to panels.'),
      focus()
    ]
  },
  pagination: {
    summary:
      '`nav` with `aria-label="Pagination"`; current page uses `aria-current="page"`.',
    keyboard: [
      'Tab through page controls',
      'Enter/Space activates a page or prev/next'
    ],
    criteria: [
      labels('Navigation landmark named Pagination.'),
      name('Current page marked with `aria-current`.'),
      keyboard('All controls are buttons/links activatable by keyboard.'),
      focus()
    ]
  },
  breadcrumbs: {
    summary:
      '`nav aria-label="Breadcrumb"`; current crumb uses `aria-current="page"`.',
    keyboard: ['Tab through crumb links'],
    criteria: [
      labels('Breadcrumb navigation landmark.'),
      name('Current page indicated with `aria-current`.'),
      {
        id: '2.4.8',
        title: 'Location (AAA note)',
        how: 'Breadcrumbs help orient; AA met via clear nav labeling.'
      },
      focus()
    ]
  },
  page: {
    summary:
      'Page layout shell with optional banner, navigation, header, and panel around a `main` content region.',
    criteria: [
      labels(
        'Default slot is wrapped in `<main>`; navigation and panel use `<aside>` when present.'
      ),
      {
        id: '1.3.2',
        title: 'Meaningful Sequence',
        how: 'DOM order is banner → navigation → header → main → panel.'
      },
      {
        id: '2.4.1',
        title: 'Bypass Blocks',
        how: 'Main landmark lets AT skip chrome; empty slots collapse so unused regions are not exposed.'
      }
    ],
    notes: ['Plain mode: you own landmarks and paint.']
  },
  'page-header': {
    summary: 'Header landmark with the page title as an `h1`.',
    criteria: [
      labels('`header` landmark; single page `h1` for the title.'),
      {
        id: '2.4.6',
        title: 'Headings and Labels',
        how: 'Title heading describes the page.'
      },
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Actions remain ordinary labeled controls in the header.'
      }
    ]
  },
  panel: {
    summary:
      'Contextual side section with an optional labelled header (`h2` via `heading`) and footer.',
    criteria: [
      labels(
        '`section` labelled by the heading when `heading` is set; actions stay ordinary named controls.'
      ),
      {
        id: '2.4.6',
        title: 'Headings and Labels',
        how: 'Panel title is an `h2` under the page `h1` — do not use Panel as the page title.'
      },
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Header / body / footer order is preserved; empty regions collapse.'
      }
    ],
    notes: ['Plain mode: you own structure and paint.']
  },
  'side-nav': {
    summary:
      'Vertical navigation landmark with collapsible sections and current-item indication.',
    keyboard: [
      'Tab moves through section toggles and items',
      'Enter/Space activates buttons and toggles'
    ],
    criteria: [
      labels(
        '`nav` named via `label`; section toggles expose `aria-expanded`; current item uses `aria-current="page"`.'
      ),
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Sections and items use list semantics (`role="list"` / `listitem`); nest at most one level.'
      },
      {
        id: '2.4.8',
        title: 'Location',
        how: 'Mark the active route with `current` on the matching item.'
      }
    ],
    notes: [
      'Plain mode: you own paint; keep the landmark and current semantics.'
    ]
  },
  banner: {
    summary:
      '`role="region"` with a label; close control is named when present.',
    keyboard: ['Tab to actions / close', 'Enter/Space activates'],
    criteria: [
      labels('Region named for AT landmark lists.'),
      name('Close button has an accessible name.'),
      {
        id: '1.4.1',
        title: 'Use of Color',
        how: 'Tone is paired with icon/text, not color alone.'
      }
    ]
  },
  flag: {
    summary: '`role="status"` by default; `role="alert"` for danger.',
    criteria: [
      name('Live region role matches urgency.'),
      {
        id: '4.1.3',
        title: 'Status Messages',
        how: 'Status/alert announces without moving focus.'
      },
      {
        id: '1.4.1',
        title: 'Use of Color',
        how: 'Tone includes a non-color cue.'
      }
    ]
  },
  'section-message': {
    summary: '`role="status"` by default; `role="alert"` for danger.',
    criteria: [
      name('Status/alert role by tone.'),
      {
        id: '4.1.3',
        title: 'Status Messages',
        how: 'Messages can announce without focus moves.'
      },
      {
        id: '1.4.1',
        title: 'Use of Color',
        how: 'Tone paired with icon/text.'
      }
    ]
  },
  'inline-message': {
    summary: '`status` or `alert` by tone for short inline feedback.',
    criteria: [
      name('Live role matches tone.'),
      {
        id: '4.1.3',
        title: 'Status Messages',
        how: 'Inline feedback can be announced to AT.'
      }
    ]
  },
  'empty-state': {
    summary: 'Title is an `h2`; actions are ordinary controls.',
    criteria: [
      {
        id: '2.4.6',
        title: 'Headings and Labels',
        how: 'Empty-state title uses a real heading.'
      },
      name('Actions expose names and roles as buttons/links.'),
      focus()
    ]
  },
  table: {
    summary: 'Native table with caption and scoped column headers.',
    criteria: [
      labels('`<th scope>` and caption relate cells to headers.'),
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Native table semantics — avoid layout-only tables.'
      }
    ]
  },
  'progress-bar': {
    summary:
      'Native `progressbar` semantics with valuemin/max/now (or indeterminate).',
    criteria: [
      name('`role="progressbar"` with value attributes when determinate.'),
      {
        id: '4.1.2',
        title: 'Name, Role, Value',
        how: 'Accessible name via `label` / `aria-label`.'
      },
      {
        id: '1.4.1',
        title: 'Use of Color',
        how: 'Value is also exposed programmatically, not color-only.'
      }
    ]
  },
  'progress-indicator': {
    summary: 'Group named with the current step of the total.',
    criteria: [
      name('Group label includes current/total progress.'),
      labels('Steps exposed as a related set.')
    ]
  },
  'progress-tracker': {
    summary: 'Ordered list of labeled steps with a group label.',
    criteria: [
      labels('Native ordered list conveys sequence.'),
      name('Group has an accessible name; each step is labeled.')
    ]
  },
  spinner: {
    summary: 'Busy indicator; provide a text label for the loading state.',
    criteria: [
      name('Accessible name via `label` / `aria-label`.'),
      {
        id: '2.2.2',
        title: 'Pause, Stop, Hide',
        how: 'Motion collapses under `prefers-reduced-motion` via tokens; keep a static label.'
      }
    ],
    notes: ['Plain mode: you own chrome and labeling.']
  },
  skeleton: {
    summary:
      'Decorative placeholder (`aria-hidden`); pair with status text when loading matters.',
    criteria: [
      {
        id: '1.1.1',
        title: 'Non-text Content',
        how: 'Hidden from AT; announce loading via a live status elsewhere.'
      },
      {
        id: '4.1.3',
        title: 'Status Messages',
        how: 'Do not rely on skeleton motion alone — provide a status message.'
      }
    ]
  },
  badge: {
    summary:
      'Numeric tally with an accessible label (e.g. notifications count).',
    criteria: [
      name('`aria-label` describes the count purpose.'),
      contrast('Small text still needs AA contrast on the badge surface.')
    ],
    notes: ['Plain mode: you own chrome.']
  },
  lozenge: {
    summary:
      'Status pill; text is the name. Pair tone with the label, not color alone.',
    criteria: [
      name('Visible text is the accessible name.'),
      {
        id: '1.4.1',
        title: 'Use of Color',
        how: 'Tone must not be the only cue — keep readable text.'
      }
    ],
    notes: ['Plain mode: you own chrome.']
  },
  tag: {
    summary: 'Tag with an optional remove control that has an accessible name.',
    keyboard: ['Tab to remove', 'Enter/Space activates remove'],
    criteria: [
      name('Remove button named (e.g. “Remove {tag}”).'),
      keyboard('Remove is keyboard operable.'),
      focus()
    ]
  },
  'tag-group': {
    summary: '`role="group"` with an accessible name wrapping tags.',
    criteria: [
      labels('Group named for related tags.'),
      name('Each tag remains independently operable.')
    ]
  },
  avatar: {
    summary: '`role="img"` with `aria-label` for the person or entity.',
    criteria: [
      {
        id: '1.1.1',
        title: 'Non-text Content',
        how: 'Provide an accessible name; decorative avatars should be host-hidden.'
      },
      name('`role="img"` + `aria-label`.')
    ]
  },
  'avatar-group': {
    summary: '`role="group"` with an accessible name for the collection.',
    criteria: [
      labels('Group named (e.g. “Collaborators”).'),
      name('Overflow/count exposed when shown.')
    ]
  },
  icon: {
    summary:
      'Decorative when unlabeled (`aria-hidden`); `role="img"` + `aria-label` when labelled.',
    criteria: [
      {
        id: '1.1.1',
        title: 'Non-text Content',
        how: 'Label meaningful icons; hide decorative ones from AT.'
      },
      name('Labelled icons expose `role="img"`.')
    ]
  },
  code: {
    summary: 'Native `code` / `pre > code` for snippets — no custom role.',
    criteria: [
      labels('Native code semantics; blocks use `pre` for whitespace.'),
      {
        id: '1.4.3',
        title: 'Contrast (Minimum)',
        how: 'Mono text on subtle background must meet AA in default themes.'
      }
    ]
  },
  'visually-hidden': {
    summary: 'Visually clipped content that remains in the accessibility tree.',
    criteria: [
      {
        id: '1.3.2',
        title: 'Meaningful Sequence',
        how: 'Hidden visually but still read in DOM order.'
      },
      name(
        'Use for accessible names/instructions that should not appear on screen.'
      )
    ]
  },
  // Primitives
  text: {
    summary: 'Semantic `<p>` in the shadow tree for body copy.',
    criteria: [labels('Paragraph semantics for body text.'), contrast()],
    notes: ['Plain mode: no Pond visual CSS.']
  },
  heading: {
    summary:
      'Real `h1`–`h6` elements. Outline order comes from `level`, not `size`.',
    criteria: [
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Native heading elements expose the outline.'
      },
      {
        id: '2.4.6',
        title: 'Headings and Labels',
        how: 'Do not skip levels for styling — use `size`.'
      }
    ]
  },
  box: {
    summary: 'Presentational layout box — no interactive role.',
    criteria: [
      {
        id: '4.1.2',
        title: 'Name, Role, Value',
        how: 'No implicit control role; do not put click handlers on Box alone.'
      }
    ],
    notes: ['Plain mode: you own spacing and paint.']
  },
  stack: {
    summary: 'Presentational vertical flex layout.',
    criteria: [
      {
        id: '1.3.2',
        title: 'Meaningful Sequence',
        how: 'DOM order should match reading order of stacked children.'
      }
    ],
    notes: ['Plain mode strips flex chrome.']
  },
  inline: {
    summary: 'Presentational horizontal flex layout.',
    criteria: [
      {
        id: '1.3.2',
        title: 'Meaningful Sequence',
        how: 'Keep interactive children keyboard-reachable in DOM order.'
      }
    ]
  }
}

export function getA11yEntry(component: string): A11yEntry | undefined {
  return catalog[component]
}

export function listA11yComponents(): string[] {
  return Object.keys(catalog).sort()
}
