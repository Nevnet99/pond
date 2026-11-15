import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/** @summary Hide content visually while keeping it available to assistive tech. @status stable @since 0.0.0 */
@customElement('pond-visually-hidden')
export class PondVisuallyHidden extends LitElement {
  static override styles = css`
    :host { display: contents; }
    :host([appearance='plain']) [part='root'] { all: unset; display: contents; }
    [part='root'] {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  override render() {
    return html`<span part="root"><slot></slot></span>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-visually-hidden': PondVisuallyHidden
  }
}
