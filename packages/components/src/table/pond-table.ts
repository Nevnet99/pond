import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondTableColumn = { key: string; label: string }
export type PondTableRow = Record<string, string>

/**
 * @summary Simple data table with caption, headers, and string rows.
 * @status stable
 * @since 0.0.0
 *
 * @csspart root — Scroll container.
 * @csspart table — Native `<table>`.
 * @csspart caption — Caption when set.
 * @csspart th — Column header.
 * @csspart td — Body cell.
 */
@customElement('pond-table')
export class PondTable extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      width: 100%;
      overflow: auto;
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
    }
    [part="caption"] {
      padding: var(--pond-space-3) var(--pond-space-4);
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
      text-align: left;
      border-bottom: 1px solid var(--pond-color-border-default);
    }
    [part="table"] {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--pond-font-size-md);
    }
    [part="th"],
    [part="td"] {
      padding: var(--pond-space-2) var(--pond-space-4);
      text-align: left;
      vertical-align: top;
      border-bottom: 1px solid var(--pond-color-border-default);
    }
    [part="th"] {
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
      color: var(--pond-color-fg-subtle);
      background: var(--pond-color-bg-subtle, transparent);
    }
    [part="tr"]:last-child [part="td"] {
      border-bottom: none;
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="caption"],
    :host([appearance="plain"]) [part="table"],
    :host([appearance="plain"]) [part="th"],
    :host([appearance="plain"]) [part="td"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  /** Visual reset — `plain` strips Pond chrome. */
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  /** Accessible table name rendered as `<caption>`. */
  @property() caption = ''
  /** Column headers; each `key` maps into row objects. */
  @property({ type: Array }) columns: PondTableColumn[] = []
  /** Row data as string maps keyed by column `key`. */
  @property({ type: Array }) rows: PondTableRow[] = []

  override render() {
    return html`<div part="root">
      <table part="table">
        ${this.caption ? html`<caption part="caption">${this.caption}</caption>` : nothing}
        <thead>
          <tr part="tr">
            ${this.columns.map((c) => html`<th part="th" scope="col">${c.label}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.rows.map(
            (row) => html`<tr part="tr">
              ${this.columns.map((c) => html`<td part="td">${row[c.key] ?? ''}</td>`)}
            </tr>`
          )}
        </tbody>
      </table>
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-table': PondTable
  }
}
