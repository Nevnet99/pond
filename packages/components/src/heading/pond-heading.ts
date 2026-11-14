import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Heading primitive (levels 1–6).
 * @status stable
 * @since 0.0.0
 */
@customElement('pond-heading')
export class PondHeading extends LitElement {
  static override styles = css`
    :host {
      display: block;
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-display);
      font-weight: var(--pond-font-weight-bold);
      line-height: var(--pond-font-line-tight);
    }

    :host([appearance='plain']) {
      all: unset;
      display: contents;
    }

    [part='heading'] {
      margin: 0;
      font: inherit;
      color: inherit;
    }

    :host([level='1']) {
      font-size: var(--pond-font-size-2xl);
    }
    :host([level='2']) {
      font-size: var(--pond-font-size-xl);
    }
    :host([level='3']) {
      font-size: var(--pond-font-size-lg);
    }
    :host([level='4']),
    :host([level='5']),
    :host([level='6']) {
      font-size: var(--pond-font-size-md);
    }
  `

  /** Visual presentation. `plain` strips Pond visual CSS. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Heading level — maps to h1–h6. */
  @property({ type: Number, reflect: true })
  level: 1 | 2 | 3 | 4 | 5 | 6 = 2

  override render() {
    const content = html`<slot></slot>`
    switch (this.level) {
      case 1:
        return html`<h1 part="heading">${content}</h1>`
      case 3:
        return html`<h3 part="heading">${content}</h3>`
      case 4:
        return html`<h4 part="heading">${content}</h4>`
      case 5:
        return html`<h5 part="heading">${content}</h5>`
      case 6:
        return html`<h6 part="heading">${content}</h6>`
      default:
        return html`<h2 part="heading">${content}</h2>`
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-heading': PondHeading
  }
}
