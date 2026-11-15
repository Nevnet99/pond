import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Short sequence position (dots). @status stable @since 0.0.0 */
@customElement('pond-progress-indicator')
export class PondProgressIndicator extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; gap: var(--pond-space-2); align-items: center;
      font-family: var(--pond-font-family-sans);
    }
    [part='dot'] {
      width: 0.5rem; height: 0.5rem; border-radius: 999px;
      background: var(--pond-color-border-strong);
    }
    [part='dot'][data-active] { background: var(--pond-color-accent-default); transform: scale(1.25); }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='dot'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ type: Number }) steps = 4
  /** 0-based selected index */
  @property({ type: Number }) selected = 0
  @property() label = 'Progress'
  override render() {
    const count = Math.max(1, this.steps)
    const selected = Math.max(0, Math.min(count - 1, this.selected))
    return html`<div part="root" role="group" aria-label=${`${this.label}: step ${selected + 1} of ${count}`}>
      ${Array.from(
        { length: count },
        (_, i) =>
          html`<span part="dot" ?data-active=${i === selected} aria-hidden="true"></span>`
      )}
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-progress-indicator': PondProgressIndicator
  }
}
