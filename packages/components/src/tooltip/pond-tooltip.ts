import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Non-actionable help on hover/focus.
 * @status stable
 * @since 0.0.0
 */
@customElement('pond-tooltip')
export class PondTooltip extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      position: relative;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="trigger"] {
      display: inline-flex;
    }

    [part="tooltip"] {
      position: absolute;
      bottom: calc(100% + var(--pond-space-1));
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      max-width: 16rem;
      padding: var(--pond-space-1) var(--pond-space-2);
      border-radius: var(--pond-radius-sm);
      background: var(--pond-color-bg-inverse);
      color: var(--pond-color-fg-on-accent);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-xs);
      line-height: var(--pond-font-line-snug);
      white-space: nowrap;
      pointer-events: none;
      animation: pond-tooltip-in var(--pond-motion-duration-fast)
        var(--pond-motion-easing-enter) both;
    }
    @keyframes pond-tooltip-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      [part="tooltip"] {
        animation: none;
      }
    }

    :host([appearance="plain"]) [part="tooltip"] {
      all: unset;
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property()
  content = ''

  @state()
  private open = false

  override render() {
    return html`
      <span
        part="trigger"
        @mouseenter=${() => {
          this.open = true
        }}
        @mouseleave=${() => {
          this.open = false
        }}
        @focusin=${() => {
          this.open = true
        }}
        @focusout=${() => {
          this.open = false
        }}>
        <slot></slot>
      </span>
      ${
        this.open
          ? html`<span part="tooltip" role="tooltip">${this.content}</span>`
          : null
      }
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-tooltip': PondTooltip
  }
}
