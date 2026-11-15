import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondTileSize = 'sm' | 'md' | 'lg'

/**
 * @summary Rounded square asset representing a noun.
 * @status stable
 * @since 0.0.0
 *
 * @slot — Label or nested media (icon / image).
 *
 * @csspart root — Tile surface.
 */
@customElement('pond-tile')
export class PondTile extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--pond-space-1);
      box-sizing: border-box;
      width: 4.5rem;
      height: 4.5rem;
      padding: var(--pond-space-2);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-lg);
      background: var(--pond-color-bg-surface);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-xs);
      font-weight: var(--pond-font-weight-medium);
      text-align: center;
      overflow: hidden;
    }

    :host([size="sm"]) [part="root"] {
      width: 3rem;
      height: 3rem;
    }

    :host([size="lg"]) [part="root"] {
      width: 6rem;
      height: 6rem;
      font-size: var(--pond-font-size-sm);
    }

    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  size: PondTileSize = 'md'

  /** Accessible name when the slot is visual-only. */
  @property()
  label = ''

  override render() {
    return html`<div
      part="root"
      role=${this.label ? 'img' : nothing}
      aria-label=${this.label || nothing}
    >
      <slot></slot>
    </div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-tile': PondTile
  }
}
