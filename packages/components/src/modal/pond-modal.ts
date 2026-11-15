import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import { cycleTab, getFocusable } from '../shared/focus-trap.js'
import '../blanket/pond-blanket.js'

/**
 * @summary Modal dialog composing Blanket with focus trap.
 * @status stable
 * @since 0.0.0
 * @fires pond-close
 */
@customElement('pond-modal')
export class PondModal extends LitElement {
  static override styles = css`
    :host {
      display: contents;
    }
    [part="dialog"] {
      box-sizing: border-box;
      width: min(100%, 28rem);
      max-height: min(90vh, 40rem);
      margin: auto;
      overflow: auto;
      padding: var(--pond-space-6);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      box-shadow: 0 8px 32px rgb(0 0 0 / 25%);
    }
    [part="title"] {
      margin: 0 0 var(--pond-space-3);
      font-size: var(--pond-font-size-xl);
      font-weight: var(--pond-font-weight-semibold);
      line-height: var(--pond-font-line-snug);
    }
    [part="body"] {
      margin: 0 0 var(--pond-space-4);
    }
    [part="actions"] {
      display: flex;
      justify-content: flex-end;
      gap: var(--pond-space-2);
    }
    :host([appearance="plain"]) [part="dialog"],
    :host([appearance="plain"]) [part="title"],
    :host([appearance="plain"]) [part="body"],
    :host([appearance="plain"]) [part="actions"] {
      all: unset;
    }
  `

  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ type: Boolean, reflect: true }) open = false
  @property() title = ''

  @query('[part="dialog"]')
  private dialog!: HTMLElement

  #previousFocus: HTMLElement | null = null

  #focusables(): HTMLElement[] {
    const fromShadow = this.dialog ? getFocusable(this.dialog) : []
    const fromLight = getFocusable(this)
    const seen = new Set<HTMLElement>()
    const out: HTMLElement[] = []
    for (const el of [...fromShadow, ...fromLight]) {
      if (!seen.has(el)) {
        seen.add(el)
        out.push(el)
      }
    }
    return out
  }

  #onKey = (event: KeyboardEvent) => {
    if (!this.open) return
    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
      return
    }
    if (event.key === 'Tab') {
      cycleTab(event, this.#focusables(), this.dialog)
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
    if (!changed.has('open')) return
    if (this.open) {
      this.#previousFocus = document.activeElement as HTMLElement | null
      this.updateComplete.then(() => {
        const nodes = this.#focusables()
        ;(nodes[0] ?? this.dialog)?.focus()
      })
    } else {
      this.#previousFocus?.focus?.()
      this.#previousFocus = null
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
      <pond-blanket @pond-dismiss=${() => this.close()}>
        <div
          part="dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${this.title || 'Dialog'}
          tabindex="-1"
        >
          ${this.title ? html`<h2 part="title">${this.title}</h2>` : nothing}
          <div part="body"><slot></slot></div>
          <div part="actions"><slot name="actions"></slot></div>
        </div>
      </pond-blanket>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-modal': PondModal
  }
}
