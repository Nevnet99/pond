import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../icon/pond-icon.js'

/**
 * @summary Compact label chip; optional remove control.
 * @status stable
 * @since 0.0.0
 *
 * @slot — Tag label text.
 * @csspart root — Chip shell.
 * @csspart remove — Remove button when `removable`.
 * @fires pond-remove — Remove control activated.
 */
@customElement('pond-tag')
export class PondTag extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      display: inline-flex;
      align-items: center;
      gap: var(--pond-space-1);
      box-sizing: border-box;
      padding: var(--pond-space-1) var(--pond-space-2);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-pill);
      background: var(--pond-color-bg-subtle);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
    }
    [part="remove"] {
      display: inline-flex;
      margin: 0;
      padding: 0;
      border: 0;
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: inherit;
      cursor: pointer;
    }
    [part="remove"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="remove"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  /** Visual reset — `plain` strips Pond chrome. */
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  /** Shows a remove button that fires `pond-remove`. */
  @property({ type: Boolean }) removable = false
  override render() {
    return html`<span part="root">
      <slot></slot>
      ${
        this.removable
          ? html`<button part="remove" type="button" aria-label="Remove"
            @click=${() => this.dispatchEvent(new CustomEvent('pond-remove', { bubbles: true, composed: true }))}>
            <pond-icon name="close" size="sm"></pond-icon>
          </button>`
          : nothing
      }
    </span>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-tag': PondTag
  }
}
