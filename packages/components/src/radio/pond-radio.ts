import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondRadioOption = {
  value: string
  label: string
  disabled?: boolean
}

/** @summary Radio group — single choice from options. @status stable @since 0.0.0 @fires pond-change */
@customElement('pond-radio')
export class PondRadio extends LitElement {
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
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
    }
    [part="legend"] {
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
    }
    [part="option"] {
      display: flex;
      align-items: center;
      gap: var(--pond-space-2);
      font-size: var(--pond-font-size-md);
      cursor: pointer;
    }
    [part="input"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="legend"],
    :host([appearance="plain"]) [part="option"],
    :host([appearance="plain"]) [part="input"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() label = ''
  @property() name = 'pond-radio'
  @property() value = ''
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Array }) options: PondRadioOption[] = []
  #onChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.value = input.value
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    )
  }
  override render() {
    return html`<fieldset part="root" ?disabled=${this.disabled}>
      ${this.label ? html`<legend part="legend">${this.label}</legend>` : nothing}
      ${this.options.map(
        (o) => html`
        <label part="option">
          <input part="input" type="radio" name=${this.name} value=${o.value}
            .checked=${o.value === this.value} ?disabled=${this.disabled || Boolean(o.disabled)}
            @change=${this.#onChange} />
          ${o.label}
        </label>`
      )}
    </fieldset>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-radio': PondRadio
  }
}
