import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../icon/pond-icon.js'

export type PondBannerTone = 'info' | 'success' | 'warning' | 'danger'

/** @summary Persistent page-top notice. @status stable @since 0.0.0 @fires pond-close */
@customElement('pond-banner')
export class PondBanner extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; align-items: flex-start; gap: var(--pond-space-3);
      box-sizing: border-box; padding: var(--pond-space-3) var(--pond-space-4);
      border-bottom: 1px solid var(--pond-color-border-default);
      background: var(--pond-color-bg-subtle); color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans); font-size: var(--pond-font-size-md);
    }
    :host([tone='danger']) [part='root'] { background: var(--pond-color-danger-subtle); }
    :host([tone='warning']) [part='root'] { border-bottom-color: var(--pond-color-border-strong); }
    :host([tone='success']) [part='root'] { border-bottom-color: var(--pond-color-accent-hover); }
    :host([tone='info']) [part='root'] { border-bottom-color: var(--pond-color-accent-default); }
    [part='body'] { flex: 1; min-width: 0; }
    [part='close'] {
      margin: 0; padding: var(--pond-space-1); border: 0; border-radius: var(--pond-radius-sm);
      background: transparent; color: inherit; cursor: pointer;
    }
    [part='close']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='body'],
    :host([appearance='plain']) [part='close'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ reflect: true }) tone: PondBannerTone = 'info'
  @property({ type: Boolean }) closable = false
  #close() {
    this.dispatchEvent(
      new CustomEvent('pond-close', { bubbles: true, composed: true })
    )
  }
  override render() {
    return html`<div part="root" role="region" aria-label="Banner">
      <pond-icon name=${this.tone === 'danger' || this.tone === 'warning' ? 'warning' : 'info'}></pond-icon>
      <div part="body"><slot></slot></div>
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
    'pond-banner': PondBanner
  }
}
