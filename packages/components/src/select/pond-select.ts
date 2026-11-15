import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondSelectOption = { value: string; label: string }

/** @summary Select control — single or multi. @status stable @since 0.0.0 @fires pond-change */
@customElement('pond-select')
export class PondSelect extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; flex-direction: column; gap: var(--pond-space-1);
      font-family: var(--pond-font-family-sans); color: var(--pond-color-fg-default);
    }
    [part='label'] { font-size: var(--pond-font-size-sm); font-weight: var(--pond-font-weight-medium); }
    [part='select'] {
      box-sizing: border-box; width: 100%; margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 1px solid var(--pond-color-border-strong); border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas); color: var(--pond-color-fg-default);
      font: inherit; font-size: var(--pond-font-size-md);
    }
    [part='select'][multiple] { min-height: 6.5rem; }
    [part='select']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    [part='select']:disabled { opacity: 0.5; cursor: not-allowed; }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='label'],
    :host([appearance='plain']) [part='select'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() label = ''
  @property() name = ''
  @property() value = ''
  @property({ type: Array }) values: string[] = []
  @property({ type: Boolean, reflect: true }) multiple = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Array }) options: PondSelectOption[] = []

  #onChange(e: Event) {
    const select = e.target as HTMLSelectElement
    if (this.multiple) {
      this.values = Array.from(select.selectedOptions).map((o) => o.value)
      this.dispatchEvent(
        new CustomEvent('pond-change', {
          detail: { values: this.values },
          bubbles: true,
          composed: true
        })
      )
      return
    }
    this.value = select.value
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    )
  }

  #isSelected(optionValue: string) {
    return this.multiple
      ? this.values.includes(optionValue)
      : optionValue === this.value
  }

  override render() {
    return html`<div part="root">
      ${this.label ? html`<label part="label" for="select">${this.label}</label>` : nothing}
      <select
        part="select"
        id="select"
        name=${ifDefined(this.name || undefined)}
        ?multiple=${this.multiple}
        .value=${this.multiple ? '' : this.value}
        ?disabled=${this.disabled}
        @change=${this.#onChange}
      >
        ${this.options.map(
          (o) =>
            html`<option value=${o.value} ?selected=${this.#isSelected(o.value)}>${o.label}</option>`
        )}
      </select>
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-select': PondSelect
  }
}
