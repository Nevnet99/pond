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
 * @fires pond-reorder — Row order changed (`detail.rows`, `detail.from`, `detail.to`).
 *
 * @csspart root — Outer shell.
 * @csspart table — Table element.
 * @csspart th — Sortable header button cell.
 * @csspart td — Body cell.
 * @csspart reorder — Row reorder controls cell.
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

    [part="reorder"] {
      width: 1%;
      padding: var(--pond-space-2) var(--pond-space-4);
      text-align: left;
      vertical-align: top;
      border-bottom: 1px solid var(--pond-color-border-default);
      white-space: nowrap;
    }

    [part="reorder"] button {
      margin: 0;
      padding: var(--pond-space-1);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-sm);
      background: var(--pond-color-bg-surface);
      color: inherit;
      font: inherit;
      line-height: 1;
      cursor: pointer;
    }

    [part="reorder"] button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    [part="reorder"] button:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="table-wrap"],
    :host([appearance="plain"]) [part="table"],
    :host([appearance="plain"]) [part="th"],
    :host([appearance="plain"]) [part="td"],
    :host([appearance="plain"]) [part="sort"],
    :host([appearance="plain"]) [part="reorder"],
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

  /** When true, each row gets up/down controls for client-side reorder. */
  @property({ type: Boolean, reflect: true })
  reorderable = false

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

  #move(fromSorted: number, delta: number) {
    const sorted = this.#sorted
    const to = fromSorted + delta
    if (to < 0 || to >= sorted.length) return
    const next = [...sorted]
    const [row] = next.splice(fromSorted, 1)
    next.splice(to, 0, row)
    this.rows = next
    this.sortKey = ''
    this.dispatchEvent(
      new CustomEvent('pond-reorder', {
        detail: { rows: next, from: fromSorted, to },
        bubbles: true,
        composed: true
      })
    )
  }

  override render() {
    const size = Math.max(1, this.pageSize)
    const pageStart = (this.#page - 1) * size
    return html`
      <div part="root">
        <div part="table-wrap">
          <table part="table">
            ${this.caption ? html`<caption>${this.caption}</caption>` : nothing}
            <thead>
              <tr part="tr">
                ${
                  this.reorderable
                    ? html`<th part="th" scope="col">
                      <span
                        style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0"
                        >Reorder</span
                      >
                    </th>`
                    : nothing
                }
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
              ${this.#pageRows.map((row, i) => {
                const absolute = pageStart + i
                return html`<tr part="tr">
                  ${
                    this.reorderable
                      ? html`<td part="reorder">
                        <button
                          type="button"
                          aria-label="Move up"
                          ?disabled=${absolute === 0}
                          @click=${() => this.#move(absolute, -1)}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          aria-label="Move down"
                          ?disabled=${absolute >= this.#sorted.length - 1}
                          @click=${() => this.#move(absolute, 1)}
                        >
                          ↓
                        </button>
                      </td>`
                      : nothing
                  }
                  ${this.columns.map(
                    (c) => html`<td part="td">${row[c.key] ?? ''}</td>`
                  )}
                </tr>`
              })}
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
