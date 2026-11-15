import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../icon/pond-icon.js'

export type PondFlagTone = 'info' | 'success' | 'warning' | 'danger'

/** @summary Transient toast-style feedback. @status stable @since 0.0.0 @fires pond-close */
@customElement('pond-flag')
export class PondFlag extends LitElement {
  static override styles = css`
    :host {
      display: block;
      max-width: 24rem;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      display: flex;
      align-items: flex-start;
      gap: var(--pond-space-3);
      box-sizing: border-box;
      padding: var(--pond-space-3);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-surface);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
      box-shadow: var(--pond-shadow-md, 0 4px 12px rgb(0 0 0 / 12%));
    }
    :host([tone="danger"]) [part="root"] {
      border-color: var(--pond-color-danger-default);
    }
    [part="title"] {
      margin: 0 0 var(--pond-space-1);
      font-weight: var(--pond-font-weight-semibold);
    }
    [part="body"] {
      margin: 0;
      flex: 1;
      min-width: 0;
    }
    [part="close"] {
      margin: 0;
      padding: var(--pond-space-1);
      border: 0;
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: inherit;
      cursor: pointer;
    }
    [part="close"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="title"],
    :host([appearance="plain"]) [part="body"],
    :host([appearance="plain"]) [part="close"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ reflect: true }) tone: PondFlagTone = 'info'
  @property() title = ''
  @property({ type: Boolean }) closable = true
  @property({ type: Number, attribute: 'auto-dismiss' }) autoDismiss = 0
  #timer?: number
  override connectedCallback() {
    super.connectedCallback()
    if (this.autoDismiss > 0) {
      this.#timer = window.setTimeout(() => this.#close(), this.autoDismiss)
    }
  }
  override disconnectedCallback() {
    if (this.#timer) window.clearTimeout(this.#timer)
    super.disconnectedCallback()
  }
  #close() {
    this.dispatchEvent(
      new CustomEvent('pond-close', { bubbles: true, composed: true })
    )
  }
  override render() {
    const role = this.tone === 'danger' ? 'alert' : 'status'
    return html`<div part="root" role=${role}>
      <pond-icon name=${this.tone === 'danger' || this.tone === 'warning' ? 'warning' : 'check'}></pond-icon>
      <div part="body">
        ${this.title ? html`<p part="title">${this.title}</p>` : nothing}
        <slot></slot>
      </div>
      ${
        this.closable
          ? html`<button part="close" type="button" aria-label="Close" @click=${this.#close}>
            <pond-icon name="close" size="sm"></pond-icon>
          </button>`
          : nothing
      }
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-flag': PondFlag
  }
}
