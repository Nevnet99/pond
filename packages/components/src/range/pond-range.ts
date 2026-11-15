import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Slider for an approximate numeric value. @status stable @since 0.0.0 @fires pond-change */
@customElement('pond-range')
export class PondRange extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; flex-direction: column; gap: var(--pond-space-1);
      font-family: var(--pond-font-family-sans); color: var(--pond-color-fg-default);
    }
    [part='label'] { font-size: var(--pond-font-size-sm); font-weight: var(--pond-font-weight-medium); }
    [part='input'] {
      width: 100%; margin: 0; accent-color: var(--pond-color-accent-default);
    }
    [part='input']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='label'],
    :host([appearance='plain']) [part='input'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() label = ''
  @property({ type: Number }) value = 50
  @property({ type: Number }) min = 0
  @property({ type: Number }) max = 100
  @property({ type: Number }) step = 1
  @property({ type: Boolean, reflect: true }) disabled = false
  #onInput(e: Event) {
    this.value = Number((e.target as HTMLInputElement).value)
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    )
  }
  override render() {
    return html`<div part="root">
      ${this.label ? html`<label part="label" for="range">${this.label}</label>` : nothing}
      <input part="input" id="range" type="range" .value=${String(this.value)}
        min=${this.min} max=${this.max} step=${this.step} ?disabled=${this.disabled}
        aria-valuemin=${this.min} aria-valuemax=${this.max} aria-valuenow=${this.value}
        @input=${this.#onInput} />
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-range': PondRange
  }
}
