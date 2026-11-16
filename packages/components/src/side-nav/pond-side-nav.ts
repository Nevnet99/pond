import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import './pond-side-nav-item.js'
import './pond-side-nav-section.js'

/**
 * @summary Vertical app navigation rail (sections, items, one nest level).
 * @status stable
 * @since 0.0.0
 *
 * @slot — `pond-side-nav-section` children.
 *
 * @csspart root — Nav landmark.
 */
@customElement('pond-side-nav')
export class PondSideNav extends LitElement {
  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
      min-height: 0;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-4);
      height: 100%;
      min-height: 0;
      margin: 0;
      padding: var(--pond-space-3);
      overflow: auto;
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
    }

    :host([collapsed]) {
      width: 3.5rem;
    }

    :host([collapsed]) [part="root"] {
      padding: var(--pond-space-2);
      gap: var(--pond-space-2);
      align-items: stretch;
    }

    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
  `

  /** Visual presentation. `plain` strips Pond visual CSS. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Accessible name for the `nav` landmark. */
  @property()
  label = 'Side navigation'

  /**
   * Icon-only rail: item labels are visually hidden (kept for assistive tech
   * via `aria-label` / `title` from slot text), section headings hide, nested
   * items hide. Every item still needs label text.
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false

  protected override updated(changed: Map<string, unknown>) {
    if (!changed.has('collapsed')) return
    this.dispatchEvent(
      new CustomEvent('pond-collapse', {
        detail: { collapsed: this.collapsed },
        bubbles: true,
        composed: true
      })
    )
    this.#syncRail()
  }

  #syncRail() {
    for (const el of this.querySelectorAll(
      'pond-side-nav-item, pond-side-nav-section'
    )) {
      ;(el as HTMLElement & { rail?: boolean }).rail = this.collapsed
    }
  }

  override render() {
    return html`
      <nav part="root" aria-label=${this.label}>
        <slot @slotchange=${() => this.#syncRail()}></slot>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-side-nav': PondSideNav
  }
}
