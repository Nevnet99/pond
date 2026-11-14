import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Body text primitive.
 * @status stable
 * @since 0.0.0
 */
@customElement('pond-text')
export class PondText extends LitElement {
  static override styles = css`
    :host {
      display: block;
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-md);
      font-weight: var(--pond-font-weight-regular);
      line-height: var(--pond-font-line-normal);
    }

    :host([appearance='plain']) {
      all: unset;
      display: contents;
    }

    [part='text'] {
      margin: 0;
    }

    :host([appearance='plain']) [part='text'] {
      all: unset;
      display: contents;
    }

    :host([size='sm']) {
      font-size: var(--pond-font-size-sm);
    }

    :host([size='lg']) {
      font-size: var(--pond-font-size-lg);
    }

    :host([muted]) {
      color: var(--pond-color-fg-muted);
    }
  `

  /** Visual presentation. `plain` strips Pond visual CSS. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Type scale step. */
  @property({ reflect: true })
  size: 'sm' | 'md' | 'lg' = 'md'

  /** Muted foreground. Ignored when plain. */
  @property({ type: Boolean, reflect: true })
  muted = false

  override render() {
    return html`<p part="text"><slot></slot></p>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-text': PondText
  }
}
