import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondSectionMessageTone = 'info' | 'success' | 'warning' | 'danger'

/**
 * @summary In-page alert / section message.
 * @status stable
 * @since 0.0.0
 */
@customElement('pond-section-message')
export class PondSectionMessage extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='root'] {
      box-sizing: border-box;
      padding: var(--pond-space-3) var(--pond-space-4);
      border: 1px solid var(--pond-color-border-default);
      border-left-width: 4px;
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-surface);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-md);
      line-height: var(--pond-font-line-normal);
    }

    :host([tone='info']) [part='root'] {
      border-left-color: var(--pond-color-accent-default);
    }

    :host([tone='success']) [part='root'] {
      border-left-color: var(--pond-color-accent-hover);
    }

    :host([tone='warning']) [part='root'] {
      border-left-color: var(--pond-color-border-strong);
    }

    :host([tone='danger']) [part='root'] {
      border-left-color: var(--pond-color-danger-default);
      background: var(--pond-color-danger-subtle);
    }

    [part='title'] {
      margin: 0 0 var(--pond-space-1);
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-semibold);
    }

    [part='body'] {
      margin: 0;
    }

    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='title'],
    :host([appearance='plain']) [part='body'] {
      all: unset;
    }

    :host([appearance='plain']) [part='root'] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  tone: PondSectionMessageTone = 'info'

  @property()
  title = ''

  override render() {
    const role = this.tone === 'danger' ? 'alert' : 'status'
    return html`
      <div part="root" role=${role}>
        ${this.title ? html`<p part="title">${this.title}</p>` : nothing}
        <div part="body"><slot></slot></div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-section-message': PondSectionMessage
  }
}
