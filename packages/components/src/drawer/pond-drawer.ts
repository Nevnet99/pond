import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import { cycleTab, getFocusable } from '../shared/focus-trap.js'
import '../blanket/pond-blanket.js'

export type PondDrawerSide = 'start' | 'end'

/** @summary Slide-in panel shell with Blanket and focus trap. @status stable @since 0.0.0 @fires pond-close */
@customElement('pond-drawer')
export class PondDrawer extends LitElement {
  static override styles = css`
    :host { display: contents; }
    pond-blanket::part(root) {
      justify-content: flex-start;
    }
    :host([side='end']) pond-blanket::part(root) {
      justify-content: flex-end;
    }
    [part='panel'] {
      box-sizing: border-box; width: min(100%, 22rem); height: 100%;
      overflow: auto; padding: var(--pond-space-4);
      background: var(--pond-color-bg-canvas); color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      box-shadow: 0 0 24px rgb(0 0 0 / 20%);
    }
    [part='header'] {
      display: flex; align-items: center; justify-content: space-between;
      gap: var(--pond-space-2); margin-bottom: var(--pond-space-3);
    }
    [part='title'] {
      margin: 0; font-size: var(--pond-font-size-lg); font-weight: var(--pond-font-weight-semibold);
    }
    [part='close'] {
      margin: 0; padding: var(--pond-space-1); border: 0; border-radius: var(--pond-radius-sm);
      background: transparent; color: inherit; cursor: pointer; font: inherit;
    }
    [part='close']:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([appearance='plain']) [part='panel'],
    :host([appearance='plain']) [part='header'],
    :host([appearance='plain']) [part='title'],
    :host([appearance='plain']) [part='close'] { all: unset; }
  `

  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ type: Boolean, reflect: true }) open = false
  @property({ reflect: true }) side: PondDrawerSide = 'start'
  @property() title = ''

  @query('[part="panel"]')
  private panel!: HTMLElement

  #previousFocus: HTMLElement | null = null

  #focusables(): HTMLElement[] {
    const fromShadow = this.panel ? getFocusable(this.panel) : []
    const fromLight = getFocusable(this)
    const seen = new Set<HTMLElement>()
    const out: HTMLElement[] = []
    for (const el of [...fromShadow, ...fromLight]) {
      if (!seen.has(el)) {
        seen.add(el)
        out.push(el)
      }
    }
    return out
  }

  #onKey = (event: KeyboardEvent) => {
    if (!this.open) return
    if (event.key === 'Escape') {
      event.preventDefault()
      this.close()
      return
    }
    if (event.key === 'Tab') {
      cycleTab(event, this.#focusables(), this.panel)
    }
  }

  override connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keydown', this.#onKey)
  }

  override disconnectedCallback() {
    window.removeEventListener('keydown', this.#onKey)
    super.disconnectedCallback()
  }

  protected updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return
    if (this.open) {
      this.#previousFocus = document.activeElement as HTMLElement | null
      this.updateComplete.then(() => {
        const nodes = this.#focusables()
        ;(nodes[0] ?? this.panel)?.focus()
      })
    } else {
      this.#previousFocus?.focus?.()
      this.#previousFocus = null
    }
  }

  close() {
    this.open = false
    this.dispatchEvent(
      new CustomEvent('pond-close', { bubbles: true, composed: true })
    )
  }

  override render() {
    if (!this.open) return nothing
    return html`
      <pond-blanket @pond-dismiss=${() => this.close()}>
        <div
          part="panel"
          role="dialog"
          aria-modal="true"
          aria-label=${this.title || 'Drawer'}
          tabindex="-1"
        >
          <div part="header">
            ${this.title ? html`<h2 part="title">${this.title}</h2>` : html`<span></span>`}
            <button part="close" type="button" aria-label="Close" @click=${() => this.close()}>×</button>
          </div>
          <slot></slot>
        </div>
      </pond-blanket>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-drawer': PondDrawer
  }
}
