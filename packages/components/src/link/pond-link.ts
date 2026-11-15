import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Navigation link (use Button variant=link for in-flow actions).
 * @status stable
 * @since 0.0.0
 *
 * @csspart link — The native anchor element.
 */
@customElement('pond-link')
export class PondLink extends LitElement {
  static override styles = css`
    :host {
      display: inline;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='link'] {
      color: var(--pond-color-accent-default);
      font-family: var(--pond-font-family-sans);
      font-size: inherit;
      font-weight: var(--pond-font-weight-regular);
      line-height: inherit;
      text-decoration: underline;
      text-underline-offset: 0.15em;
      cursor: pointer;
    }

    [part='link']:hover {
      color: var(--pond-color-accent-hover);
    }

    [part='link']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
      border-radius: var(--pond-radius-sm);
    }

    :host([appearance='plain']) [part='link'] {
      all: unset;
      cursor: pointer;
    }

    :host([appearance='plain']) [part='link']:focus-visible {
      outline: revert;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  href = '#'

  @property({ reflect: true })
  target: '_self' | '_blank' | '_parent' | '_top' | null = null

  @property({ attribute: 'rel' })
  rel: string | null = null

  override render() {
    const rel =
      this.rel ?? (this.target === '_blank' ? 'noopener noreferrer' : nothing)

    return html`
      <a
        part="link"
        href=${this.href}
        target=${this.target ?? nothing}
        rel=${rel}>
        <slot></slot>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-link': PondLink
  }
}
