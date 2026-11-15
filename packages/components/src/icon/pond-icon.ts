import { css, html, LitElement, nothing, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import { pondIconPaths } from './pond-icons.js'

export type PondIconSize = 'sm' | 'md' | 'lg'

/**
 * @summary Named or slotted SVG icon.
 * @status stable
 * @since 0.0.0
 *
 * @slot — Custom SVG when `name` is empty.
 * @csspart icon — SVG root.
 */
@customElement('pond-icon')
export class PondIcon extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      vertical-align: middle;
      color: inherit;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='icon'] {
      display: block;
      width: 1.25rem;
      height: 1.25rem;
      fill: currentColor;
    }

    :host([size='sm']) [part='icon'] {
      width: 1rem;
      height: 1rem;
    }

    :host([size='lg']) [part='icon'] {
      width: 1.5rem;
      height: 1.5rem;
    }

    :host([appearance='plain']) [part='icon'] {
      all: unset;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Built-in name from pondIconPaths. Empty → use slot. */
  @property()
  name = ''

  @property({ reflect: true })
  size: PondIconSize = 'md'

  /** Accessible name. Empty = decorative (aria-hidden). */
  @property()
  label = ''

  override render() {
    const path = this.name ? pondIconPaths[this.name] : undefined
    const labelled = Boolean(this.label)
    if (path) {
      return svg`<svg
        part="icon"
        viewBox="0 0 24 24"
        aria-hidden=${labelled ? 'false' : 'true'}
        role=${labelled ? 'img' : nothing}
        aria-label=${labelled ? this.label : nothing}
      >
        <path d=${path}></path>
      </svg>`
    }
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-icon': PondIcon
  }
}
