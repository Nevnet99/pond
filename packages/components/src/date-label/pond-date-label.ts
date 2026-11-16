import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

/**
 * @summary Non-interactive formatted date via native `<time>`.
 * @status stable
 * @since 0.0.0
 *
 * @csspart root — Native `<time>` element.
 */
@customElement('pond-date-label')
export class PondDateLabel extends LitElement {
  static override styles = css`
    :host {
      display: inline;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      font-family: var(--pond-font-family-sans);
      font-size: var(--pond-font-size-sm);
      color: var(--pond-color-fg-default);
    }
    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
  `
  /** Visual reset — `plain` strips Pond type chrome. */
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  /** ISO date `YYYY-MM-DD`; sets `<time datetime>` and locale-formatted text. */
  @property() value = ''
  override render() {
    let text = this.value
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(this.value)
    if (m) {
      const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
      text = d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
    return html`<time part="root" datetime=${this.value || undefined}>${text}</time>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-date-label': PondDateLabel
  }
}
