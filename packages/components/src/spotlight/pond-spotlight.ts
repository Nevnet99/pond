import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Coachmark that highlights a target control and teaches a step.
 * @status stable
 * @since 0.0.0
 *
 * @slot — Body copy for the step.
 * @slot actions — Optional extra actions beside Next / Dismiss.
 *
 * @fires pond-close — Spotlight dismissed.
 * @fires pond-next — Next action activated.
 *
 * @csspart root — Fixed overlay root.
 * @csspart pulse — Highlight ring around the target.
 * @csspart dialog — Coachmark panel.
 * @csspart heading — Step heading.
 * @csspart body — Body slot wrapper.
 * @csspart actions — Action row.
 */
@customElement('pond-spotlight')
export class PondSpotlight extends LitElement {
  static override styles = css`
    :host {
      display: contents;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      position: fixed;
      inset: 0;
      z-index: 50;
      pointer-events: none;
      font-family: var(--pond-font-family-sans);
    }

    [part="scrim"] {
      position: absolute;
      inset: 0;
      background: rgb(0 0 0 / 45%);
      pointer-events: auto;
    }

    [part="pulse"] {
      position: absolute;
      box-sizing: border-box;
      border: 2px solid var(--pond-color-accent-default);
      border-radius: var(--pond-radius-md);
      box-shadow: 0 0 0 9999px rgb(0 0 0 / 45%);
      pointer-events: none;
    }

    [part="dialog"] {
      position: absolute;
      z-index: 1;
      box-sizing: border-box;
      width: min(20rem, calc(100vw - 2rem));
      padding: var(--pond-space-4);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
      font-size: var(--pond-font-size-sm);
      box-shadow: var(--pond-shadow-md, 0 4px 12px rgb(0 0 0 / 12%));
      pointer-events: auto;
    }

    [part="heading"] {
      margin: 0 0 var(--pond-space-2);
      font-size: var(--pond-font-size-md);
      font-weight: var(--pond-font-weight-semibold);
    }

    [part="body"] {
      margin: 0 0 var(--pond-space-3);
    }

    [part="actions"] {
      display: flex;
      flex-wrap: wrap;
      gap: var(--pond-space-2);
      justify-content: flex-end;
      align-items: center;
    }

    [part="actions"] button {
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-sm);
      background: var(--pond-color-bg-surface);
      color: inherit;
      font: inherit;
      cursor: pointer;
    }

    [part="actions"] button[data-primary] {
      border-color: var(--pond-color-accent-default);
      background: var(--pond-color-accent-default);
      color: var(--pond-color-fg-on-accent);
    }

    [part="actions"] button:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="scrim"],
    :host([appearance="plain"]) [part="pulse"],
    :host([appearance="plain"]) [part="dialog"],
    :host([appearance="plain"]) [part="heading"],
    :host([appearance="plain"]) [part="body"],
    :host([appearance="plain"]) [part="actions"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ type: Boolean, reflect: true })
  open = false

  /** CSS selector for the element to highlight (document-scoped). */
  @property()
  target = ''

  @property()
  heading = ''

  @property()
  label = 'Feature tip'

  @property({ attribute: 'next-label' })
  nextLabel = 'Next'

  @property({ attribute: 'dismiss-label' })
  dismissLabel = 'Dismiss'

  @property({ type: Boolean, attribute: 'show-next' })
  showNext = true

  @state() private targetRect: DOMRect | null = null

  #previousFocus: HTMLElement | null = null

  #onKey = (event: KeyboardEvent) => {
    if (!this.open) return
    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
    }
  }

  #measure = () => {
    if (!this.open || !this.target) {
      this.targetRect = null
      return
    }
    const el = document.querySelector(this.target)
    this.targetRect = el?.getBoundingClientRect() ?? null
  }

  override connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keydown', this.#onKey)
    window.addEventListener('resize', this.#measure)
    window.addEventListener('scroll', this.#measure, true)
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this.#onKey)
    window.removeEventListener('resize', this.#measure)
    window.removeEventListener('scroll', this.#measure, true)
    super.disconnectedCallback()
  }

  protected override updated(changed: Map<string, unknown>) {
    if (changed.has('open') || changed.has('target')) {
      if (this.open) {
        this.#previousFocus = document.activeElement as HTMLElement | null
        this.#measure()
        this.updateComplete.then(() => {
          const dialog = this.renderRoot.querySelector(
            '[part="dialog"]'
          ) as HTMLElement | null
          dialog?.focus()
        })
      } else if (changed.has('open')) {
        this.#previousFocus?.focus?.()
        this.#previousFocus = null
        this.targetRect = null
      }
    }
  }

  close() {
    this.open = false
    this.dispatchEvent(
      new CustomEvent('pond-close', { bubbles: true, composed: true })
    )
  }

  #next() {
    this.dispatchEvent(
      new CustomEvent('pond-next', { bubbles: true, composed: true })
    )
  }

  override render() {
    if (!this.open) return nothing

    const rect = this.targetRect
    const pad = 4
    const pulseStyle = rect
      ? `top:${rect.top - pad}px;left:${rect.left - pad}px;width:${rect.width + pad * 2}px;height:${rect.height + pad * 2}px;`
      : nothing
    const dialogStyle = rect
      ? `top:${Math.min(rect.bottom + 12, window.innerHeight - 12)}px;left:${Math.min(Math.max(12, rect.left), window.innerWidth - 20 * 16)}px;`
      : 'top:50%;left:50%;transform:translate(-50%,-50%);'

    return html`
      <div part="root">
        ${
          rect
            ? html`<div part="pulse" style=${pulseStyle}></div>`
            : html`<div part="scrim" @click=${() => this.close()}></div>`
        }
        <div
          part="dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${this.label}
          tabindex="-1"
          style=${dialogStyle}
        >
          ${
            this.heading
              ? html`<h2 part="heading">${this.heading}</h2>`
              : nothing
          }
          <div part="body"><slot></slot></div>
          <div part="actions">
            <slot name="actions"></slot>
            <button type="button" @click=${() => this.close()}>
              ${this.dismissLabel}
            </button>
            ${
              this.showNext
                ? html`<button
                  type="button"
                  data-primary
                  @click=${() => this.#next()}
                >
                  ${this.nextLabel}
                </button>`
                : nothing
            }
          </div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-spotlight': PondSpotlight
  }
}
