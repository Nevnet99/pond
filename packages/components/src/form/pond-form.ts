import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Layout + validation shell for slotted fields. @status stable @since 0.0.0 @fires pond-submit */
@customElement('pond-form')
export class PondForm extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; flex-direction: column; gap: var(--pond-space-4);
      font-family: var(--pond-font-family-sans); color: var(--pond-color-fg-default);
      margin: 0;
    }
    [part='error'] {
      margin: 0; padding: var(--pond-space-2) var(--pond-space-3);
      border-radius: var(--pond-radius-sm); color: var(--pond-color-danger-default);
      font-size: var(--pond-font-size-sm); background: var(--pond-color-danger-subtle, transparent);
    }
    [part='actions'] { display: flex; gap: var(--pond-space-2); justify-content: flex-end; }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='error'],
    :host([appearance='plain']) [part='actions'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() error = ''
  #onSubmit = (e: Event) => {
    e.preventDefault()
    this.dispatchEvent(
      new CustomEvent('pond-submit', { bubbles: true, composed: true })
    )
  }
  override render() {
    return html`<form part="root" @submit=${this.#onSubmit} novalidate>
      ${this.error ? html`<p part="error" role="alert">${this.error}</p>` : nothing}
      <slot></slot>
      <div part="actions"><slot name="actions"></slot></div>
    </form>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-form': PondForm
  }
}
