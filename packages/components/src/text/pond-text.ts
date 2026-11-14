import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import type { PondTypeSize } from '../shared/type-scale.js'

export type PondTextSize = Extract<
  PondTypeSize,
  'xs' | 'sm' | 'md' | 'lg' | 'xl'
>

/**
 * @summary Body text primitive on the Pond type scale.
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
      letter-spacing: var(--pond-font-tracking-normal);
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

    :host([size='xs']) {
      font-size: var(--pond-font-size-xs);
      line-height: var(--pond-font-line-normal);
    }

    :host([size='sm']) {
      font-size: var(--pond-font-size-sm);
      line-height: var(--pond-font-line-normal);
    }

    :host([size='md']) {
      font-size: var(--pond-font-size-md);
      line-height: var(--pond-font-line-normal);
    }

    :host([size='lg']) {
      font-size: var(--pond-font-size-lg);
      line-height: var(--pond-font-line-relaxed);
    }

    :host([size='xl']) {
      font-size: var(--pond-font-size-xl);
      line-height: var(--pond-font-line-snug);
    }

    :host([muted]) {
      color: var(--pond-color-fg-muted);
    }
  `

  /** Visual presentation. `plain` strips Pond visual CSS. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /**
   * Body scale step.
   * xs caption · sm helper · md body · lg lead · xl compact title-as-text
   */
  @property({ reflect: true })
  size: PondTextSize = 'md'

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
