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
  /**
   * Known traps, incomplete affordances, or consumer duties.
   * Required when disabled, plain mode, overlays, or live regions can be misused.
   */
  limitations?: string[]
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
      'Disabled removes the control from tab order',
      'Pending (when shipped) stays focusable but does not activate'
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
      'Prefer keeping the control pressable and validating on activate over `disabled`.',
      'Use Link for page navigation. Prefer one `primary` per region.',
      'Plain mode: you own focus paint and contrast.'
    ],
    limitations: [
      '`disabled` removes the button from the tab order — keyboard and SR users cannot reach an explanation on the control itself.',
      'Never put a tooltip on a disabled button; the trigger is not focusable.',
      '`pending` stays focusable and sets `aria-busy` / `aria-disabled`; do not also set `disabled` or the control drops out of tab order.',
      'Plain mode: consumer owns focus paint and contrast.'
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
    ],
    notes: [
      'Default `href="#"` is a placeholder — always set a real destination before shipping.',
      '`target="_blank"` applies `rel="noopener noreferrer"` unless `rel` is set.'
    ],
    limitations: [
      'Do not use Link for in-page actions — use Button (including `variant="link"` for chrome-free actions).',
      'Opening a new tab without saying so in the UI surprises keyboard and SR users.',
      'Plain mode: consumer owns focus paint and contrast.'
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
      'Errors link with `aria-describedby` when `invalid` + `error-message` are set.',
      'Prefer form-level or polite live regions if you need errors announced without moving focus.',
      'Plain mode: you own chrome.'
    ],
    limitations: [
      'Placeholder is never the only label — SR and recall both suffer.',
      '`disabled` removes the input from tab order — prefer validate-while-pressable on submit.',
      'Pond does not ship an `aria-live` region on the field itself — announce dynamic errors at the form if required.',
      'Plain mode: consumer owns chrome, focus paint, and contrast.'
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
    ],
    notes: [
      'Always set `label` — options alone are not a name.',
      '`multiple` uses platform multi-select interaction (not a custom listbox).'
    ],
    limitations: [
      'Platform `<select>` styling and mobile pickers vary — do not assume custom listbox keyboard maps.',
      '`disabled` removes the control from tab order.',
      'Plain mode: consumer owns chrome, focus paint, and contrast.'
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
    ],
    limitations: [
      'Focus restores to the element that was focused when `open` became true — open from a focusable trigger.',
      'Disabling Escape or blanket dismiss needs an equivalent accessible exit.',
      'Title is exposed as `aria-label` on the dialog; keep `title` accurate even if you restyle the heading away.',
      'Primary actions that go pending should use Button `pending`, not a disabled confirm that drops out of tab order.'
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
    ],
    limitations: [
      'Empty `alt` on informative images hides meaning from AT — reserve empty alt for decorative media.',
      'Image is not a control; do not attach click handlers without a real Button/Link wrapper.',
      'Plain mode: consumer owns radius, caption type, and contrast.'
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
    ],
    limitations: [
      'Icon-only tiles without `label` have no accessible name.',
      'Tile is presentational — wrap a real control if it must activate.',
      'Plain mode: consumer owns the square surface.'
    ]
  },
  logo: {
    summary:
      'Brand mark; empty image `alt` when the wordmark names the brand; set `alt` / `aria-label` for image-only or linked logos.',
    keyboard: [
      'When `href` is set: Tab focuses the native link',
      'Enter activates navigation',
      'Cmd/Ctrl/middle-click open in a new context'
    ],
    criteria: [
      {
        id: '1.1.1',
        title: 'Non-text Content',
        how: 'Provide meaningful image alt, or empty alt when the adjacent wordmark carries the name.'
      },
      name(
        'Linked logos expose an accessible name via wordmark text or `alt`.'
      ),
      keyboard('Linked logos use native anchor keyboard behavior.'),
      focus(
        'Visible `:focus-visible` ring on the linked root (or host-owned in plain mode).'
      )
    ],
    notes: ['Plain mode: consumer owns focus and color chrome.'],
    limitations: [
      'Image-only logos without `alt` (and without wordmark text) have no accessible name.',
      'Linked `appearance="plain"` logos: consumer owns focus paint and contrast.',
      'Logo is not for content-type glyphs — use Object or Tile.'
    ]
  },
  object: {
    summary:
      'Content-type glyph; set `label` for meaningful icons (`role="img"`); unlabeled objects are `aria-hidden`.',
    criteria: [
      labels('`role="img"` + `aria-label` when `label` is set.'),
      {
        id: '1.1.1',
        title: 'Non-text Content',
        how: 'Name meaningful glyphs via `label`; leave unlabeled only when decorative beside visible text.'
      }
    ],
    limitations: [
      'Meaningful glyphs without `label` are hidden from AT (`aria-hidden`).',
      'Object is not a person identity control — use Avatar for faces.',
      'Plain mode: consumer owns the glyph surface.'
    ]
  },
  'time-picker': {
    summary: 'Labeled native time input.',
    keyboard: ['Tab to the field', 'Platform time controls'],
    criteria: [
      labels('Visible label or `aria-label` on the input.'),
      keyboard('Operable without a pointer.')
    ]
  },
  comment: {
    summary: 'Article for a single discussion item with author identity.',
    criteria: [
      labels(
        'Author text identifies the speaker; actions are ordinary named controls.'
      ),
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Header / body / actions order is preserved.'
      }
    ]
  },
  'dynamic-table': {
    summary: 'Sortable column headers with `aria-sort` and Pagination.',
    keyboard: [
      'Tab to sort buttons and pagination',
      'Enter/Space activates sort and page controls'
    ],
    criteria: [
      keyboard('Sort and page without a pointer.'),
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Header cells expose `aria-sort` for the active column.'
      }
    ]
  },
  'table-tree': {
    summary: 'Tree rows with expand/collapse controls and indent.',
    keyboard: ['Tab to toggles', 'Enter/Space expands or collapses'],
    criteria: [
      keyboard('Expand and collapse without a pointer.'),
      labels('Toggle buttons named Expand / Collapse with `aria-expanded`.')
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
    ],
    notes: [
      'Plain mode: you own focus paint and contrast; keep roles and keyboard.'
    ],
    limitations: [
      'Only the selected tab is in the tab order (`tabindex="0"`); arrows move selection and focus among enabled tabs.',
      '`disabled` items stay visible but are skipped by arrow keys and never receive focus — do not put essential content only behind a disabled tab.',
      'Wire each panel via a named slot matching `value` so `aria-controls` / `aria-labelledby` stay valid.',
      'Plain mode: consumer owns focus paint and contrast.'
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
    ],
    notes: [
      'Plain mode: you own focus paint and contrast; keep the landmark and current marker.'
    ],
    limitations: [
      '`disabled` Previous/Next (and the current page button) are removed from the tab order — announce page changes in surrounding UI if users need confirmation beyond the control.',
      'Every page renders a button — large `page-count` creates a long tab stop list; compress in the product layer until ellipsis ships.',
      'Plain mode: consumer owns focus paint and contrast.'
    ]
  },
  breadcrumbs: {
    summary:
      '`nav aria-label="Breadcrumb"`; current crumb uses `aria-current="page"`.',
    keyboard: ['Tab through crumb links', 'Enter activates a navigable crumb'],
    criteria: [
      labels('Breadcrumb navigation landmark.'),
      name('Current page indicated with `aria-current`.'),
      {
        id: '2.4.8',
        title: 'Location (AAA note)',
        how: 'Breadcrumbs help orient; AA met via clear nav labeling.'
      },
      focus()
    ],
    notes: [
      'Plain mode: you own focus paint and contrast; keep the landmark and current marker.'
    ],
    limitations: [
      'The current crumb (explicit `current` or last item) renders as text — it is not in the tab order and must not be a self-link.',
      'Items without `href` are never links; give ancestors a real `href` when they should be navigable.',
      'Separators are `aria-hidden`; do not rely on them for meaning.',
      'Plain mode: consumer owns focus paint and contrast.'
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
    notes: ['Plain mode: you own landmarks and paint.'],
    limitations: [
      'Empty named slots collapse visually, but only assign real chrome into slots — leftover empty wrappers can still expose regions.',
      '`appearance="plain"` strips layout CSS (`display: contents`) — you must preserve a sensible landmark structure yourself.',
      'Narrow containers stack nav → main → panel; verify reading order still matches the product intent.'
    ]
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
    ],
    notes: [
      'Plain mode: you own type and paint; keep the header landmark and single h1.'
    ],
    limitations: [
      'Always provide exactly one page title via `heading` or the `title` slot — an empty h1 fails name/heading expectations.',
      'Do not place another h1 in breadcrumbs, description, actions, or bottom slots.',
      'Slotted actions must bring their own accessible names (Button / Menu / Link).',
      'Plain mode: consumer owns focus paint and contrast on slotted controls.'
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
  'flag-group': {
    summary: 'Region with polite `aria-live` wrapping slotted Flags.',
    criteria: [
      labels('Named via `label` / `aria-label` on the region.'),
      {
        id: '4.1.3',
        title: 'Status Messages',
        how: 'Stack announces updates politely; individual Flags keep status/alert roles.'
      }
    ]
  },
  spotlight: {
    summary:
      '`role="dialog"` coachmark; Escape dismisses; focus moves into the dialog while open.',
    keyboard: ['Escape closes', 'Tab within dialog actions'],
    criteria: [
      name('Dialog named via `label` / heading.'),
      keyboard('Escape dismisses; actions are keyboard operable.'),
      focus('Focus moves to the dialog when opened and restores on close.')
    ],
    notes: ['Plain mode: consumer owns overlay chrome.']
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
    ],
    limitations: [
      'Meaningful avatars without `label` have no accessible name.',
      'Tiny avatars as the only identity cue fail in dense tables — also show a visible name.',
      'Avatar is presentational — wrap a real control if it must activate.',
      'Plain mode: consumer owns the circle chrome.'
    ]
  },
  'avatar-group': {
    summary: '`role="group"` with an accessible name for the collection.',
    criteria: [
      labels('Group named (e.g. “Collaborators”).'),
      name('Each Avatar should keep its own accessible name.')
    ],
    limitations: [
      'No built-in overflow/`+N` count yet — long stacks can hide who is included; provide another way to list members.',
      'Unnamed groups fall back to a generic “Avatars” label — set a meaningful `label`.',
      'Plain mode: consumer owns overlap layout.'
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
    ],
    limitations: [
      'Icon is not a control — put `aria-label` on Button for icon-only actions; keep Icon decorative inside.',
      'Meaningful icons without `label` are `aria-hidden` and silent to AT.',
      'Plain mode: consumer owns glyph dimensions.'
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
    notes: ['Plain mode: no Pond visual CSS.'],
    limitations: [
      'Plain mode: consumer owns font size, weight, and contrast.',
      'Muted color alone is not enough for critical instructions — keep the wording clear.'
    ]
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
    ],
    limitations: [
      'Skipping `level` values for visual size breaks the outline for AT — use `size` instead.',
      'Plain mode: consumer owns type CSS; keep a real heading element in the tree.'
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
    notes: ['Plain mode: you own spacing and paint.'],
    limitations: [
      'Box is not a control — click/keyboard handlers belong on Button or Link.',
      'Plain mode: consumer owns spacing and paint (`display: contents`).'
    ]
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
    notes: ['Plain mode strips flex chrome.'],
    limitations: [
      'Visual reordering against DOM order confuses keyboard and SR reading order.',
      'Plain mode: consumer owns flex/gap CSS.'
    ]
  },
  inline: {
    summary: 'Presentational horizontal flex layout.',
    criteria: [
      {
        id: '1.3.2',
        title: 'Meaningful Sequence',
        how: 'Keep interactive children keyboard-reachable in DOM order.'
      }
    ],
    limitations: [
      'Overflowing nowrap rows can hide controls off-screen — prefer `wrap` on small viewports.',
      'Plain mode: consumer owns flex CSS.'
    ]
  },
  flex: {
    summary: 'Presentational flexbox layout.',
    criteria: [
      {
        id: '1.3.2',
        title: 'Meaningful Sequence',
        how: 'DOM order should match reading order even when justify/align change visual spacing.'
      }
    ],
    notes: ['Plain mode strips flex chrome.'],
    limitations: [
      '`direction="row-reverse"` / `column-reverse` can invert visual order against DOM — keep reading order sensible.',
      'Plain mode: consumer owns flex CSS.'
    ]
  },
  grid: {
    summary: 'Presentational CSS grid layout.',
    criteria: [
      {
        id: '1.3.2',
        title: 'Meaningful Sequence',
        how: 'DOM order should remain sensible when columns reflow.'
      }
    ],
    limitations: [
      'Dense grids can shrink hit targets below usable size — keep interactive cells spacious.',
      'Plain mode: consumer owns grid CSS.'
    ]
  },
  bleed: {
    summary: 'Presentational negative-margin wrapper — no interactive role.',
    criteria: [
      {
        id: '4.1.2',
        title: 'Name, Role, Value',
        how: 'No control role; do not put click handlers on Bleed alone.'
      }
    ],
    limitations: [
      'Bleeding interactive chrome can clip focus rings or controls off-screen on small viewports.',
      'Plain mode: consumer owns margin CSS.'
    ]
  },
  'metric-text': {
    summary:
      'Presentational metric typography; pair with visible labels for meaning.',
    criteria: [
      {
        id: '1.3.1',
        title: 'Info and Relationships',
        how: 'Provide a visible label or caption so the number’s meaning is clear.'
      },
      contrast()
    ],
    limitations: [
      'A bare number without a visible label is ambiguous to everyone, including AT.',
      'Plain mode: consumer owns type CSS and contrast.'
    ]
  }
}

export function getA11yEntry(component: string): A11yEntry | undefined {
  return catalog[component]
}

export function listA11yComponents(): string[] {
  return Object.keys(catalog).sort()
}
