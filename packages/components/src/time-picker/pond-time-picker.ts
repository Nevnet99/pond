import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Standalone time control (HH:mm).
 * @status stable
 * @since 0.0.0
 *
 * @fires pond-change — Time changed (`detail.value`).
 *
 * @csspart root — Field wrapper.
 * @csspart label — Visible label.
 * @csspart input — Native time input.
 */
@customElement('pond-time-picker')
export class PondTimePicker extends LitElement {
  static override styles = css`
    :host {
      display: block;
      max-width: 12rem;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-2);
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
    }

    [part="label"] {
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
    }

    [part="input"] {
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 1px solid var(--pond-color-border-strong);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: inherit;
      font: inherit;
      font-variant-numeric: tabular-nums;
    }

    [part="input"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part="input"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="label"],
    :host([appearance="plain"]) [part="input"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property()
  label = ''

  /** Time as HH:mm */
  @property()
  value = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  #onChange = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    )
  }

  override render() {
    return html`
      <div part="root">
        ${this.label ? html`<span part="label">${this.label}</span>` : nothing}
        <input
          part="input"
          type="time"
          .value=${this.value}
          ?disabled=${this.disabled}
          aria-label=${this.label || 'Time'}
          @change=${this.#onChange}
        />
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-time-picker': PondTimePicker
  }
}
