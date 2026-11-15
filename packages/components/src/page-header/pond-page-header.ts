import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Slot-based page chrome shell.
 * @status stable
 * @since 0.0.0
 *
 * @slot breadcrumbs — Trail above the title row.
 * @slot title — Page title (falls back to `heading` property).
 * @slot actions — Primary actions (buttons, menu).
 * @slot bottom — Optional bottom region (e.g. Tabs).
 * @slot — Default description / subtitle under the title.
 */
@customElement('pond-page-header')
export class PondPageHeader extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='root'] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-3);
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
    }

    [part='breadcrumbs'] {
      min-width: 0;
    }

    [part='main'] {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--pond-space-3);
    }

    [part='text'] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-1);
      min-width: 0;
    }

    [part='title'] {
      margin: 0;
      font-size: var(--pond-font-size-xl);
      font-weight: var(--pond-font-weight-semibold);
      line-height: var(--pond-font-line-tight);
    }

    [part='description'] {
      margin: 0;
      color: var(--pond-color-fg-muted);
      font-size: var(--pond-font-size-md);
    }

    [part='actions'] {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--pond-space-2);
    }

    [part='bottom'] {
      min-width: 0;
    }

    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='breadcrumbs'],
    :host([appearance='plain']) [part='main'],
    :host([appearance='plain']) [part='text'],
    :host([appearance='plain']) [part='title'],
    :host([appearance='plain']) [part='description'],
    :host([appearance='plain']) [part='actions'],
    :host([appearance='plain']) [part='bottom'] {
      all: unset;
    }

    :host([appearance='plain']) [part='root'],
    :host([appearance='plain']) [part='main'],
    :host([appearance='plain']) [part='text'],
    :host([appearance='plain']) [part='actions'] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property()
  heading = ''

  override render() {
    return html`
      <header part="root">
        <div part="breadcrumbs"><slot name="breadcrumbs"></slot></div>
        <div part="main">
          <div part="text">
            <h1 part="title">
              <slot name="title">${this.heading || nothing}</slot>
            </h1>
            <div part="description"><slot></slot></div>
          </div>
          <div part="actions"><slot name="actions"></slot></div>
        </div>
        <div part="bottom"><slot name="bottom"></slot></div>
      </header>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-page-header': PondPageHeader
  }
}
