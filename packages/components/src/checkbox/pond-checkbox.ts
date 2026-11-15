import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Binary choice control. @status stable @since 0.0.0 */
@customElement('pond-checkbox')
export class PondCheckbox extends LitElement {
  static override styles = css`
    :host { display: inline-flex; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: inline-flex; align-items: center; gap: var(--pond-space-2);
      font-family: var(--pond-font-family-sans); color: var(--pond-color-fg-default);
      font-size: var(--pond-font-size-md); cursor: pointer;
    }
    [part='input'] {
      width: 1.125rem; height: 1.125rem; accent-color: var(--pond-color-accent-default);
      cursor: pointer;
    }
    [part='input']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    [part='input']:disabled, :host([disabled]) [part='root'] { opacity: 0.5; cursor: not-allowed; }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='input'],
    :host([appearance='plain']) [part='label'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() label = ''
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: Boolean, reflect: true }) indeterminate = false
  @property({ type: Boolean, reflect: true }) disabled = false

  #onChange(e: Event) {
    const input = e.target as HTMLInputElement
    this.checked = input.checked
    this.indeterminate = false
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true
      })
    )
  }

  protected updated() {
    const input = this.shadowRoot?.querySelector('input')
    if (input) input.indeterminate = this.indeterminate
  }

  override render() {
    return html`<label part="root">
      <input part="input" type="checkbox" .checked=${this.checked} ?disabled=${this.disabled} @change=${this.#onChange} />
      ${this.label ? html`<span part="label">${this.label}</span>` : html`<slot></slot>`}
    </label>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-checkbox': PondCheckbox
  }
}
