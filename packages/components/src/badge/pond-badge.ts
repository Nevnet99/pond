import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Numeric tally badge. @status stable @since 0.0.0 */
@customElement('pond-badge')
export class PondBadge extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="badge"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.25rem;
      padding: 0 var(--pond-space-1);
      border-radius: var(--pond-radius-pill);
      background: var(--pond-color-danger-default);
      color: var(--pond-color-fg-on-accent);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-xs);
      font-weight: var(--pond-font-weight-semibold);
      line-height: 1.25rem;
      font-variant-numeric: tabular-nums;
      text-box: trim-both cap alphabetic;
    }
    :host([appearance="plain"]) [part="badge"] {
      all: unset;
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ type: Number }) value = 0
  @property({ type: Number }) max = 99
  override render() {
    const text = this.value > this.max ? `${this.max}+` : String(this.value)
    return html`<span part="badge" aria-label=${`${this.value} notifications`}>${text}</span>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-badge': PondBadge
  }
}
