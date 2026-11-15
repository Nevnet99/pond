import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Collapsible side-nav section with a heading and item list.
 * @status stable
 * @since 0.0.0
 *
 * @slot — `pond-side-nav-item` children.
 *
 * @fires pond-toggle — Section open state changed (`detail.collapsed`).
 *
 * @csspart root — Section wrapper.
 * @csspart heading — Collapse/expand control.
 * @csspart list — Item list.
 */
@customElement('pond-side-nav-section')
export class PondSideNavSection extends LitElement {
  static override styles = css`
    :host {
      display: block;
      min-width: 0;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-1);
      min-width: 0;
    }

    [part="heading"] {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--pond-space-2);
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: var(--pond-space-1) var(--pond-space-2);
      border: 0;
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: var(--pond-color-fg-muted);
      font: inherit;
      font-size: var(--pond-font-size-xs);
      font-weight: var(--pond-font-weight-semibold);
      letter-spacing: 0.04em;
      text-transform: uppercase;
      text-align: start;
      cursor: pointer;
    }

    [part="heading"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part="heading"]::after {
      content: "";
      width: 0.4rem;
      height: 0.4rem;
      border-inline-end: 1.5px solid currentColor;
      border-block-end: 1.5px solid currentColor;
      transform: rotate(45deg);
      transition: transform 120ms ease;
    }

    :host([collapsed]) [part="heading"]::after {
      transform: rotate(-45deg);
    }

    [part="list"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-1);
      margin: 0;
      padding: 0;
    }

    :host([collapsed]) [part="list"] {
      display: none;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="heading"],
    :host([appearance="plain"]) [part="list"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Section title shown on the toggle control. */
  @property()
  heading = ''

  /** When true, the item list is hidden. */
  @property({ type: Boolean, reflect: true })
  collapsed = false

  #toggle() {
    this.collapsed = !this.collapsed
    this.dispatchEvent(
      new CustomEvent('pond-toggle', {
        detail: { collapsed: this.collapsed },
        bubbles: true,
        composed: true
      })
    )
  }

  override render() {
    return html`
      <div part="root">
        <button
          type="button"
          part="heading"
          aria-expanded=${String(!this.collapsed)}
          @click=${this.#toggle}
        >
          ${this.heading}
        </button>
        <div part="list" role="list">
          <slot></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-side-nav-section': PondSideNavSection
  }
}
