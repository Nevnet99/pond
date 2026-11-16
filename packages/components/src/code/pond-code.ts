import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondCodeVariant = 'inline' | 'block'

/**
 * @summary Code snippet — inline or simple block; no highlighter.
 * @status stable
 * @since 0.0.0
 *
 * @slot — Snippet text.
 * @csspart root — Native `code` (inline) or `pre` (block).
 */
@customElement('pond-code')
export class PondCode extends LitElement {
  static override styles = css`
    :host {
      display: inline;
    }
    :host([variant="block"]) {
      display: block;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      font-family: var(
        --pond-font-family-mono,
        ui-monospace,
        SFMono-Regular,
        Menlo,
        monospace
      );
      font-size: 0.9em;
      color: var(--pond-color-fg-default);
      background: var(--pond-color-bg-subtle, #f0f0f0);
      border-radius: var(--pond-radius-sm);
      padding: 0.1em 0.35em;
    }
    :host([variant="block"]) [part="root"] {
      display: block;
      padding: var(--pond-space-3);
      overflow: auto;
      white-space: pre;
      line-height: var(--pond-font-line-normal);
    }
    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
  `
  /** Visual reset — `plain` strips Pond chrome; consumer owns surface/contrast. */
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  /** `inline` uses `<code>`; `block` uses `<pre><code>` for whitespace. */
  @property({ reflect: true }) variant: PondCodeVariant = 'inline'
  override render() {
    return this.variant === 'block'
      ? html`<pre part="root"><code><slot></slot></code></pre>`
      : html`<code part="root"><slot></slot></code>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-code': PondCode
  }
}
