import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondBreadcrumbItem = {
  label: string
  href?: string
  current?: boolean
}

/**
 * @summary Trail of links for page hierarchy.
 * @status stable
 * @since 0.0.0
 *
 * @csspart root — Nav wrapper.
 * @csspart list — Ordered list.
 * @csspart item — List item.
 * @csspart link — Anchor (or span when current / no href).
 * @csspart separator — Separator between items.
 */
@customElement('pond-breadcrumbs')
export class PondBreadcrumbs extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
      color: var(--pond-color-fg-muted);
    }

    [part="list"] {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--pond-space-1);
      margin: 0;
      padding: 0;
      list-style: none;
    }

    [part="item"] {
      display: inline-flex;
      align-items: center;
      gap: var(--pond-space-1);
    }

    [part="link"] {
      color: var(--pond-color-accent-default);
      text-decoration: none;
    }

    [part="link"]:hover {
      text-decoration: underline;
    }

    [part="link"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part="link"][aria-current="page"] {
      color: var(--pond-color-fg-default);
      font-weight: var(--pond-font-weight-medium);
      text-decoration: none;
      pointer-events: none;
    }

    [part="separator"] {
      color: var(--pond-color-fg-muted);
      user-select: none;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="list"],
    :host([appearance="plain"]) [part="item"],
    :host([appearance="plain"]) [part="link"],
    :host([appearance="plain"]) [part="separator"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="list"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ type: Array })
  items: PondBreadcrumbItem[] = []

  override render() {
    return html`
      <nav part="root" aria-label="Breadcrumb">
        <ol part="list">
          ${this.items.map((item, index) => {
            const isCurrent =
              Boolean(item.current) || index === this.items.length - 1
            return html`
              <li part="item">
                ${
                  index > 0
                    ? html`<span part="separator" aria-hidden="true">/</span>`
                    : nothing
                }
                ${
                  isCurrent || !item.href
                    ? html`<span part="link" aria-current=${isCurrent ? 'page' : nothing}
                      >${item.label}</span
                    >`
                    : html`<a part="link" href=${item.href}>${item.label}</a>`
                }
              </li>
            `
          })}
        </ol>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-breadcrumbs': PondBreadcrumbs
  }
}
