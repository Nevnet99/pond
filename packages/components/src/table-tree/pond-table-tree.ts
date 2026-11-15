import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondTableTreeColumn = { key: string; label: string }
export type PondTableTreeNode = {
  id: string
  cells: Record<string, string>
  children?: PondTableTreeNode[]
}

type FlatRow = {
  node: PondTableTreeNode
  depth: number
  hasChildren: boolean
}

/**
 * @summary Expandable nested table rows with indent.
 * @status stable
 * @since 0.0.0
 *
 * @fires pond-toggle — Row expand/collapse (`detail.id`, `detail.expanded`).
 *
 * @csspart root — Outer shell.
 * @csspart table — Table element.
 * @csspart toggle — Expand/collapse control.
 */
@customElement('pond-table-tree')
export class PondTableTree extends LitElement {
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
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
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

    [part="toggle"] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      margin: 0 var(--pond-space-1) 0 0;
      padding: 0;
      border: 0;
      border-radius: var(--pond-radius-sm);
      background: transparent;
      color: var(--pond-color-fg-muted);
      font: inherit;
      cursor: pointer;
    }

    [part="toggle"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part="toggle"][disabled] {
      visibility: hidden;
      cursor: default;
    }

    [part="cell-start"] {
      display: inline-flex;
      align-items: center;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="table"],
    :host([appearance="plain"]) [part="th"],
    :host([appearance="plain"]) [part="td"],
    :host([appearance="plain"]) [part="toggle"],
    :host([appearance="plain"]) [part="cell-start"] {
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
  columns: PondTableTreeColumn[] = []

  @property({ type: Array })
  nodes: PondTableTreeNode[] = []

  /** Expanded node ids. */
  @property({ type: Array, attribute: 'expanded-ids' })
  expandedIds: string[] = []

  @state() private expanded = new Set<string>()

  protected override willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('expandedIds')) {
      this.expanded = new Set(this.expandedIds)
    }
  }

  #isExpanded(id: string): boolean {
    return this.expanded.has(id)
  }

  #toggle(id: string) {
    const next = new Set(this.expanded)
    const open = !next.has(id)
    if (open) next.add(id)
    else next.delete(id)
    this.expanded = next
    this.expandedIds = [...next]
    this.dispatchEvent(
      new CustomEvent('pond-toggle', {
        detail: { id, expanded: open },
        bubbles: true,
        composed: true
      })
    )
  }

  #flatten(
    nodes: PondTableTreeNode[],
    depth = 0,
    out: FlatRow[] = []
  ): FlatRow[] {
    for (const node of nodes) {
      const kids = node.children ?? []
      out.push({
        node,
        depth,
        hasChildren: kids.length > 0
      })
      if (kids.length && this.#isExpanded(node.id)) {
        this.#flatten(kids, depth + 1, out)
      }
    }
    return out
  }

  override render() {
    const rows = this.#flatten(this.nodes)
    const firstKey = this.columns[0]?.key

    return html`
      <div part="root">
        <table part="table">
          ${this.caption ? html`<caption>${this.caption}</caption>` : nothing}
          <thead>
            <tr part="tr">
              ${this.columns.map(
                (c) => html`<th part="th" scope="col">${c.label}</th>`
              )}
            </tr>
          </thead>
          <tbody>
            ${rows.map(({ node, depth, hasChildren }) => {
              return html`<tr part="tr">
                ${this.columns.map((c, index) => {
                  const value = node.cells[c.key] ?? ''
                  if (index === 0 || c.key === firstKey) {
                    return html`<td part="td">
                      <span
                        part="cell-start"
                        style=${`padding-inline-start:${depth * 1.25}rem`}
                      >
                        <button
                          type="button"
                          part="toggle"
                          ?disabled=${!hasChildren}
                          aria-expanded=${
                            hasChildren
                              ? String(this.#isExpanded(node.id))
                              : nothing
                          }
                          aria-label=${
                            hasChildren
                              ? this.#isExpanded(node.id)
                                ? 'Collapse'
                                : 'Expand'
                              : nothing
                          }
                          @click=${() => this.#toggle(node.id)}
                        >
                          ${
                            hasChildren
                              ? this.#isExpanded(node.id)
                                ? '▾'
                                : '▸'
                              : ''
                          }
                        </button>
                        ${value}
                      </span>
                    </td>`
                  }
                  return html`<td part="td">${value}</td>`
                })}
              </tr>`
            })}
          </tbody>
        </table>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-table-tree': PondTableTree
  }
}
