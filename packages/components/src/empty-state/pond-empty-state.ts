import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../icon/pond-icon.js'

/** @summary Placeholder when a view has no content. @status stable @since 0.0.0 */
@customElement('pond-empty-state')
export class PondEmptyState extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; flex-direction: column; align-items: center; gap: var(--pond-space-3);
      box-sizing: border-box; padding: var(--pond-space-6); text-align: center;
      font-family: var(--pond-font-family-sans); color: var(--pond-color-fg-default);
    }
    [part='icon'] { color: var(--pond-color-fg-muted); }
    [part='title'] { margin: 0; font-size: var(--pond-font-size-lg); font-weight: var(--pond-font-weight-semibold); }
    [part='body'] { margin: 0; color: var(--pond-color-fg-muted); font-size: var(--pond-font-size-md); max-width: 28rem; }
    [part='actions'] { display: inline-flex; flex-wrap: wrap; gap: var(--pond-space-2); }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='icon'],
    :host([appearance='plain']) [part='title'],
    :host([appearance='plain']) [part='body'],
    :host([appearance='plain']) [part='actions'] { all: unset; }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='actions'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() heading = ''
  @property() icon = 'info'
  override render() {
    return html`<div part="root">
      <div part="icon"><slot name="icon"><pond-icon name=${this.icon} size="lg"></pond-icon></slot></div>
      ${this.heading ? html`<h2 part="title">${this.heading}</h2>` : nothing}
      <div part="body"><slot></slot></div>
      <div part="actions"><slot name="actions"></slot></div>
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-empty-state': PondEmptyState
  }
}
