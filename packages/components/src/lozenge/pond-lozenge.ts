import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondLozengeTone =
  | 'default'
  | 'success'
  | 'warning'
  | 'danger'
  | 'new'

/**
 * @summary Status pill.
 * @status stable
 * @since 0.0.0
 */
@customElement('pond-lozenge')
export class PondLozenge extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='lozenge'] {
      display: inline-flex;
      align-items: center;
      padding: 0 var(--pond-space-2);
      border-radius: var(--pond-radius-sm);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-xs);
      font-weight: var(--pond-font-weight-bold);
      line-height: 1.5rem;
      letter-spacing: var(--pond-font-tracking-wide);
      text-transform: uppercase;
      background: var(--pond-color-bg-subtle);
      color: var(--pond-color-fg-default);
    }

    :host([tone='success']) [part='lozenge'],
    :host([tone='new']) [part='lozenge'] {
      background: var(--pond-color-accent-default);
      color: var(--pond-color-fg-on-accent);
    }

    :host([tone='warning']) [part='lozenge'] {
      background: var(--pond-color-bg-inverse);
      color: var(--pond-color-fg-on-accent);
    }

    :host([tone='danger']) [part='lozenge'] {
      background: var(--pond-color-danger-subtle);
      color: var(--pond-color-danger-default);
    }

    :host([appearance='plain']) [part='lozenge'] {
      all: unset;
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  tone: PondLozengeTone = 'default'

  override render() {
    return html`<span part="lozenge"><slot></slot></span>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-lozenge': PondLozenge
  }
}
