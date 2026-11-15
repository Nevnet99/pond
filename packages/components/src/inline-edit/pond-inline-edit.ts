import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Read → edit → commit/cancel with a text field. @status stable @since 0.0.0 @fires pond-change @fires pond-cancel */
@customElement('pond-inline-edit')
export class PondInlineEdit extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; flex-direction: column; gap: var(--pond-space-2);
      font-family: var(--pond-font-family-sans); color: var(--pond-color-fg-default);
    }
    [part='read'] {
      margin: 0; padding: var(--pond-space-2); border: 1px dashed transparent;
      border-radius: var(--pond-radius-sm); text-align: left; background: transparent;
      color: inherit; font: inherit; cursor: pointer; min-height: 2.25rem;
    }
    [part='read']:hover { border-color: var(--pond-color-border-default); }
    [part='read']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    [part='input'] {
      box-sizing: border-box; width: 100%; margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 1px solid var(--pond-color-border-strong); border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas); color: inherit; font: inherit;
    }
    [part='input']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    [part='actions'] { display: flex; gap: var(--pond-space-2); }
    [part='actions'] button {
      margin: 0; padding: var(--pond-space-1) var(--pond-space-3);
      border: 1px solid var(--pond-color-border-default); border-radius: var(--pond-radius-sm);
      background: var(--pond-color-bg-canvas); color: inherit; font: inherit; cursor: pointer;
    }
    [part='actions'] button:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='read'],
    :host([appearance='plain']) [part='input'],
    :host([appearance='plain']) [part='actions'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() value = ''
  @property() label = 'Edit'
  @property() placeholder = 'Empty'
  @state() private editing = false
  @state() private draft = ''

  #start = () => {
    this.draft = this.value
    this.editing = true
    this.updateComplete.then(() => {
      this.shadowRoot
        ?.querySelector<HTMLInputElement>('[part="input"]')
        ?.focus()
    })
  }
  #confirm = () => {
    this.value = this.draft
    this.editing = false
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    )
  }
  #cancel = () => {
    this.editing = false
    this.dispatchEvent(
      new CustomEvent('pond-cancel', { bubbles: true, composed: true })
    )
  }
  override render() {
    if (this.editing) {
      return html`<div part="root">
        <input part="input" aria-label=${this.label} .value=${this.draft}
          @input=${(e: Event) => {
            this.draft = (e.target as HTMLInputElement).value
          }}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter') this.#confirm()
            if (e.key === 'Escape') this.#cancel()
          }} />
        <div part="actions">
          <button type="button" @click=${this.#confirm}>Confirm</button>
          <button type="button" @click=${this.#cancel}>Cancel</button>
        </div>
      </div>`
    }
    return html`<div part="root">
      <button part="read" type="button" @click=${this.#start}>
        ${this.value || this.placeholder}
      </button>
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-inline-edit': PondInlineEdit
  }
}
