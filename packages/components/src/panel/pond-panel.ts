import { css, html, LitElement, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Contextual side panel with optional header and footer.
 * @status stable
 * @since 0.0.0
 *
 * @slot heading — Panel title (falls back to `heading` property).
 * @slot actions — Header actions (buttons, menu).
 * @slot footer — Optional footer region.
 * @slot — Panel body content.
 *
 * @csspart root — Outer panel shell.
 * @csspart header — Title + actions row.
 * @csspart heading — Title element.
 * @csspart actions — Header actions cluster.
 * @csspart body — Main panel content.
 * @csspart footer — Footer region.
 */
@customElement('pond-panel')
export class PondPanel extends LitElement {
  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      height: 100%;
      min-height: 0;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-3);
      height: 100%;
      min-height: 0;
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
    }

    [part="header"] {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--pond-space-2);
      flex: none;
      min-width: 0;
    }

    [part="heading"] {
      margin: 0;
      min-width: 0;
      font-size: var(--pond-font-size-md);
      font-weight: var(--pond-font-weight-semibold);
      line-height: var(--pond-font-line-tight);
    }

    [part="actions"] {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--pond-space-2);
    }

    [part="body"] {
      box-sizing: border-box;
      flex: 1;
      min-height: 0;
      min-width: 0;
      overflow: auto;
    }

    [part="footer"] {
      flex: none;
      min-width: 0;
      padding-block-start: var(--pond-space-2);
      border-block-start: 1px solid var(--pond-color-border-default);
    }

    :host(:not([data-has-header])) [part="header"],
    :host(:not([data-has-footer])) [part="footer"] {
      display: none;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="header"],
    :host([appearance="plain"]) [part="heading"],
    :host([appearance="plain"]) [part="actions"],
    :host([appearance="plain"]) [part="body"],
    :host([appearance="plain"]) [part="footer"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Panel title when the heading slot is empty. */
  @property()
  heading = ''

  @state() private hasHeadingSlot = false
  @state() private hasActions = false
  @state() private hasFooter = false

  #onNamedSlotChange(kind: 'heading' | 'actions' | 'footer', event: Event) {
    const slot = event.target as HTMLSlotElement
    const assigned = slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return true
      return (node.textContent ?? '').trim().length > 0
    })
    switch (kind) {
      case 'heading':
        this.hasHeadingSlot = assigned
        break
      case 'actions':
        this.hasActions = assigned
        break
      case 'footer':
        this.hasFooter = assigned
        break
      default:
        break
    }
  }

  get #hasHeader(): boolean {
    return (
      this.hasHeadingSlot || this.heading.trim().length > 0 || this.hasActions
    )
  }

  protected override updated(): void {
    this.toggleAttribute('data-has-header', this.#hasHeader)
    this.toggleAttribute('data-has-footer', this.hasFooter)
  }

  override render() {
    const title =
      this.hasHeadingSlot || !this.heading.trim()
        ? nothing
        : html`<h2 part="heading" id="pond-panel-heading">${this.heading}</h2>`

    return html`
      <section
        part="root"
        aria-labelledby=${
          this.heading.trim() && !this.hasHeadingSlot
            ? 'pond-panel-heading'
            : nothing
        }
      >
        <header part="header">
          <slot
            name="heading"
            @slotchange=${(e: Event) => this.#onNamedSlotChange('heading', e)}
            >${title}</slot
          >
          <div part="actions">
            <slot
              name="actions"
              @slotchange=${(e: Event) => this.#onNamedSlotChange('actions', e)}
            ></slot>
          </div>
        </header>
        <div part="body"><slot></slot></div>
        <footer part="footer">
          <slot
            name="footer"
            @slotchange=${(e: Event) => this.#onNamedSlotChange('footer', e)}
          ></slot>
        </footer>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-panel': PondPanel
  }
}
