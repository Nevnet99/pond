import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Progress indicator — determinate or indeterminate. @status stable @since 0.0.0 */
@customElement('pond-progress-bar')
export class PondProgressBar extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      display: block;
      width: 100%;
      height: 0.5rem;
      border-radius: var(--pond-radius-full, 999px);
      background: var(--pond-color-bg-subtle, #e8e8e8);
      overflow: hidden;
    }
    [part="bar"] {
      display: block;
      height: 100%;
      width: var(--pond-progress, 0%);
      border-radius: inherit;
      background: var(--pond-color-accent-default);
      transition: width var(--pond-motion-duration-normal) ease;
    }
    :host([indeterminate]) [part="bar"] {
      width: 40%;
      animation: pond-progress-indeterminate
        var(--pond-motion-duration-slow, 900ms) ease-in-out infinite;
    }
    @keyframes pond-progress-indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(250%);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      [part="bar"] {
        transition: none;
      }
      :host([indeterminate]) [part="bar"] {
        animation: none;
        width: 40%;
      }
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="bar"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  /** Value from 0 to 1. */
  @property({ type: Number }) value = 0
  @property({ type: Boolean, reflect: true }) indeterminate = false
  @property() label = 'Progress'
  override render() {
    const pct = Math.max(0, Math.min(1, this.value)) * 100
    return html`<div
      part="root"
      role="progressbar"
      aria-label=${this.label}
      aria-valuemin=${this.indeterminate ? nothing : 0}
      aria-valuemax=${this.indeterminate ? nothing : 100}
      aria-valuenow=${this.indeterminate ? nothing : Math.round(pct)}
      style=${this.indeterminate ? '' : `--pond-progress: ${pct}%`}
    ><span part="bar"></span></div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-progress-bar': PondProgressBar
  }
}
