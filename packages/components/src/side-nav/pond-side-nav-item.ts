import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Side-nav link or button item with optional icon and one nest level.
 * @status stable
 * @since 0.0.0
 *
 * @slot icon — Leading icon.
 * @slot nested — Optional nested `pond-side-nav-item` children (one level).
 * @slot — Item label.
 *
 * @fires pond-select — Fired for button items (no `href`) when activated.
 *
 * @csspart root — List item wrapper.
 * @csspart control — Anchor or button.
 * @csspart icon — Icon slot wrapper.
 * @csspart label — Label slot wrapper.
 * @csspart nested — Nested list.
 */
@customElement('pond-side-nav-item')
export class PondSideNavItem extends LitElement {
  static override styles = css`
    :host {
      display: block;
      min-width: 0;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-1);
      min-width: 0;
    }

    [part="control"] {
      display: flex;
      align-items: center;
      gap: var(--pond-space-2);
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 0;
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: var(--pond-color-fg-default);
      font: inherit;
      font-size: var(--pond-font-size-sm);
      text-align: start;
      text-decoration: none;
      cursor: pointer;
    }

    [part="control"]:hover {
      background: var(--pond-color-bg-subtle);
    }

    [part="control"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    :host([current]) [part="control"] {
      background: var(--pond-color-bg-subtle);
      font-weight: var(--pond-font-weight-semibold);
      box-shadow: inset 2px 0 0 var(--pond-color-accent-default);
    }

    [part="icon"] {
      display: inline-flex;
      flex: none;
      align-items: center;
      justify-content: center;
      width: 1rem;
      color: var(--pond-color-fg-muted);
    }

    :host(:not([data-has-icon])) [part="icon"] {
      display: none;
    }

    [part="label"] {
      min-width: 0;
      flex: 1;
    }

    [part="nested"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-1);
      margin: 0;
      padding: 0 0 0 var(--pond-space-6);
    }

    :host(:not([data-has-nested])) [part="nested"] {
      display: none;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="control"],
    :host([appearance="plain"]) [part="icon"],
    :host([appearance="plain"]) [part="label"],
    :host([appearance="plain"]) [part="nested"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** When set, the control renders as a link. */
  @property()
  href = ''

  /** Marks the current location (`aria-current="page"`). */
  @property({ type: Boolean, reflect: true })
  current = false

  @state() private hasIcon = false
  @state() private hasNested = false

  #onSlotChange(kind: 'icon' | 'nested', event: Event) {
    const slot = event.target as HTMLSlotElement
    const assigned = slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return true
      return (node.textContent ?? '').trim().length > 0
    })
    if (kind === 'icon') this.hasIcon = assigned
    else this.hasNested = assigned
  }

  #onActivate(event: Event) {
    if (this.href) return
    event.preventDefault()
    this.dispatchEvent(
      new CustomEvent('pond-select', {
        detail: { label: this.textContent?.trim() ?? '' },
        bubbles: true,
        composed: true
      })
    )
  }

  protected override updated(): void {
    this.toggleAttribute('data-has-icon', this.hasIcon)
    this.toggleAttribute('data-has-nested', this.hasNested)
  }

  override render() {
    const label = html`
      <span part="icon">
        <slot
          name="icon"
          @slotchange=${(e: Event) => this.#onSlotChange('icon', e)}
        ></slot>
      </span>
      <span part="label"><slot></slot></span>
    `

    const control = this.href
      ? html`
          <a
            part="control"
            href=${this.href}
            aria-current=${this.current ? 'page' : nothing}
            @click=${this.#onActivate}
            >${label}</a
          >
        `
      : html`
          <button
            type="button"
            part="control"
            aria-current=${this.current ? 'page' : nothing}
            @click=${this.#onActivate}
          >
            ${label}
          </button>
        `

    return html`
      <div part="root" role="listitem">
        ${control}
        <div part="nested" role="list">
          <slot
            name="nested"
            @slotchange=${(e: Event) => this.#onSlotChange('nested', e)}
          ></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-side-nav-item': PondSideNavItem
  }
}
