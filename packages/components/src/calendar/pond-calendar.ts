import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size)
    out.push(items.slice(i, i + size))
  return out
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}
function toIsoDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function parseIso(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null
  const [y, m, d] = value.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** @summary Month grid for selecting a single date. @status stable @since 0.0.0 @fires pond-change */
@customElement('pond-calendar')
export class PondCalendar extends LitElement {
  static override styles = css`
    :host {
      display: block;
      max-width: 18rem;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
      padding: var(--pond-space-3);
      background: var(--pond-color-bg-canvas);
    }
    [part="header"] {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--pond-space-2);
      gap: var(--pond-space-2);
    }
    [part="title"] {
      margin: 0;
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-semibold);
    }
    [part="nav"] {
      margin: 0;
      padding: var(--pond-space-1) var(--pond-space-2);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: inherit;
      cursor: pointer;
      font: inherit;
    }
    [part="nav"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    [part="grid"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-1);
      text-align: center;
      font-size: var(--pond-font-size-sm);
    }
    [part="row"] {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: var(--pond-space-1);
    }
    [part="weekday"] {
      color: var(--pond-color-fg-subtle);
      font-weight: var(--pond-font-weight-medium);
      padding: var(--pond-space-1);
    }
    [part="day"] {
      margin: 0;
      padding: var(--pond-space-1);
      border: 0;
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: inherit;
      cursor: pointer;
      font: inherit;
    }
    [part="day"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    [part="day"][aria-selected="true"] {
      background: var(--pond-color-accent-default);
      color: var(--pond-color-fg-inverse, #fff);
    }
    /* Solid muted color — opacity fails axe color-contrast. */
    [part="day"][data-outside] {
      color: var(--pond-color-fg-subtle, #595959);
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="header"],
    :host([appearance="plain"]) [part="title"],
    :host([appearance="plain"]) [part="nav"],
    :host([appearance="plain"]) [part="grid"],
    :host([appearance="plain"]) [part="row"],
    :host([appearance="plain"]) [part="day"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  /** Selected date as YYYY-MM-DD */
  @property() value = ''
  @state() private view = startOfMonth(new Date())

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('value') && this.value) {
      const parsed = parseIso(this.value)
      if (parsed) this.view = startOfMonth(parsed)
    }
  }

  #shift(delta: number) {
    this.view = new Date(
      this.view.getFullYear(),
      this.view.getMonth() + delta,
      1
    )
  }

  #select(iso: string) {
    this.value = iso
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { value: iso },
        bubbles: true,
        composed: true
      })
    )
  }

  #cells() {
    const first = startOfMonth(this.view)
    // Monday=0 … Sunday=6
    const offset = (first.getDay() + 6) % 7
    const total = daysInMonth(this.view)
    const cells: { iso: string; day: number; outside: boolean }[] = []
    for (let i = 0; i < offset; i++) {
      const d = new Date(first.getFullYear(), first.getMonth(), i - offset + 1)
      cells.push({ iso: toIsoDate(d), day: d.getDate(), outside: true })
    }
    for (let day = 1; day <= total; day++) {
      const d = new Date(first.getFullYear(), first.getMonth(), day)
      cells.push({ iso: toIsoDate(d), day, outside: false })
    }
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1]
      const parsed = parseIso(last.iso)
      if (!parsed) break
      const d = parsed
      d.setDate(d.getDate() + 1)
      cells.push({ iso: toIsoDate(d), day: d.getDate(), outside: true })
    }
    return cells
  }

  override render() {
    const title = this.view.toLocaleString(undefined, {
      month: 'long',
      year: 'numeric'
    })
    return html`<div part="root">
      <div part="header">
        <button part="nav" type="button" aria-label="Previous month" @click=${() => this.#shift(-1)}>‹</button>
        <h2 part="title">${title}</h2>
        <button part="nav" type="button" aria-label="Next month" @click=${() => this.#shift(1)}>›</button>
      </div>
      <div part="grid" role="grid" aria-label=${title}>
        <div part="row" role="row">
          ${WEEKDAYS.map(
            (d) => html`<div part="weekday" role="columnheader">${d}</div>`
          )}
        </div>
        ${chunk(this.#cells(), 7).map(
          (week) => html`<div part="row" role="row">
            ${week.map((c) => {
              const label = parseIso(c.iso)?.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
              return html`<button
                part="day"
                type="button"
                role="gridcell"
                aria-label=${label ?? c.iso}
                aria-selected=${c.iso === this.value ? 'true' : 'false'}
                ?data-outside=${c.outside}
                @click=${() => this.#select(c.iso)}
              >${c.day}</button>`
            })}
          </div>`
        )}
      </div>
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-calendar': PondCalendar
  }
}
