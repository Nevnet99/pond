import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../pagination/pond-pagination.js'
import type { PondTableColumn, PondTableRow } from '../table/pond-table.js'

export type { PondTableColumn, PondTableRow }
export type PondSortDirection = 'asc' | 'desc'

/**
 * @summary Data table with client-side column sort and pagination.
 * @status stable
 * @since 0.0.0
 *
 * @fires pond-sort — Sort changed (`detail.key`, `detail.direction`).
 * @fires pond-change — Page changed (`detail.page`).
 *
 * @csspart root — Outer shell.
 * @csspart table — Table element.
 * @csspart th — Sortable header button cell.
 * @csspart td — Body cell.
 * @csspart pagination — Pagination row.
 */
@customElement('pond-dynamic-table')
export class PondDynamicTable extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-3);
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
    }

    [part="table-wrap"] {
      width: 100%;
      overflow: auto;
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
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

    [part="sort"] {
      display: inline-flex;
      align-items: center;
      gap: var(--pond-space-1);
      margin: 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }

    [part="sort"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part="tr"]:last-child [part="td"] {
      border-bottom: none;
    }

    [part="pagination"] {
      display: flex;
      justify-content: flex-end;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="table-wrap"],
    :host([appearance="plain"]) [part="table"],
    :host([appearance="plain"]) [part="th"],
    :host([appearance="plain"]) [part="td"],
    :host([appearance="plain"]) [part="sort"],
    :host([appearance="plain"]) [part="pagination"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property()
  caption = ''

  @property({ type: Array })
  columns: PondTableColumn[] = []

  @property({ type: Array })
  rows: PondTableRow[] = []

  @property({ type: Number, attribute: 'page-size' })
  pageSize = 5

  @property({ type: Number })
  page = 1

  @property({ attribute: 'sort-key' })
  sortKey = ''

  @property({ attribute: 'sort-direction' })
  sortDirection: PondSortDirection = 'asc'

  @state() private internalPage = 1

  get #page(): number {
    return this.page || this.internalPage
  }

  get #sorted(): PondTableRow[] {
    if (!this.sortKey) return [...this.rows]
    const key = this.sortKey
    const dir = this.sortDirection === 'desc' ? -1 : 1
    return [...this.rows].sort((a, b) => {
      const av = a[key] ?? ''
      const bv = b[key] ?? ''
      return av.localeCompare(bv, undefined, { numeric: true }) * dir
    })
  }

  get #pageCount(): number {
    return Math.max(
      1,
      Math.ceil(this.#sorted.length / Math.max(1, this.pageSize))
    )
  }

  get #pageRows(): PondTableRow[] {
    const size = Math.max(1, this.pageSize)
    const start = (this.#page - 1) * size
    return this.#sorted.slice(start, start + size)
  }

  #sort(key: string) {
    if (this.sortKey === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortKey = key
      this.sortDirection = 'asc'
    }
    this.dispatchEvent(
      new CustomEvent('pond-sort', {
        detail: { key: this.sortKey, direction: this.sortDirection },
        bubbles: true,
        composed: true
      })
    )
  }

  #onPage = (event: CustomEvent<{ page: number }>) => {
    this.page = event.detail.page
    this.internalPage = event.detail.page
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { page: event.detail.page },
        bubbles: true,
        composed: true
      })
    )
  }

  override render() {
    return html`
      <div part="root">
        <div part="table-wrap">
          <table part="table">
            ${this.caption ? html`<caption>${this.caption}</caption>` : nothing}
            <thead>
              <tr part="tr">
                ${this.columns.map(
                  (c) => html`<th
                    part="th"
                    scope="col"
                    aria-sort=${
                      this.sortKey === c.key
                        ? this.sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                    }
                  >
                    <button
                      type="button"
                      part="sort"
                      @click=${() => this.#sort(c.key)}
                    >
                      ${c.label}
                      ${
                        this.sortKey === c.key
                          ? this.sortDirection === 'asc'
                            ? ' ↑'
                            : ' ↓'
                          : ''
                      }
                    </button>
                  </th>`
                )}
              </tr>
            </thead>
            <tbody>
              ${this.#pageRows.map(
                (row) => html`<tr part="tr">
                  ${this.columns.map(
                    (c) => html`<td part="td">${row[c.key] ?? ''}</td>`
                  )}
                </tr>`
              )}
            </tbody>
          </table>
        </div>
        <div part="pagination">
          <pond-pagination
            .page=${this.#page}
            .pageCount=${this.#pageCount}
            @pond-change=${this.#onPage}
          ></pond-pagination>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-dynamic-table': PondDynamicTable
  }
}
