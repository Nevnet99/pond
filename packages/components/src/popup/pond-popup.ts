import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Anchored overlay for brief content — no dim, no focus trap. @status stable @since 0.0.0 @fires pond-close */
@customElement('pond-popup')
export class PondPopup extends LitElement {
  static override styles = css`
    :host { display: inline-block; position: relative; }
    :host([appearance='plain']) { display: contents; }
    [part='trigger'] { display: inline-flex; }
    [part='panel'] {
      position: absolute; z-index: 30; top: calc(100% + var(--pond-space-1)); left: 0;
      min-width: 12rem; max-width: min(20rem, 90vw);
      box-sizing: border-box; padding: var(--pond-space-3);
      border: 1px solid var(--pond-color-border-default); border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas); color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans); font-size: var(--pond-font-size-sm);
      box-shadow: var(--pond-shadow-md, 0 4px 12px rgb(0 0 0 / 12%));
    }
    :host([appearance='plain']) [part='trigger'],
    :host([appearance='plain']) [part='panel'] { all: unset; }
    :host([appearance='plain']) [part='trigger'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ type: Boolean, reflect: true }) open = false
  @property() label = 'Popup'
  @query('[part="panel"]') private panel!: HTMLElement
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
    const path = event.composedPath()
    if (!path.includes(this)) this.close()
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
  protected updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return
    if (this.open) {
      this.#previousFocus = document.activeElement as HTMLElement | null
      this.updateComplete.then(() => this.panel?.focus())
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
  #toggle = () => {
    this.open = !this.open
  }
  override render() {
    return html`
      <span part="trigger" @click=${(e: Event) => {
        e.stopPropagation()
        this.#toggle()
      }}>
        <slot name="trigger"></slot>
      </span>
      ${
        this.open
          ? html`<div part="panel" role="dialog" aria-label=${this.label} tabindex="-1">
              <slot></slot>
            </div>`
          : nothing
      }
    `
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-popup': PondPopup
  }
}
