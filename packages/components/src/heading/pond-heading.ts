import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import { headingLevelSize, type PondTypeSize } from '../shared/type-scale.js'

/**
 * @summary Heading primitive — semantic level + optional visual size from the type scale.
 * @status stable
 * @since 0.0.0
 *
 * `level` owns the outline; `size` owns visuals. Prefer Text for body copy.
 *
 * @slot — Heading text.
 * @csspart heading — Native `h1`–`h6`.
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
      letter-spacing: var(--pond-font-tracking-tight);
    }

    :host([appearance="plain"]) {
      all: unset;
      display: contents;
    }

    [part="heading"] {
      margin: 0;
      font: inherit;
      color: inherit;
      letter-spacing: inherit;
      text-wrap: balance;
      overflow-wrap: break-word;
    }

    :host([data-size="xs"]) {
      font-size: var(--pond-font-size-xs);
      line-height: var(--pond-font-line-snug);
      letter-spacing: var(--pond-font-tracking-wide);
      font-weight: var(--pond-font-weight-semibold);
    }
    :host([data-size="sm"]) {
      font-size: var(--pond-font-size-sm);
      line-height: var(--pond-font-line-snug);
      letter-spacing: var(--pond-font-tracking-normal);
    }
    :host([data-size="md"]) {
      font-size: var(--pond-font-size-md);
      line-height: var(--pond-font-line-snug);
      letter-spacing: var(--pond-font-tracking-normal);
    }
    :host([data-size="lg"]) {
      font-size: var(--pond-font-size-lg);
      line-height: var(--pond-font-line-snug);
      letter-spacing: var(--pond-font-tracking-normal);
    }
    :host([data-size="xl"]) {
      font-size: var(--pond-font-size-xl);
      line-height: var(--pond-font-line-snug);
      letter-spacing: var(--pond-font-tracking-normal);
    }
    :host([data-size="2xl"]) {
      font-size: var(--pond-font-size-2xl);
      line-height: var(--pond-font-line-tight);
      letter-spacing: var(--pond-font-tracking-tight);
    }
    :host([data-size="3xl"]) {
      font-size: var(--pond-font-size-3xl);
      line-height: var(--pond-font-line-tight);
      letter-spacing: var(--pond-font-tracking-tight);
    }
    :host([data-size="4xl"]) {
      font-size: var(--pond-font-size-4xl);
      line-height: var(--pond-font-line-tight);
      letter-spacing: var(--pond-font-tracking-tight);
    }
    :host([data-size="5xl"]) {
      font-size: var(--pond-font-size-5xl);
      line-height: var(--pond-font-line-tight);
      letter-spacing: var(--pond-font-tracking-tight);
    }
  `

  /** Visual presentation. `plain` strips Pond visual CSS. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Heading level — maps to h1–h6. Do not skip levels for styling; use `size`. */
  @property({ type: Number, reflect: true })
  level: 1 | 2 | 3 | 4 | 5 | 6 = 2

  /**
   * Visual size on the type scale. When omitted, follows the default for `level`
   * (h1→5xl … h6→lg).
   */
  @property({ reflect: true })
  size: PondTypeSize | undefined

  protected override updated(): void {
    const step = this.size ?? headingLevelSize[this.level]
    this.setAttribute('data-size', step)
  }

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
