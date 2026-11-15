import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Modal dialog with basic focus handling.
 * @status stable
 * @since 0.0.0
 */
@customElement('pond-modal')
export class PondModal extends LitElement {
  static override styles = css`
    :host {
      display: contents;
    }

    [part='backdrop'] {
      position: fixed;
      inset: 0;
      z-index: 40;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--pond-space-4);
      background: rgb(0 0 0 / 45%);
    }

    [part='dialog'] {
      box-sizing: border-box;
      width: min(100%, 28rem);
      max-height: min(90vh, 40rem);
      overflow: auto;
      padding: var(--pond-space-6);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      box-shadow: 0 8px 32px rgb(0 0 0 / 25%);
    }

    [part='title'] {
      margin: 0 0 var(--pond-space-3);
      font-size: var(--pond-font-size-xl);
      font-weight: var(--pond-font-weight-semibold);
      line-height: var(--pond-font-line-snug);
    }

    [part='body'] {
      margin: 0 0 var(--pond-space-4);
    }

    [part='actions'] {
      display: flex;
      justify-content: flex-end;
      gap: var(--pond-space-2);
    }

    :host([appearance='plain']) [part='backdrop'],
    :host([appearance='plain']) [part='dialog'],
    :host([appearance='plain']) [part='title'],
    :host([appearance='plain']) [part='body'],
    :host([appearance='plain']) [part='actions'] {
      all: unset;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ type: Boolean, reflect: true })
  open = false

  @property()
  title = ''

  @query('[part="dialog"]')
  private dialog!: HTMLElement

  #onKey = (event: KeyboardEvent) => {
    if (!this.open) return
    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
    }
  }

  override connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keydown', this.#onKey)
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this.#onKey)
    super.disconnectedCallback()
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has('open') && this.open) {
      this.updateComplete.then(() => {
        this.dialog?.focus()
      })
    }
  }

  close() {
    this.open = false
    this.dispatchEvent(
      new CustomEvent('pond-close', { bubbles: true, composed: true })
    )
  }

  override render() {
    if (!this.open) return nothing
    return html`
      <div
        part="backdrop"
        @click=${(e: MouseEvent) => {
          if (e.target === e.currentTarget) this.close()
        }}>
        <div
          part="dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${this.title || 'Dialog'}
          tabindex="-1">
          ${this.title ? html`<h2 part="title">${this.title}</h2>` : nothing}
          <div part="body"><slot></slot></div>
          <div part="actions"><slot name="actions"></slot></div>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-modal': PondModal
  }
}
