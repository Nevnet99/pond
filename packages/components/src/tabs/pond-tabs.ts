import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondTabItem = { value: string; label: string; disabled?: boolean }

/**
 * @summary Tab list with slotted panels (slot name = tab value).
 * @status stable
 * @since 0.0.0
 *
 * @csspart root — Outer wrapper.
 * @csspart tablist — The tab list.
 * @csspart tab — Each tab button.
 * @csspart panels — Panel region.
 * @csspart panel — Active panel wrapper.
 *
 * @fires pond-change — Selected tab value changed (`detail.value`).
 */
@customElement('pond-tabs')
export class PondTabs extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='root'] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-3);
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
    }

    [part='tablist'] {
      display: flex;
      flex-wrap: wrap;
      gap: var(--pond-space-1);
      margin: 0;
      padding: 0;
      border-bottom: 1px solid var(--pond-color-border-default);
      list-style: none;
    }

    [part='tab'] {
      box-sizing: border-box;
      margin: 0 0 -1px;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 1px solid transparent;
      border-bottom: none;
      border-radius: var(--pond-radius-md) var(--pond-radius-md) 0 0;
      background: transparent;
      color: var(--pond-color-fg-muted);
      font: inherit;
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
      cursor: pointer;
    }

    [part='tab'][aria-selected='true'] {
      border-color: var(--pond-color-border-default);
      border-bottom-color: var(--pond-color-bg-canvas);
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
    }

    [part='tab']:hover:not(:disabled):not([aria-selected='true']) {
      color: var(--pond-color-fg-default);
    }

    [part='tab']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part='tab']:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    [part='panels'] {
      min-width: 0;
    }

    [part='panel'] {
      margin: 0;
    }

    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='tablist'],
    :host([appearance='plain']) [part='tab'],
    :host([appearance='plain']) [part='panels'],
    :host([appearance='plain']) [part='panel'] {
      all: unset;
    }

    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='tablist'],
    :host([appearance='plain']) [part='panels'] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ type: Array })
  items: PondTabItem[] = []

  @property({ reflect: true })
  selected = ''

  #tabId(value: string) {
    return `pond-tab-${value}`
  }

  #panelId(value: string) {
    return `pond-tab-panel-${value}`
  }

  #effectiveSelected(): string {
    const enabled = this.items.filter((i) => !i.disabled)
    if (enabled.some((i) => i.value === this.selected)) return this.selected
    return enabled[0]?.value ?? ''
  }

  #select(value: string) {
    if (value === this.selected) return
    this.selected = value
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { value },
        bubbles: true,
        composed: true
      })
    )
  }

  #onKeydown(e: KeyboardEvent) {
    const enabled = this.items.filter((i) => !i.disabled)
    if (enabled.length === 0) return
    const current = this.#effectiveSelected()
    const idx = enabled.findIndex((i) => i.value === current)
    let next = idx
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (idx + 1) % enabled.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (idx - 1 + enabled.length) % enabled.length
    } else if (e.key === 'Home') {
      next = 0
    } else if (e.key === 'End') {
      next = enabled.length - 1
    } else {
      return
    }
    e.preventDefault()
    const value = enabled[next]?.value
    if (!value) return
    this.#select(value)
    const btn = this.renderRoot.querySelector<HTMLButtonElement>(
      `#${CSS.escape(this.#tabId(value))}`
    )
    btn?.focus()
  }

  override render() {
    const selected = this.#effectiveSelected()
    return html`
      <div part="root">
        <div
          part="tablist"
          role="tablist"
          @keydown=${this.#onKeydown}
        >
          ${this.items.map((item) => {
            const isSelected = item.value === selected
            return html`
              <button
                part="tab"
                type="button"
                role="tab"
                id=${this.#tabId(item.value)}
                aria-selected=${isSelected ? 'true' : 'false'}
                aria-controls=${this.#panelId(item.value)}
                tabindex=${isSelected ? 0 : -1}
                ?disabled=${Boolean(item.disabled)}
                @click=${() => {
                  if (!item.disabled) this.#select(item.value)
                }}
              >
                ${item.label}
              </button>
            `
          })}
        </div>
        <div part="panels">
          ${
            selected
              ? html`
                <div
                  part="panel"
                  role="tabpanel"
                  id=${this.#panelId(selected)}
                  aria-labelledby=${this.#tabId(selected)}
                >
                  <slot name=${selected}></slot>
                </div>
              `
              : nothing
          }
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-tabs': PondTabs
  }
}
