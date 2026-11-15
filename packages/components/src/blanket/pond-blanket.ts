import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Slottable backdrop for layered UI. @status stable @since 0.0.0 @fires pond-dismiss */
@customElement('pond-blanket')
export class PondBlanket extends LitElement {
  static override styles = css`
    :host {
      display: contents;
    }
    [part="root"] {
      position: fixed;
      inset: 0;
      z-index: 40;
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      background: rgb(0 0 0 / 45%);
      font-family: var(--pond-font-family-sans);
      animation: pond-blanket-in var(--pond-motion-duration-normal)
        var(--pond-motion-easing-enter) both;
    }
    @keyframes pond-blanket-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      [part="root"] {
        animation: none;
      }
    }
    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ type: Boolean, attribute: 'click-dismiss' }) clickDismiss = true
  #onClick = (e: MouseEvent) => {
    if (!this.clickDismiss) return
    if (e.target === e.currentTarget) {
      this.dispatchEvent(
        new CustomEvent('pond-dismiss', { bubbles: true, composed: true })
      )
    }
  }
  override render() {
    return html`<div part="root" @click=${this.#onClick}><slot></slot></div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-blanket': PondBlanket
  }
}
