import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondMetricTextSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * @summary Token-backed typography for numeric metrics.
 * @status stable
 * @since 0.0.0
 *
 * @slot — Metric value (prefer digits / short units).
 *
 * @csspart root — Metric text element.
 */
@customElement('pond-metric-text')
export class PondMetricText extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-display);
      font-size: var(--pond-font-size-3xl);
      font-weight: var(--pond-font-weight-semibold);
      line-height: var(--pond-font-line-tight);
      letter-spacing: var(--pond-font-tracking-tight);
      font-variant-numeric: tabular-nums;
    }

    :host([appearance="plain"]) {
      all: unset;
      display: contents;
    }

    [part="root"] {
      margin: 0;
    }

    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }

    :host([size="sm"]) {
      font-size: var(--pond-font-size-xl);
    }

    :host([size="md"]) {
      font-size: var(--pond-font-size-2xl);
    }

    :host([size="lg"]) {
      font-size: var(--pond-font-size-3xl);
    }

    :host([size="xl"]) {
      font-size: var(--pond-font-size-4xl);
    }

    :host([muted]) {
      color: var(--pond-color-fg-muted);
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  size: PondMetricTextSize = 'lg'

  @property({ type: Boolean, reflect: true })
  muted = false

  override render() {
    return html`<p part="root"><slot></slot></p>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-metric-text': PondMetricText
  }
}
