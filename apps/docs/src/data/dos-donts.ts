/** Do / don’t catalog for component Usage tabs. */

export type DosDontsEntry = {
  dos: string[]
  donts: string[]
}

const catalog: Record<string, DosDontsEntry> = {
  button: {
    dos: [
      'Use for actions the user triggers in place',
      'Prefer one primary per region',
      'Use pending while a request runs (stays focusable)',
      'Name icon-only buttons with aria-label'
    ],
    donts: [
      'Don’t use for page navigation — use Link',
      'Don’t place multiple primaries competing for attention',
      'Don’t disable instead of pending for in-flight actions',
      'Don’t put a tooltip on a disabled button',
      'Don’t rely on color alone for danger — keep the label clear'
    ]
  },
  link: {
    dos: [
      'Use for navigation between pages or URLs',
      'Write link text that names the destination',
      'Keep underline visible for affordance',
      'Say when a link opens in a new tab'
    ],
    donts: [
      'Don’t use for in-place actions — use Button (link variant if needed)',
      'Don’t use vague text like “click here”',
      'Don’t ship the default href="#” placeholder',
      'Don’t open new tabs without telling the user'
    ]
  },
  'text-field': {
    dos: [
      'Always provide a visible label',
      'Surface errors in text linked with aria-describedby',
      'Keep control text at the md (16px) step on mobile'
    ],
    donts: [
      'Don’t use placeholder as the only label',
      'Don’t validate by disabling submit until every field is perfect',
      'Don’t drop input text below 16px (iOS zoom)'
    ]
  },
  'text-area': {
    dos: [
      'Label the field and describe expected content when needed',
      'Keep a sensible rows default for the task'
    ],
    donts: [
      'Don’t use a textarea for single-line values',
      'Don’t leave errors as color-only borders'
    ]
  },
  select: {
    dos: [
      'Use for choosing from a known, finite list',
      'Label the control; keep options readable',
      'Prefer radio/checkbox groups when comparison needs all options visible'
    ],
    donts: [
      'Don’t use for free-text entry',
      'Don’t nest selects that change meaning without announcing the change',
      'Don’t omit the visible label'
    ]
  },
  checkbox: {
    dos: [
      'Use for independent on/off choices',
      'Keep the label clickable with the control'
    ],
    donts: [
      'Don’t use a lone checkbox for mutually exclusive choices — use radio',
      'Don’t bury the label far from the box'
    ]
  },
  radio: {
    dos: [
      'Group related options in one fieldset with a legend',
      'Default to a sensible selection when the task requires one'
    ],
    donts: ['Don’t use radios for multi-select', 'Don’t omit the group legend']
  },
  toggle: {
    dos: [
      'Use for immediate settings that take effect on toggle',
      'Keep the label stating the state that will be on'
    ],
    donts: [
      'Don’t use a toggle when the user must confirm a separate Save',
      'Don’t make on/off distinguishable by color alone'
    ]
  },
  range: {
    dos: [
      'Use when an approximate value is enough',
      'Expose the current value in text when precision matters'
    ],
    donts: [
      'Don’t use a slider when an exact typed value is required',
      'Don’t leave the control unlabeled'
    ]
  },
  form: {
    dos: [
      'Validate on submit and announce errors',
      'Focus the first invalid field after a failed submit'
    ],
    donts: [
      'Don’t disable submit until the form is “perfect”',
      'Don’t clear the user’s input on a failed submit'
    ]
  },
  'inline-edit': {
    dos: [
      'Keep Confirm and Cancel obvious in edit mode',
      'Return focus to the read control after save/cancel'
    ],
    donts: [
      'Don’t edit on every keystroke without an explicit save affordance',
      'Don’t leave edit mode without a keyboard exit'
    ]
  },
  calendar: {
    dos: [
      'Announce the selected date in surrounding UI copy',
      'Keep month navigation labeled'
    ],
    donts: [
      'Don’t ship a calendar without a text alternative for the value',
      'Don’t trap keyboard users outside the grid controls'
    ]
  },
  'date-time-picker': {
    dos: [
      'Pair calendar selection with a clearly labeled time field',
      'Preserve the user’s locale expectations for time entry'
    ],
    donts: [
      'Don’t require pointer-only time scrubbing',
      'Don’t omit timezone context when it affects the value'
    ]
  },
  'date-label': {
    dos: [
      'Always set a machine-readable ISO `value`',
      'Keep visible text human-friendly via the locale formatter',
      'Pair with editable pickers when the user must change the date'
    ],
    donts: [
      'Don’t use Date label as an input control',
      'Don’t pass free-form strings when you need a reliable `datetime`',
      'Don’t invent a second visible date that disagrees with `value`'
    ]
  },
  modal: {
    dos: [
      'Open from a focusable trigger so focus can restore on close',
      'Move focus into the dialog on open and restore it on close',
      'Use for focused tasks that block the page',
      'Use Button pending on in-flight confirms'
    ],
    donts: [
      'Don’t open modals without a clear dismiss path (Escape / Cancel)',
      'Don’t stack multiple modals without a strong reason',
      'Don’t disable the confirm control while saving — use pending'
    ]
  },
  drawer: {
    dos: [
      'Use for filters, nav, or secondary tasks that keep page context',
      'Trap focus while open and restore on close'
    ],
    donts: [
      'Don’t use a drawer for critical confirmations that need a modal',
      'Don’t leave the opener without focus restoration'
    ]
  },
  blanket: {
    dos: [
      'Compose via Modal or Drawer so focus is handled',
      'Keep the dimming non-interactive except as a dismiss target when intended'
    ],
    donts: [
      'Don’t use Blanket alone as a dialog',
      'Don’t forget to restore focus when the overlay closes'
    ]
  },
  popup: {
    dos: ['Anchor to a clear trigger', 'Close on Escape and restore focus'],
    donts: [
      'Don’t use a non-modal popup for destructive confirms',
      'Don’t obscure the trigger permanently'
    ]
  },
  'inline-dialog': {
    dos: [
      'Use when the surface needs a title and/or actions',
      'Close on Escape and restore focus to the trigger'
    ],
    donts: [
      'Don’t replace Modal for destructive or multi-step flows',
      'Don’t use Inline dialog for one-line hints — prefer Popup or Tooltip'
    ]
  },
  image: {
    dos: [
      'Provide meaningful alt text',
      'Use src-dark when the asset must change under dark theme'
    ],
    donts: [
      'Don’t omit alt on informative images',
      'Don’t use Image as a clickable button without a real control',
      'Don’t use Image for brand marks — prefer Logo'
    ]
  },
  tile: {
    dos: [
      'Use for named nouns in grids and pickers',
      'Set label when the slot is icon-only'
    ],
    donts: [
      'Don’t use Tile for photographic heroes — prefer Image',
      'Don’t overcrowd the tile with long paragraphs',
      'Don’t use Tile for inline type cues beside titles — prefer Object'
    ]
  },
  logo: {
    dos: [
      'Pass your own brand assets via src and wordmark',
      'Use empty alt when the wordmark already names the brand',
      'Set href for home / brand navigation'
    ],
    donts: [
      'Don’t ship Atlassian or third-party logos from Pond',
      'Don’t use Logo for content-type glyphs — prefer Object or Tile',
      'Don’t use Logo for photography — prefer Image'
    ]
  },
  object: {
    dos: [
      'Use for content-type cues beside titles and rows',
      'Set label when the glyph is the only name'
    ],
    donts: [
      'Don’t treat Object as Atlassian product branding',
      'Don’t use Object for photographic media — prefer Image',
      'Don’t use Object for person identity — prefer Avatar'
    ]
  },
  'time-picker': {
    dos: [
      'Use for time-only values',
      'Prefer Date time picker when date and time belong together'
    ],
    donts: [
      'Don’t invent a custom clock UI when the native control suffices',
      'Don’t leave the field unlabeled'
    ]
  },
  comment: {
    dos: [
      'Show author and relative time clearly',
      'Keep actions in the actions slot',
      'Name every slotted action (Reply, Edit)'
    ],
    donts: [
      'Don’t nest Comment inside Comment for threads in this phase',
      'Don’t build reactions or a live editor here',
      'Don’t leave author empty when the speaker matters'
    ]
  },
  'dynamic-table': {
    dos: [
      'Use for client-side sort + pagination',
      'Keep page size small enough for readable pages',
      'Set `reorderable` only when order is a first-class user task'
    ],
    donts: [
      'Don’t treat this as a remote/async data grid yet',
      'Don’t use Dynamic table for nested rows — use Table tree',
      'Don’t omit a caption on real datasets'
    ]
  },
  'table-tree': {
    dos: [
      'Use for hierarchical rows with one expand control per parent',
      'Indent children so depth is visible',
      'Seed `expanded-ids` for the path the user needs open'
    ],
    donts: [
      'Don’t lazy-load children via a remote API in this phase',
      'Don’t combine drag-and-drop with the tree yet',
      'Don’t use Table tree for flat sortable datasets — use Dynamic table'
    ]
  },
  menu: {
    dos: ['Group related actions', 'Support arrow-key movement between items'],
    donts: [
      'Don’t put primary page navigation only inside a menu',
      'Don’t mix navigational links and irreversible actions without separation'
    ]
  },
  tooltip: {
    dos: [
      'Use for short supplemental hints',
      'Ensure the trigger is keyboard-focusable'
    ],
    donts: [
      'Don’t put essential instructions only in a tooltip',
      'Don’t rely on hover-only disclosure'
    ]
  },
  tabs: {
    dos: [
      'Keep tab labels short and unique',
      'Match each panel slot name to the tab value',
      'Use tabs only for closely related views on one page'
    ],
    donts: [
      'Don’t use tabs for sequential wizard steps — use a progress tracker',
      'Don’t load unrelated page-level destinations as tabs — use Side nav or Link',
      'Don’t hide the only path to critical content behind a disabled tab'
    ]
  },
  pagination: {
    dos: [
      'Keep page-count honest and load data on pond-change',
      'Pair with a nearby results summary when totals matter',
      'Leave Previous/Next available (they disable at the ends)'
    ],
    donts: [
      'Don’t paginate tiny lists that fit on one screen',
      'Don’t dump dozens of page buttons without product-level compression',
      'Don’t use pagination for wizard steps — use a progress tracker'
    ]
  },
  breadcrumbs: {
    dos: [
      'Show the path from a familiar root to the current page',
      'Give ancestor crumbs real hrefs; mark the current crumb with current',
      'Prefer the Page header breadcrumbs slot for page chrome'
    ],
    donts: [
      'Don’t duplicate the page title as the only crumb',
      'Don’t make the current crumb a link to itself',
      'Don’t use breadcrumbs as the primary peer navigation — use Side nav'
    ]
  },
  page: {
    dos: [
      'Compose Banner / Side nav / Page header / Panel into the named slots',
      'Put the primary reading content in the default slot (main)',
      'Leave unused slots empty so regions collapse'
    ],
    donts: [
      'Don’t nest a second Page inside the main slot',
      'Don’t leave empty decorative wrappers in slots',
      'Don’t put the primary article only in the panel column'
    ]
  },
  'page-header': {
    dos: [
      'Use one h1 for the page title',
      'Keep primary actions in the header consistent across pages',
      'Compose Breadcrumbs / Tabs into slots — don’t hard-wire them'
    ],
    donts: [
      'Don’t skip the h1 or replace it with a styled div',
      'Don’t overload the header with every possible action',
      'Don’t put a second h1 in the bottom or description slots'
    ]
  },
  panel: {
    dos: [
      'Place Panel in the Page panel slot for contextual side content',
      'Use heading (h2) for the panel title; keep page title in Page header',
      'Keep filters / inspectors / secondary actions here — not the main story'
    ],
    donts: [
      'Don’t use Panel as a second page chrome shell',
      'Don’t put the primary reading column inside Panel',
      'Don’t set conflicting titles on both heading property and heading slot'
    ]
  },
  'side-nav': {
    dos: [
      'Put Side nav in the Page navigation slot',
      'Mark the active item with current; nest at most one level',
      'Keep a text label on every item — required when the rail is collapsed'
    ],
    donts: [
      'Don’t rebuild the full Atlassian top + side Navigation system here',
      'Don’t nest Side nav items more than one level deep',
      'Don’t ship icon-only items without an accessible name in the label slot'
    ]
  },
  banner: {
    dos: [
      'Use for page-level notices the user should see on arrival',
      'Name the close control when dismissible'
    ],
    donts: [
      'Don’t use banners for transient toast-like feedback — use Flag',
      'Don’t auto-dismiss critical errors before they can be read'
    ]
  },
  flag: {
    dos: [
      'Use for short-lived feedback after an action',
      'Pick alert role for danger that needs immediate attention'
    ],
    donts: [
      'Don’t stack endless flags',
      'Don’t use flags for persistent page instructions'
    ]
  },
  'flag-group': {
    dos: [
      'Group transient Flags in one live region',
      'Use placement end/start for app toast corners'
    ],
    donts: [
      'Don’t let the stack grow without dismissing old Flags',
      'Don’t put persistent page instructions in a Flag group'
    ]
  },
  spotlight: {
    dos: [
      'Highlight one control per step',
      'Advance with pond-next and close with pond-close / Escape'
    ],
    donts: [
      'Don’t run multiple Spotlights at once',
      'Don’t use Spotlight for permanent help — prefer docs or Tooltip'
    ]
  },
  'section-message': {
    dos: ['Place near the content it explains', 'Pair tone with icon and text'],
    donts: [
      'Don’t use as a global app banner',
      'Don’t rely on color alone for the tone'
    ]
  },
  'inline-message': {
    dos: [
      'Keep the message next to the field or control it describes',
      'Use alert tone sparingly'
    ],
    donts: [
      'Don’t replace field-level error text with a distant page message',
      'Don’t animate in a way that is the only cue'
    ]
  },
  'empty-state': {
    dos: [
      'Explain what is missing and offer a clear next action',
      'Keep the title as a real heading'
    ],
    donts: [
      'Don’t show an empty state that looks like an error without saying so',
      'Don’t leave the user with no action when one exists'
    ]
  },
  table: {
    dos: [
      'Provide a caption and scoped headers',
      'Keep cell text scannable',
      'Use Dynamic table when sort or paging is required'
    ],
    donts: [
      'Don’t use tables for page layout',
      'Don’t omit headers for numeric columns',
      'Don’t stretch Table into a tree or remote data grid'
    ]
  },
  'progress-bar': {
    dos: [
      'Provide an accessible name',
      'Use indeterminate only when progress is truly unknown'
    ],
    donts: [
      'Don’t fake determinate progress',
      'Don’t convey status by color alone'
    ]
  },
  'progress-indicator': {
    dos: [
      'Name the group with current step of total',
      'Keep steps in a stable order'
    ],
    donts: [
      'Don’t change step count mid-flow without explanation',
      'Don’t skip announcing the current step'
    ]
  },
  'progress-tracker': {
    dos: ['Label every step', 'Reflect completed / current / upcoming clearly'],
    donts: [
      'Don’t use a tracker for unrelated links',
      'Don’t allow jumping steps when the flow forbids it without saying why'
    ]
  },
  spinner: {
    dos: [
      'Always provide a loading label for AT',
      'Swap to content or an error when loading finishes'
    ],
    donts: [
      'Don’t leave a spinner with no name',
      'Don’t spin forever without a timeout or cancel path'
    ]
  },
  skeleton: {
    dos: [
      'Pair with a status message when loading matters',
      'Match skeleton shape roughly to the content that will appear'
    ],
    donts: [
      'Don’t rely on skeleton motion as the only loading cue',
      'Don’t leave skeletons visible after content is ready'
    ]
  },
  badge: {
    dos: [
      'Use for counts that change',
      'Include purpose in the accessible name'
    ],
    donts: [
      'Don’t use badges for static decoration',
      'Don’t show large numbers without a max+ pattern when space is tight'
    ]
  },
  lozenge: {
    dos: [
      'Keep the status text readable without the color',
      'Use consistent tone meanings across the product'
    ],
    donts: [
      'Don’t invent one-off tone meanings per screen',
      'Don’t wrap long sentences in a lozenge'
    ]
  },
  tag: {
    dos: [
      'Name the remove control with the tag value when you can',
      'Keep tags scannable and short',
      'Compose related tags in a Tag group'
    ],
    donts: [
      'Don’t use tags as the only way to navigate',
      'Don’t make remove pointer-only',
      'Don’t use Tag for status tone — use Lozenge'
    ]
  },
  'tag-group': {
    dos: ['Name the group for AT', 'Keep related tags together'],
    donts: [
      'Don’t mix unrelated taxonomies in one group',
      'Don’t omit remove names on dismissible tags'
    ]
  },
  avatar: {
    dos: [
      'Provide an accessible name for the person or entity',
      'Use initials fallback when the image fails',
      'Show a visible name beside tiny faces in dense tables'
    ],
    donts: [
      'Don’t leave meaningful avatars unlabeled',
      'Don’t use tiny avatars as the only identity cue in dense tables without a name',
      'Don’t use Avatar for content-type cues — prefer Object'
    ]
  },
  'avatar-group': {
    dos: [
      'Name the group (e.g. Collaborators)',
      'Label each slotted Avatar',
      'Keep the stack short until overflow counting ships'
    ],
    donts: [
      'Don’t hide who is included with no way to reveal the list',
      'Don’t stack so many faces that names become impossible',
      'Don’t use Avatar group for a single person — prefer Avatar'
    ]
  },
  icon: {
    dos: [
      'Label meaningful icons',
      'Hide decorative icons from AT',
      'Put icon-only action names on Button, not Icon'
    ],
    donts: [
      'Don’t ship icon-only actions without a name',
      'Don’t announce decorative icons',
      'Don’t use Icon for content-type cues — prefer Object'
    ]
  },
  code: {
    dos: [
      'Use inline for short identifiers; block for multi-line snippets',
      'Keep contrast readable on the subtle surface',
      'Keep snippets short and copy-pasteable'
    ],
    donts: [
      'Don’t use Code for long-form prose',
      'Don’t rely on syntax color alone for meaning (no highlighter yet)',
      'Don’t nest interactive controls inside Code'
    ]
  },
  'visually-hidden': {
    dos: [
      'Use for accessible names or instructions that should not appear visually',
      'Keep content in a meaningful DOM order'
    ],
    donts: [
      'Don’t hide focusable controls with it',
      'Don’t use it as a substitute for visible labels on inputs'
    ]
  },
  text: {
    dos: [
      'Pick a scale step with size',
      'Cap long-form measure on the reading column (~60–75ch)',
      'Use muted for helpers secondary to a visible label'
    ],
    donts: [
      'Don’t hard-code one-off font sizes in product CSS',
      'Don’t skip Heading when you need outline structure',
      'Don’t use Text for short KPIs — prefer Metric text'
    ]
  },
  heading: {
    dos: [
      'Choose level for outline; size for visuals',
      'Keep a single h1 for the page title'
    ],
    donts: [
      'Don’t skip levels to get a visual size — use size',
      'Don’t style a div to look like a heading',
      'Don’t use Heading for body paragraphs — prefer Text'
    ]
  },
  box: {
    dos: [
      'Use for padding and surface grouping',
      'Prefer Stack / Inline / Flex / Grid to arrange children'
    ],
    donts: [
      'Don’t attach click handlers to Box instead of a Button/Link',
      'Don’t nest boxes purely for shadow stacking',
      'Don’t use Box alone for vertical rhythm — prefer Stack'
    ]
  },
  stack: {
    dos: [
      'Use gap tokens for vertical rhythm',
      'Keep DOM order matching reading order',
      'Default choice for forms and section columns'
    ],
    donts: [
      'Don’t use Stack to fake a table or grid of tabular data',
      'Don’t reverse visual order against DOM without a strong reason',
      'Don’t use Stack for horizontal toolbars — prefer Inline'
    ]
  },
  inline: {
    dos: [
      'Use for horizontal groups of related controls',
      'Wrap when space is tight rather than overflowing'
    ],
    donts: [
      'Don’t force nowrap on groups that must reflow on small screens',
      'Don’t put primary page structure only in an Inline',
      'Don’t use Inline for multi-column matrices — prefer Grid'
    ]
  },
  flex: {
    dos: [
      'Use when you need reverse, wrap, or space-evenly beyond Stack/Inline',
      'Keep DOM order matching reading order'
    ],
    donts: [
      'Don’t reach for Flex when Stack or Inline already fits',
      'Don’t use Flex to fake tabular data — prefer Table',
      'Don’t use Flex for equal-width column grids — prefer Grid'
    ]
  },
  grid: {
    dos: [
      'Use equal columns for tile grids and form matrices',
      'Override --pond-grid-columns for custom tracks'
    ],
    donts: [
      'Don’t use Grid for linear reading stacks — prefer Stack',
      'Don’t pack interactive controls so dense they fail hit targets',
      'Don’t use Grid for a single toolbar row — prefer Inline'
    ]
  },
  bleed: {
    dos: [
      'Pull media flush with a padded parent (often a Box)',
      'Prefer token steps over ad-hoc negative margins'
    ],
    donts: [
      'Don’t bleed interactive chrome off-screen on small viewports',
      'Don’t nest bleeds that cancel each other into confusion',
      'Don’t use Bleed as a general spacer — prefer Stack / Box padding'
    ]
  },
  'metric-text': {
    dos: [
      'Use for short numeric KPIs and counts',
      'Pair with a Text label for the unit or meaning'
    ],
    donts: [
      'Don’t set long sentences in Metric text',
      'Don’t use Metric text as a page heading — prefer Heading',
      'Don’t use Metric text for body copy — prefer Text'
    ]
  }
}

export function getDosDonts(component: string): DosDontsEntry | undefined {
  return catalog[component]
}

export function listDosDontsComponents(): string[] {
  return Object.keys(catalog).sort()
}
