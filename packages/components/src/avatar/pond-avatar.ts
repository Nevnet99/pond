import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../icon/pond-icon.js'

export type PondAvatarSize = 'sm' | 'md' | 'lg'

/**
 * @summary User image, initials, or icon fallback.
 * @status stable
 * @since 0.0.0
 */
@customElement('pond-avatar')
export class PondAvatar extends LitElement {
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
      overflow: hidden;
      border-radius: var(--pond-radius-pill);
      background: var(--pond-color-bg-subtle);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
    }

    :host([size="sm"]) [part="root"] {
      width: 1.5rem;
      height: 1.5rem;
      font-size: var(--pond-font-size-xs);
    }

    :host([size="lg"]) [part="root"] {
      width: 2.5rem;
      height: 2.5rem;
      font-size: var(--pond-font-size-md);
    }

    [part="image"] {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="image"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property()
  src = ''

  @property()
  initials = ''

  @property()
  label = ''

  @property({ reflect: true })
  size: PondAvatarSize = 'md'

  override render() {
    const alt = this.label || this.initials || 'Avatar'
    return html`
      <span part="root" role="img" aria-label=${alt}>
        ${
          this.src
            ? html`<img part="image" src=${this.src} alt="" />`
            : this.initials
              ? this.initials
              : html`<pond-icon name="user" size=${this.size}></pond-icon>`
        }
      </span>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-avatar': PondAvatar
  }
}
