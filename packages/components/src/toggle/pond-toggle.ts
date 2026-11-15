import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary On/off switch. @status stable @since 0.0.0 */
@customElement('pond-toggle')
export class PondToggle extends LitElement {
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
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
      font-size: var(--pond-font-size-md);
      cursor: pointer;
    }
    [part="track"] {
      position: relative;
      width: 2.5rem;
      height: 1.375rem;
      border-radius: var(--pond-radius-pill);
      background: var(--pond-color-border-strong);
      transition: background-color var(--pond-motion-duration-fast)
        var(--pond-motion-easing-standard);
      flex-shrink: 0;
    }
    :host([checked]) [part="track"] {
      background: var(--pond-color-accent-default);
    }
    [part="thumb"] {
      position: absolute;
      top: 0.125rem;
      left: 0.125rem;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 50%;
      background: var(--pond-color-bg-canvas);
      transition: transform var(--pond-motion-duration-fast)
        var(--pond-motion-easing-standard);
    }
    :host([checked]) [part="thumb"] {
      transform: translateX(1.125rem);
    }
    [part="root"]:focus-visible [part="track"] {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([disabled]) [part="root"] {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @media (prefers-reduced-motion: reduce) {
      [part="track"],
      [part="thumb"] {
        transition: none;
      }
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="track"],
    :host([appearance="plain"]) [part="thumb"],
    :host([appearance="plain"]) [part="label"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() label = ''
  @property({ type: Boolean, reflect: true }) checked = false
  @property({ type: Boolean, reflect: true }) disabled = false

  #toggle() {
    if (this.disabled) return
    this.checked = !this.checked
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true
      })
    )
  }

  #onKey(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      this.#toggle()
    }
  }

  override render() {
    return html`<div part="root" role="switch" tabindex=${this.disabled ? -1 : 0}
      aria-checked=${this.checked ? 'true' : 'false'} aria-disabled=${this.disabled ? 'true' : 'false'}
      @click=${this.#toggle} @keydown=${this.#onKey}>
      <span part="track"><span part="thumb"></span></span>
      <span part="label">${this.label}<slot></slot></span>
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-toggle': PondToggle
  }
}
