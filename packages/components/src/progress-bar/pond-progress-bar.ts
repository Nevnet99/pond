import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Determinate progress indicator. @status stable @since 0.0.0 */
@customElement('pond-progress-bar')
export class PondProgressBar extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: block; width: 100%; height: 0.5rem;
      border-radius: var(--pond-radius-full, 999px);
      background: var(--pond-color-bg-subtle, #e8e8e8);
      overflow: hidden;
    }
    [part='bar'] {
      display: block; height: 100%; width: var(--pond-progress, 0%);
      border-radius: inherit;
      background: var(--pond-color-accent-default);
      transition: width var(--pond-motion-duration-normal) ease;
    }
    @media (prefers-reduced-motion: reduce) {
      [part='bar'] { transition: none; }
    }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='bar'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  /** Value from 0 to 1. */
  @property({ type: Number }) value = 0
  @property() label = 'Progress'
  override render() {
    const pct = Math.max(0, Math.min(1, this.value)) * 100
    return html`<div
      part="root"
      role="progressbar"
      aria-label=${this.label}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow=${Math.round(pct)}
      style=${`--pond-progress: ${pct}%`}
    ><span part="bar"></span></div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-progress-bar': PondProgressBar
  }
}
