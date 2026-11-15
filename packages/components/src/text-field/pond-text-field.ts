import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Single-line text input with label and error.
 * @status stable
 * @since 0.0.0
 *
 * @csspart root — Field layout wrapper.
 * @csspart label — Visible label.
 * @csspart input — Native text input.
 * @csspart error — Error message.
 */
@customElement('pond-text-field')
export class PondTextField extends LitElement {
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
      gap: var(--pond-space-1);
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
      color: var(--pond-color-fg-default);
      font: inherit;
      font-size: var(--pond-font-size-md);
      line-height: var(--pond-font-line-normal);
    }

    [part="input"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    :host([invalid]) [part="input"] {
      border-color: var(--pond-color-danger-default);
    }

    [part="input"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    [part="error"] {
      margin: 0;
      color: var(--pond-color-danger-default);
      font-size: var(--pond-font-size-sm);
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="label"],
    :host([appearance="plain"]) [part="input"],
    :host([appearance="plain"]) [part="error"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }

    :host([appearance="plain"]) [part="input"] {
      display: inline;
      cursor: text;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property()
  label = ''

  @property()
  name = ''

  @property()
  value = ''

  @property({ reflect: true })
  type: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' = 'text'

  @property()
  placeholder = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: Boolean, reflect: true })
  required = false

  @property({ type: Boolean, reflect: true })
  invalid = false

  @property({ attribute: 'error-message' })
  errorMessage = ''

  #onInput(event: Event) {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.dispatchEvent(
      new CustomEvent('pond-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    )
  }

  override render() {
    const describedBy = this.invalid && this.errorMessage ? 'error' : undefined
    return html`
      <div part="root">
        ${
          this.label
            ? html`<label part="label" for="input">${this.label}</label>`
            : nothing
        }
        <input
          part="input"
          id="input"
          .value=${this.value}
          type=${this.type}
          name=${ifDefined(this.name || undefined)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          aria-describedby=${ifDefined(describedBy)}
          @input=${this.#onInput} />
        ${
          this.invalid && this.errorMessage
            ? html`<p part="error" id="error">${this.errorMessage}</p>`
            : nothing
        }
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-text-field': PondTextField
  }
}
