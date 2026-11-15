import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Navigate multi-page lists.
 * @status stable
 * @since 0.0.0
 *
 * @fires pond-change — Page changed (`detail.page`).
 */
@customElement('pond-pagination')
export class PondPagination extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--pond-space-1);
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
      color: var(--pond-color-fg-default);
    }

    [part="page"],
    [part="prev"],
    [part="next"] {
      box-sizing: border-box;
      min-width: 2rem;
      margin: 0;
      padding: var(--pond-space-1) var(--pond-space-2);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: inherit;
      font: inherit;
      cursor: pointer;
    }

    [part="page"][aria-current="page"] {
      border-color: var(--pond-color-accent-default);
      background: var(--pond-color-accent-default);
      color: var(--pond-color-fg-on-accent);
    }

    [part="page"]:focus-visible,
    [part="prev"]:focus-visible,
    [part="next"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }

    [part="page"]:disabled,
    [part="prev"]:disabled,
    [part="next"]:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="page"],
    :host([appearance="plain"]) [part="prev"],
    :host([appearance="plain"]) [part="next"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ type: Number })
  page = 1

  @property({ type: Number, attribute: 'page-count' })
  pageCount = 1

  #go(page: number) {
    const next = Math.min(Math.max(1, page), Math.max(1, this.pageCount))
    if (next === this.page) return
    this.page = next
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { page: next },
        bubbles: true,
        composed: true
      })
    )
  }

  #pages(): number[] {
    const count = Math.max(1, this.pageCount)
    return Array.from({ length: count }, (_, i) => i + 1)
  }

  override render() {
    const pages = this.#pages()
    return html`
      <nav part="root" aria-label="Pagination">
        <button
          part="prev"
          type="button"
          ?disabled=${this.page <= 1}
          @click=${() => this.#go(this.page - 1)}
        >
          Previous
        </button>
        ${pages.map((p) =>
          p === this.page
            ? html`<button
                part="page"
                type="button"
                aria-current="page"
                aria-label=${`Page ${p}`}
              >
                ${p}
              </button>`
            : html`<button
                part="page"
                type="button"
                aria-label=${`Page ${p}`}
                @click=${() => this.#go(p)}
              >
                ${p}
              </button>`
        )}
        <button
          part="next"
          type="button"
          ?disabled=${this.page >= this.pageCount}
          @click=${() => this.#go(this.page + 1)}
        >
          Next
        </button>
      </nav>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-pagination': PondPagination
  }
}
