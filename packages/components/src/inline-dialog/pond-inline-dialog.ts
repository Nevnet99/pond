import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Anchored dialog for short content plus optional actions.
 * @status stable
 * @since 0.0.0
 *
 * @slot trigger — Control that toggles the dialog.
 * @slot heading — Overrides `heading` property.
 * @slot actions — Footer actions (buttons).
 * @slot — Dialog body.
 *
 * @fires pond-close — Dialog closed.
 * @fires pond-change — Open state changed (`detail.open`).
 *
 * @csspart trigger — Trigger wrapper.
 * @csspart panel — Dialog panel.
 * @csspart heading — Title.
 * @csspart body — Body region.
 * @csspart actions — Actions row.
 * @csspart close — Close control.
 */
@customElement('pond-inline-dialog')
export class PondInlineDialog extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      position: relative;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="trigger"] {
      display: inline-flex;
    }

    [part="panel"] {
      position: absolute;
      z-index: 30;
      top: calc(100% + var(--pond-space-1));
      left: 0;
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-3);
      box-sizing: border-box;
      min-width: 14rem;
      max-width: min(22rem, 90vw);
      padding: var(--pond-space-4);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
      box-shadow: var(--pond-shadow-md, 0 4px 12px rgb(0 0 0 / 12%));
    }

    [part="header"] {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--pond-space-2);
    }

    [part="heading"] {
      margin: 0;
      font-size: var(--pond-font-size-md);
      font-weight: var(--pond-font-weight-semibold);
      line-height: var(--pond-font-line-tight);
    }

    [part="close"] {
      flex: none;
      margin: 0;
      padding: var(--pond-space-1);
      border: 0;
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: var(--pond-color-fg-muted);
      font: inherit;
      line-height: 1;
      cursor: pointer;
    }

    [part="close"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part="body"] {
      min-width: 0;
    }

    [part="actions"] {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: var(--pond-space-2);
    }

    :host(:not([data-has-actions])) [part="actions"] {
      display: none;
    }

    :host([appearance="plain"]) [part="trigger"],
    :host([appearance="plain"]) [part="panel"],
    :host([appearance="plain"]) [part="header"],
    :host([appearance="plain"]) [part="heading"],
    :host([appearance="plain"]) [part="close"],
    :host([appearance="plain"]) [part="body"],
    :host([appearance="plain"]) [part="actions"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="trigger"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ type: Boolean, reflect: true })
  open = false

  /** Dialog title when the heading slot is empty. */
  @property()
  heading = ''

  @property({ type: Boolean, attribute: 'show-close', reflect: true })
  showClose = true

  @query('[part="panel"]') private panel!: HTMLElement

  @state() private hasHeadingSlot = false
  @state() private hasActions = false

  #previousFocus: HTMLElement | null = null

  #onKey = (event: KeyboardEvent) => {
    if (!this.open) return
    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
    }
  }

  #onDocClick = (event: MouseEvent) => {
    if (!this.open) return
    if (!event.composedPath().includes(this)) this.close()
  }

  #onSlotChange(kind: 'heading' | 'actions', event: Event) {
    const slot = event.target as HTMLSlotElement
    const assigned = slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return true
      return (node.textContent ?? '').trim().length > 0
    })
    if (kind === 'heading') this.hasHeadingSlot = assigned
    else this.hasActions = assigned
  }

  override connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keydown', this.#onKey)
    document.addEventListener('click', this.#onDocClick, true)
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this.#onKey)
    document.removeEventListener('click', this.#onDocClick, true)
    super.disconnectedCallback()
  }

  protected override updated(changed: Map<string, unknown>): void {
    this.toggleAttribute('data-has-actions', this.hasActions)
    if (!changed.has('open')) return
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { open: this.open },
        bubbles: true,
        composed: true
      })
    )
    if (this.open) {
      this.#previousFocus = document.activeElement as HTMLElement | null
      this.updateComplete.then(() => this.panel?.focus())
    } else {
      this.#previousFocus?.focus?.()
      this.#previousFocus = null
    }
  }

  close() {
    if (!this.open) return
    this.open = false
    this.dispatchEvent(
      new CustomEvent('pond-close', { bubbles: true, composed: true })
    )
  }

  #toggle = (event: Event) => {
    event.stopPropagation()
    this.open = !this.open
  }

  override render() {
    const titleText =
      this.hasHeadingSlot || !this.heading.trim()
        ? nothing
        : html`<h2 part="heading" id="pond-inline-dialog-heading">
            ${this.heading}
          </h2>`

    return html`
      <span part="trigger" @click=${this.#toggle}>
        <slot name="trigger"></slot>
      </span>
      ${
        this.open
          ? html`
            <div
              part="panel"
              role="dialog"
              aria-modal="false"
              aria-labelledby=${
                this.heading.trim() && !this.hasHeadingSlot
                  ? 'pond-inline-dialog-heading'
                  : nothing
              }
              aria-label=${
                this.heading.trim() && !this.hasHeadingSlot ? nothing : 'Dialog'
              }
              tabindex="-1"
            >
              <div part="header">
                <slot
                  name="heading"
                  @slotchange=${(e: Event) => this.#onSlotChange('heading', e)}
                  >${titleText}</slot
                >
                ${
                  this.showClose
                    ? html`<button
                      type="button"
                      part="close"
                      aria-label="Close"
                      @click=${() => this.close()}
                    >
                      ×
                    </button>`
                    : nothing
                }
              </div>
              <div part="body"><slot></slot></div>
              <div part="actions">
                <slot
                  name="actions"
                  @slotchange=${(e: Event) => this.#onSlotChange('actions', e)}
                ></slot>
              </div>
            </div>
          `
          : nothing
      }
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-inline-dialog': PondInlineDialog
  }
}
