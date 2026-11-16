import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondLogoSize = 'sm' | 'md' | 'lg'

/**
 * @summary Brand mark — optional image plus wordmark slot.
 * @status stable
 * @since 0.0.0
 *
 * Consumer brand only — Pond ships no vendor logos. Prefer Image for photos,
 * Object/Tile for content nouns. Set `href` for home navigation.
 *
 * @slot — Wordmark or brand name text.
 * @csspart root — Logo surface (span or anchor).
 * @csspart image — Brand image when `src` is set.
 * @csspart wordmark — Wordmark slot wrapper.
 */
@customElement('pond-logo')
export class PondLogo extends LitElement {
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
      gap: var(--pond-space-2);
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-md);
      font-weight: var(--pond-font-weight-semibold);
      line-height: var(--pond-font-line-tight);
      text-decoration: none;
      vertical-align: middle;
    }

    a[part="root"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
      border-radius: var(--pond-radius-sm);
    }

    [part="image"] {
      display: block;
      width: 1.75rem;
      height: 1.75rem;
      object-fit: contain;
    }

    :host([size="sm"]) [part="image"] {
      width: 1.25rem;
      height: 1.25rem;
    }

    :host([size="lg"]) [part="image"] {
      width: 2.5rem;
      height: 2.5rem;
    }

    :host([size="sm"]) [part="root"] {
      font-size: var(--pond-font-size-sm);
    }

    :host([size="lg"]) [part="root"] {
      font-size: var(--pond-font-size-xl);
    }

    [part="wordmark"] {
      min-width: 0;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="image"],
    :host([appearance="plain"]) [part="wordmark"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  size: PondLogoSize = 'md'

  /** Brand image URL. Omit for wordmark-only. */
  @property()
  src = ''

  /** Accessible name for the image (and for the whole logo when there is no wordmark text). */
  @property()
  alt = ''

  /** When set, the logo renders as a link. */
  @property()
  href = ''

  override render() {
    const body = html`
      ${
        this.src
          ? html`<img part="image" src=${this.src} alt=${this.alt} />`
          : nothing
      }
      <span part="wordmark"><slot></slot></span>
    `

    if (this.href) {
      return html`<a
        part="root"
        href=${this.href}
        aria-label=${this.alt || nothing}
        >${body}</a
      >`
    }

    return html`<span part="root" aria-label=${this.alt || nothing}
      >${body}</span
    >`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-logo': PondLogo
  }
}
