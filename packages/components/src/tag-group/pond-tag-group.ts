import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Layout helper for a wrap row of Tags with `role="group"`.
 * @status stable
 * @since 0.0.0
 *
 * @slot — Tag children.
 * @csspart root — Flex wrap group host.
 */
@customElement('pond-tag-group')
export class PondTagGroup extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--pond-space-2);
      font-family: var(--pond-font-family-sans);
    }
    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
  `
  /** Visual reset — `plain` strips Pond gap chrome. */
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  /** Accessible name exposed as `aria-label` on the group. */
  @property() label = 'Tags'
  override render() {
    return html`<div part="root" role="group" aria-label=${this.label}><slot></slot></div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-tag-group': PondTagGroup
  }
}
