import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../icon/pond-icon.js'

export type PondInlineMessageTone = 'info' | 'success' | 'warning' | 'danger'

/** @summary Compact field- or control-adjacent notice. @status stable @since 0.0.0 */
@customElement('pond-inline-message')
export class PondInlineMessage extends LitElement {
  static override styles = css`
    :host { display: block; }
    :host([appearance='plain']) { display: contents; }
    [part='root'] {
      display: flex; align-items: flex-start; gap: var(--pond-space-2);
      box-sizing: border-box; padding: var(--pond-space-2) var(--pond-space-3);
      border-radius: var(--pond-radius-sm);
      background: var(--pond-color-bg-subtle, transparent);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans); font-size: var(--pond-font-size-sm);
      line-height: var(--pond-font-line-normal);
    }
    :host([tone='danger']) [part='root'] { color: var(--pond-color-danger-default); }
    [part='title'] { margin: 0 0 var(--pond-space-1); font-weight: var(--pond-font-weight-semibold); }
    [part='body'] { margin: 0; flex: 1; min-width: 0; }
    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='title'],
    :host([appearance='plain']) [part='body'] { all: unset; }
    :host([appearance='plain']) [part='root'] { display: contents; }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ reflect: true }) tone: PondInlineMessageTone = 'info'
  @property() title = ''
  override render() {
    const role = this.tone === 'danger' ? 'alert' : 'status'
    const icon =
      this.tone === 'danger' || this.tone === 'warning' ? 'warning' : 'check'
    return html`<div part="root" role=${role}>
      <pond-icon name=${icon} size="sm"></pond-icon>
      <div part="body">
        ${this.title ? html`<p part="title">${this.title}</p>` : nothing}
        <slot></slot>
      </div>
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-inline-message': PondInlineMessage
  }
}
