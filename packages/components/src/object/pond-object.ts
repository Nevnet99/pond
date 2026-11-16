import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondObjectSize = 'sm' | 'md' | 'lg'

/** Generic content-type keys (not Atlassian product icons). */
export type PondObjectType =
  | 'document'
  | 'folder'
  | 'link'
  | 'image'
  | 'code'
  | 'person'

/** Built-in 24×24 path data for content-type glyphs. */
export const pondObjectPaths: Record<PondObjectType, string> = {
  document:
    'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z',
  folder:
    'M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z',
  link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  image:
    'M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z',
  code: 'M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  person:
    'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
}

/**
 * @summary Content-type glyph for lists, tables, and pickers.
 * @status stable
 * @since 0.0.0
 *
 * @slot — Optional override of the built-in glyph.
 *
 * @csspart root — Object surface.
 * @csspart glyph — SVG or slotted glyph wrapper.
 */
@customElement('pond-object')
export class PondObject extends LitElement {
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
      justify-content: center;
      box-sizing: border-box;
      width: 2rem;
      height: 2rem;
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-subtle);
      color: var(--pond-color-fg-default);
    }

    :host([size="sm"]) [part="root"] {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: var(--pond-radius-sm);
    }

    :host([size="lg"]) [part="root"] {
      width: 2.5rem;
      height: 2.5rem;
    }

    [part="glyph"] {
      display: inline-flex;
      width: 1rem;
      height: 1rem;
    }

    :host([size="sm"]) [part="glyph"] {
      width: 0.875rem;
      height: 0.875rem;
    }

    :host([size="lg"]) [part="glyph"] {
      width: 1.25rem;
      height: 1.25rem;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="glyph"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  size: PondObjectSize = 'md'

  /** Content-type key for the built-in glyph. */
  @property({ reflect: true })
  type: PondObjectType = 'document'

  /** Accessible name (required for meaning; decorative use should set `label=""` and aria-hidden via consumer). */
  @property()
  label = ''

  override render() {
    const path = pondObjectPaths[this.type] ?? pondObjectPaths.document
    return html`
      <span
        part="root"
        role=${this.label ? 'img' : nothing}
        aria-label=${this.label || nothing}
        aria-hidden=${this.label ? nothing : 'true'}
      >
        <span part="glyph">
          <slot
            ><svg viewBox="0 0 24 24" aria-hidden="true">
              <path d=${path} /></svg
          ></slot>
        </span>
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-object': PondObject
  }
}
