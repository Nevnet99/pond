import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Multi-line text input with label and error.
 * @status stable
 * @since 0.0.0
 *
 * @csspart root — Field layout wrapper.
 * @csspart label — Visible label.
 * @csspart textarea — Native textarea.
 * @csspart error — Error message.
 */
@customElement('pond-text-area')
export class PondTextArea extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='root'] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-1);
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
    }

    [part='label'] {
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
    }

    [part='textarea'] {
      box-sizing: border-box;
      width: 100%;
      min-height: 6rem;
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 1px solid var(--pond-color-border-strong);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
      font: inherit;
      font-size: var(--pond-font-size-md);
      line-height: var(--pond-font-line-normal);
      resize: vertical;
    }

    [part='textarea']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    :host([invalid]) [part='textarea'] {
      border-color: var(--pond-color-danger-default);
    }

    [part='textarea']:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      resize: none;
    }

    [part='error'] {
      margin: 0;
      color: var(--pond-color-danger-default);
      font-size: var(--pond-font-size-sm);
    }

    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='label'],
    :host([appearance='plain']) [part='textarea'],
    :host([appearance='plain']) [part='error'] {
      all: unset;
    }

    :host([appearance='plain']) [part='root'] {
      display: contents;
    }

    :host([appearance='plain']) [part='textarea'] {
      display: block;
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

  @property()
  placeholder = ''

  @property({ type: Number })
  rows = 4

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: Boolean, reflect: true })
  required = false

  @property({ type: Boolean, reflect: true })
  invalid = false

  @property({ attribute: 'error-message' })
  errorMessage = ''

  #onInput(event: Event) {
    const area = event.target as HTMLTextAreaElement
    this.value = area.value
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
            ? html`<label part="label" for="textarea">${this.label}</label>`
            : nothing
        }
        <textarea
          part="textarea"
          id="textarea"
          .value=${this.value}
          name=${ifDefined(this.name || undefined)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          aria-describedby=${ifDefined(describedBy)}
          @input=${this.#onInput}></textarea>
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
    'pond-text-area': PondTextArea
  }
}
