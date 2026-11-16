import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondFlagGroupPlacement = 'end' | 'start'

/**
 * @summary Stacked region for multiple Flags (toast stack).
 * @status stable
 * @since 0.0.0
 *
 * @slot — `pond-flag` children.
 *
 * @csspart root — Live region wrapper.
 */
@customElement('pond-flag-group')
export class PondFlagGroup extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-2);
      box-sizing: border-box;
      max-width: 24rem;
      margin: 0;
      padding: 0;
      font-family: var(--pond-font-family-sans);
    }

    :host([placement="end"]) {
      position: fixed;
      z-index: 40;
      inset-block-end: var(--pond-space-4);
      inset-inline-end: var(--pond-space-4);
    }

    :host([placement="start"]) {
      position: fixed;
      z-index: 40;
      inset-block-end: var(--pond-space-4);
      inset-inline-start: var(--pond-space-4);
    }

    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Accessible name for the flag stack. */
  @property()
  label = 'Notifications'

  /**
   * When `end` or `start`, pins the stack to a viewport corner.
   * Omit for in-flow layout (docs / stories).
   */
  @property({ reflect: true })
  placement: PondFlagGroupPlacement | '' = ''

  override render() {
    return html`
      <div
        part="root"
        role="region"
        aria-label=${this.label}
        aria-live="polite"
      >
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-flag-group': PondFlagGroup
  }
}
