import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondButtonVariant =
  | 'primary'
  | 'secondary'
  | 'subtle'
  | 'danger'
  | 'link'

/**
 * @summary Action control with emphasis variants.
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

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="button"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--pond-space-2);
      box-sizing: border-box;
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-4);
      border: 1px solid transparent;
      border-radius: var(--pond-radius-md);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-md);
      font-weight: var(--pond-font-weight-medium);
      line-height: var(--pond-font-line-tight);
      text-box: trim-both cap alphabetic;
      cursor: pointer;
      transition:
        background-color var(--pond-motion-duration-fast)
        var(--pond-motion-easing-standard),
        border-color var(--pond-motion-duration-fast)
        var(--pond-motion-easing-standard),
        color var(--pond-motion-duration-fast)
        var(--pond-motion-easing-standard),
        scale var(--pond-motion-duration-fast) var(--pond-motion-easing-exit);
    }

    [part="button"]:not(:disabled):active {
      scale: 0.96;
    }

    :host([variant="link"]) [part="button"]:not(:disabled):active {
      scale: none;
    }

    /* primary — main call to action */
    :host([variant="primary"]) [part="button"],
    :host(:not([variant])) [part="button"] {
      background: var(--pond-color-accent-default);
      color: var(--pond-color-fg-on-accent);
    }

    :host([variant="primary"]) [part="button"]:hover:not(:disabled),
    :host(:not([variant])) [part="button"]:hover:not(:disabled) {
      background: var(--pond-color-accent-hover);
    }

    /* secondary — alternate action, outlined */
    :host([variant="secondary"]) [part="button"] {
      background: var(--pond-color-bg-canvas);
      border-color: var(--pond-color-border-strong);
      color: var(--pond-color-fg-default);
    }

    :host([variant="secondary"]) [part="button"]:hover:not(:disabled) {
      background: var(--pond-color-bg-subtle);
      border-color: var(--pond-color-fg-default);
    }

    /* subtle — low emphasis chrome / toolbars */
    :host([variant="subtle"]) [part="button"] {
      background: var(--pond-color-bg-subtle);
      color: var(--pond-color-fg-default);
    }

    :host([variant="subtle"]) [part="button"]:hover:not(:disabled) {
      background: var(--pond-color-border-default);
    }

    /* danger — destructive / irreversible */
    :host([variant="danger"]) [part="button"] {
      background: var(--pond-color-danger-default);
      color: var(--pond-color-fg-on-accent);
    }

    :host([variant="danger"]) [part="button"]:hover:not(:disabled) {
      background: var(--pond-color-danger-hover);
    }

    /* link — in-flow action without button chrome (not navigation) */
    :host([variant="link"]) [part="button"] {
      padding: 0;
      border-radius: 0;
      background: transparent;
      color: var(--pond-color-accent-default);
      font-weight: var(--pond-font-weight-regular);
      text-decoration: underline;
      text-underline-offset: 0.15em;
    }

    :host([variant="link"]) [part="button"]:hover:not(:disabled) {
      color: var(--pond-color-accent-hover);
    }

    [part="button"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part="button"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([appearance="plain"]) [part="button"] {
      all: unset;
      cursor: pointer;
      display: inline;
    }

    :host([appearance="plain"]) [part="button"]:disabled {
      cursor: not-allowed;
    }

    :host([appearance="plain"]) [part="button"]:focus-visible {
      /* Consumer owns focus paint in plain mode */
      outline: revert;
    }
  `

  /** Visual presentation. `plain` strips Pond visual CSS. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /**
   * Emphasis / intent.
   * - primary: main call to action
   * - secondary: alternate action (outlined)
   * - subtle: low-emphasis chrome (toolbars, dense UI)
   * - danger: destructive / irreversible
   * - link: in-flow action without button chrome (use Link for navigation)
   */
  @property({ reflect: true })
  variant: PondButtonVariant = 'primary'

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
