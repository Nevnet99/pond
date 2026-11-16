import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Overlapping layout helper for a stack of Avatars.
 * @status stable
 * @since 0.0.0
 *
 * Layout only — face styling comes from Avatar. No overflow/`+N` count yet.
 *
 * @slot — One or more `pond-avatar` children.
 * @csspart root — Group row (`role="group"`).
 */
@customElement('pond-avatar-group')
export class PondAvatarGroup extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-family: var(--pond-font-family-sans);
    }
    /* Ring on circular host so it matches the avatar face (not a box around the host). */
    [part="root"] ::slotted(pond-avatar) {
      position: relative;
      margin-inline-start: calc(var(--pond-space-2) * -1);
      border-radius: 999px;
      box-shadow: 0 0 0 2px var(--pond-color-bg-canvas);
      background: var(--pond-color-bg-canvas);
    }
    [part="root"] ::slotted(pond-avatar:first-child) {
      margin-inline-start: 0;
    }
    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
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
