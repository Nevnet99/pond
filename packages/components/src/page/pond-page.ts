import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Page layout chrome — banner, navigation, header, main, panel.
 * @status stable
 * @since 0.0.0
 *
 * @slot banner — Full-width top region (e.g. Banner).
 * @slot navigation — Start column (e.g. Side nav).
 * @slot header — Top of the main column (e.g. Page header).
 * @slot panel — End column for contextual content.
 * @slot — Main page content.
 *
 * @csspart root — Outer shell.
 * @csspart banner — Banner region.
 * @csspart body — Nav + main + panel row.
 * @csspart navigation — Start aside.
 * @csspart main-column — Header + main stack.
 * @csspart header — Header region.
 * @csspart content — Main landmark.
 * @csspart panel — End aside.
 */
@customElement('pond-page')
export class PondPage extends LitElement {
  static override styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      min-height: 100%;
      container-type: inline-size;
      container-name: pond-page;
    }

    :host([appearance="plain"]) {
      display: contents;
      container-type: normal;
    }

    [part="root"] {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      min-height: inherit;
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
    }

    [part="banner"] {
      flex: none;
      min-width: 0;
    }

    [part="body"] {
      display: flex;
      flex: 1;
      min-height: 0;
      min-width: 0;
    }

    [part="navigation"] {
      box-sizing: border-box;
      flex: none;
      width: var(--pond-page-nav-width, 15rem);
      min-width: 0;
      border-inline-end: 1px solid var(--pond-color-border-default);
      background: var(--pond-color-bg-surface);
    }

    [part="main-column"] {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
    }

    [part="header"] {
      flex: none;
      min-width: 0;
      padding: var(--pond-space-4) var(--pond-space-6) 0;
    }

    [part="content"] {
      box-sizing: border-box;
      flex: 1;
      min-width: 0;
      padding: var(--pond-space-4) var(--pond-space-6) var(--pond-space-6);
    }

    [part="panel"] {
      box-sizing: border-box;
      flex: none;
      width: var(--pond-page-panel-width, 18rem);
      min-width: 0;
      border-inline-start: 1px solid var(--pond-color-border-default);
      background: var(--pond-color-bg-surface);
      padding: var(--pond-space-4);
    }

    /* Stack chrome on narrow pages (mobile). Tablet+ stays nav | main | panel. */
    @container pond-page (max-width: 599px) {
      [part="body"] {
        flex-direction: column;
      }

      [part="navigation"],
      [part="panel"] {
        width: auto;
        border-inline: none;
      }

      [part="navigation"] {
        border-block-end: 1px solid var(--pond-color-border-default);
      }

      [part="panel"] {
        border-block-start: 1px solid var(--pond-color-border-default);
      }
    }

    :host(:not([data-has-banner])) [part="banner"],
    :host(:not([data-has-navigation])) [part="navigation"],
    :host(:not([data-has-header])) [part="header"],
    :host(:not([data-has-panel])) [part="panel"] {
      display: none;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="banner"],
    :host([appearance="plain"]) [part="body"],
    :host([appearance="plain"]) [part="navigation"],
    :host([appearance="plain"]) [part="main-column"],
    :host([appearance="plain"]) [part="header"],
    :host([appearance="plain"]) [part="content"],
    :host([appearance="plain"]) [part="panel"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="body"],
    :host([appearance="plain"]) [part="main-column"] {
      display: contents;
    }
  `

  /** Visual presentation. `plain` strips Pond layout/visual CSS. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @state() private hasBanner = false
  @state() private hasNavigation = false
  @state() private hasHeader = false
  @state() private hasPanel = false

  #onSlotChange(slotName: string, event: Event) {
    const slot = event.target as HTMLSlotElement
    const assigned = slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return true
      return (node.textContent ?? '').trim().length > 0
    })
    switch (slotName) {
      case 'banner':
        this.hasBanner = assigned
        break
      case 'navigation':
        this.hasNavigation = assigned
        break
      case 'header':
        this.hasHeader = assigned
        break
      case 'panel':
        this.hasPanel = assigned
        break
      default:
        break
    }
  }

  protected override updated(): void {
    this.toggleAttribute('data-has-banner', this.hasBanner)
    this.toggleAttribute('data-has-navigation', this.hasNavigation)
    this.toggleAttribute('data-has-header', this.hasHeader)
    this.toggleAttribute('data-has-panel', this.hasPanel)
  }

  override render() {
    return html`
      <div part="root">
        <div part="banner">
          <slot
            name="banner"
            @slotchange=${(e: Event) => this.#onSlotChange('banner', e)}
          ></slot>
        </div>
        <div part="body">
          <aside part="navigation">
            <slot
              name="navigation"
              @slotchange=${(e: Event) => this.#onSlotChange('navigation', e)}
            ></slot>
          </aside>
          <div part="main-column">
            <div part="header">
              <slot
                name="header"
                @slotchange=${(e: Event) => this.#onSlotChange('header', e)}
              ></slot>
            </div>
            <main part="content"><slot></slot></main>
          </div>
          <aside part="panel">
            <slot
              name="panel"
              @slotchange=${(e: Event) => this.#onSlotChange('panel', e)}
            ></slot>
          </aside>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-page': PondPage
  }
}
