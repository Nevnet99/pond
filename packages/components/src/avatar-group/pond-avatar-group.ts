import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Layout helper for a stack of Avatars. @status stable @since 0.0.0 */
@customElement('pond-avatar-group')
export class PondAvatarGroup extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; flex-direction: row; align-items: center;
      font-family: var(--pond-font-family-sans);
    }
    [part='root'] ::slotted(pond-avatar) {
      margin-inline-start: calc(var(--pond-space-2) * -1);
      box-shadow: 0 0 0 2px var(--pond-color-bg-canvas);
    }
    [part='root'] ::slotted(pond-avatar:first-child) { margin-inline-start: 0; }
    :host([appearance='plain']) [part='root'] { all: unset; display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() label = 'Avatars'
  override render() {
    return html`<div part="root" role="group" aria-label=${this.label}><slot></slot></div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-avatar-group': PondAvatarGroup
  }
}
