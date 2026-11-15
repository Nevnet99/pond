import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondMenuItem = {
  value: string
  label: string
  disabled?: boolean
  danger?: boolean
}

/**
 * @summary Dropdown actions menu (not the full Navigation system).
 * @status stable
 * @since 0.0.0
 *
 * @fires pond-select — Item chosen (`detail.value`).
 * @fires pond-change — Open state changed (`detail.open`).
 */
@customElement('pond-menu')
export class PondMenu extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='trigger'] {
      display: inline-flex;
      align-items: center;
      gap: var(--pond-space-2);
      box-sizing: border-box;
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 1px solid var(--pond-color-border-strong);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
      cursor: pointer;
    }

    [part='trigger']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part='list'] {
      position: absolute;
      z-index: 20;
      top: calc(100% + var(--pond-space-1));
      left: 0;
      min-width: 10rem;
      margin: 0;
      padding: var(--pond-space-1);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-surface);
      box-shadow: var(--pond-shadow-md, 0 4px 12px rgb(0 0 0 / 12%));
      list-style: none;
    }

    [part='item'] {
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 0;
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: var(--pond-color-fg-default);
      font: inherit;
      font-size: var(--pond-font-size-sm);
      text-align: left;
      cursor: pointer;
    }

    [part='item']:hover:not(:disabled),
    [part='item']:focus-visible {
      background: var(--pond-color-bg-subtle);
      outline: none;
    }

    [part='item'][data-danger] {
      color: var(--pond-color-danger-default);
    }

    [part='item']:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([appearance='plain']) [part='trigger'],
    :host([appearance='plain']) [part='list'],
    :host([appearance='plain']) [part='item'] {
      all: unset;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property()
  label = 'Actions'

  @property({ type: Array })
  items: PondMenuItem[] = []

  @property({ type: Boolean, reflect: true })
  open = false

  @state()
  private _ignoreDocClick = false

  #setOpen(open: boolean) {
    if (open === this.open) return
    this.open = open
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { open },
        bubbles: true,
        composed: true
      })
    )
  }

  #onTriggerClick = () => {
    this._ignoreDocClick = true
    this.#setOpen(!this.open)
  }

  #onSelect(item: PondMenuItem) {
    if (item.disabled) return
    this.dispatchEvent(
      new CustomEvent('pond-select', {
        detail: { value: item.value },
        bubbles: true,
        composed: true
      })
    )
    this.#setOpen(false)
  }

  #onDocClick = () => {
    if (this._ignoreDocClick) {
      this._ignoreDocClick = false
      return
    }
    if (this.open) this.#setOpen(false)
  }

  #onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.open) {
      e.preventDefault()
      this.#setOpen(false)
    }
  }

  override connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this.#onDocClick)
    this.addEventListener('keydown', this.#onKeydown)
  }

  override disconnectedCallback() {
    document.removeEventListener('click', this.#onDocClick)
    this.removeEventListener('keydown', this.#onKeydown)
    super.disconnectedCallback()
  }

  override render() {
    return html`
      <button
        part="trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded=${this.open ? 'true' : 'false'}
        @click=${this.#onTriggerClick}
      >
        <slot name="trigger">${this.label}</slot>
      </button>
      ${
        this.open
          ? html`
            <ul part="list" role="menu">
              ${this.items.map(
                (item) => html`
                  <li role="none">
                    <button
                      part="item"
                      type="button"
                      role="menuitem"
                      ?disabled=${Boolean(item.disabled)}
                      data-danger=${item.danger ? '' : nothing}
                      @click=${() => this.#onSelect(item)}
                    >
                      ${item.label}
                    </button>
                  </li>
                `
              )}
            </ul>
          `
          : nothing
      }
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-menu': PondMenu
  }
}
