import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Theme-aware image (optional dark `src`).
 * @status stable
 * @since 0.0.0
 *
 * Photos and illustrations. Prefer Tile for noun squares, Logo for brand marks,
 * Object for content-type glyphs.
 *
 * @csspart root — Figure wrapper when captioned, otherwise the image.
 * @csspart image — The rendered `img`.
 * @csspart caption — Optional caption.
 */
@customElement('pond-image')
export class PondImage extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      max-width: 100%;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-2);
      max-width: 100%;
      margin: 0;
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
    }

    [part="image"] {
      display: block;
      max-width: 100%;
      height: auto;
      border-radius: var(--pond-radius-md);
    }

    [part="caption"] {
      margin: 0;
      font-size: var(--pond-font-size-sm);
      color: var(--pond-color-fg-muted);
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="image"],
    :host([appearance="plain"]) [part="caption"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Light (default) image URL. */
  @property()
  src = ''

  /** Optional dark-theme image URL (`data-theme="dark"` on an ancestor). */
  @property({ attribute: 'src-dark' })
  srcDark = ''

  @property()
  alt = ''

  @property()
  caption = ''

  get #resolvedSrc(): string {
    if (!this.srcDark) return this.src
    const root =
      this.closest('[data-theme]') ??
      (typeof document !== 'undefined' ? document.documentElement : null)
    return root?.getAttribute('data-theme') === 'dark' ? this.srcDark : this.src
  }

  override render() {
    const img = html`<img
      part="image"
      src=${this.#resolvedSrc}
      alt=${this.alt}
    />`
    if (!this.caption) return img
    return html`
      <figure part="root">
        ${img}
        <figcaption part="caption">${this.caption}</figcaption>
      </figure>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-image': PondImage
  }
}
