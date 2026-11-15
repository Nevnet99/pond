import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondSpinnerSize = 'sm' | 'md' | 'lg'

/**
 * @summary Loading indicator.
 * @status stable
 * @since 0.0.0
 *
 * @csspart spinner — The animated ring.
 */
@customElement('pond-spinner')
export class PondSpinner extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='spinner'] {
      box-sizing: border-box;
      width: var(--pond-spinner-size, 1.5rem);
      height: var(--pond-spinner-size, 1.5rem);
      border: 2px solid var(--pond-color-border-default);
      border-top-color: var(--pond-color-accent-default);
      border-radius: 50%;
      animation: pond-spin var(--pond-motion-duration-slow, 900ms) linear infinite;
    }

    :host([size='sm']) {
      --pond-spinner-size: 1rem;
    }

    :host([size='md']) {
      --pond-spinner-size: 1.5rem;
    }

    :host([size='lg']) {
      --pond-spinner-size: 2rem;
    }

    @keyframes pond-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [part='spinner'] {
        animation: none;
        opacity: 0.85;
      }
    }

    :host([appearance='plain']) [part='spinner'] {
      all: unset;
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  size: PondSpinnerSize = 'md'

  @property()
  label = 'Loading'

  override render() {
    return html`<span
      part="spinner"
      role="status"
      aria-label=${this.label}></span>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-spinner': PondSpinner
  }
}
