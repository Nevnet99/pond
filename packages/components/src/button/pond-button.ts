import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Primary action control.
 * @status stable
 * @since 0.0.0
 *
 * @csspart button — The native button element.
 */
@customElement('pond-button')
export class PondButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='button'] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--pond-space-2);
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-4);
      border: 1px solid transparent;
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-accent-default);
      color: var(--pond-color-fg-on-accent);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-md);
      font-weight: var(--pond-font-weight-medium);
      line-height: var(--pond-font-line-tight);
      cursor: pointer;
      transition: background-color var(--pond-motion-duration-fast) ease;
    }

    [part='button']:hover:not(:disabled) {
      background: var(--pond-color-accent-hover);
    }

    [part='button']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part='button']:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([appearance='plain']) [part='button'] {
      all: unset;
      cursor: pointer;
      display: inline;
    }

    :host([appearance='plain']) [part='button']:disabled {
      cursor: not-allowed;
    }

    :host([appearance='plain']) [part='button']:focus-visible {
      /* Consumer owns focus paint in plain mode */
      outline: revert;
    }
  `

  /** Visual presentation. `plain` strips Pond visual CSS. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Native button type. */
  @property({ reflect: true })
  type: 'button' | 'submit' | 'reset' = 'button'

  /** Disabled state. */
  @property({ type: Boolean, reflect: true })
  disabled = false

  /** Accessible name when slot text is insufficient. */
  @property({ attribute: 'aria-label' })
  override ariaLabel: string | null = null

  override render() {
    return html`
      <button
        part="button"
        class="pond-focus-ring"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-label=${this.ariaLabel ?? nothing}
        @click=${this.#onClick}>
        <slot></slot>
      </button>
    `
  }

  #onClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-button': PondButton
  }
}
