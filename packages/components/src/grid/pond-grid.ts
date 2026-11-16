import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import type { PondSpace } from '../shared/space.js'

export type PondGridGap = PondSpace

/**
 * @summary CSS grid layout primitive.
 * @status stable
 * @since 0.0.0
 *
 * Equal-width columns for tile grids and field matrices. Prefer Stack for
 * linear reading; Inline for a single toolbar row.
 *
 * @slot — Grid children.
 * @csspart root — Grid container.
 */
@customElement('pond-grid')
export class PondGrid extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: grid;
      grid-template-columns: var(--pond-grid-columns, 1fr);
      gap: var(--pond-grid-gap, var(--pond-space-4));
      align-items: var(--pond-grid-align, stretch);
      margin: 0;
    }

    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }

    :host([columns="1"]) {
      --pond-grid-columns: 1fr;
    }
    :host([columns="2"]) {
      --pond-grid-columns: repeat(2, minmax(0, 1fr));
    }
    :host([columns="3"]) {
      --pond-grid-columns: repeat(3, minmax(0, 1fr));
    }
    :host([columns="4"]) {
      --pond-grid-columns: repeat(4, minmax(0, 1fr));
    }
    :host([columns="6"]) {
      --pond-grid-columns: repeat(6, minmax(0, 1fr));
    }
    :host([columns="12"]) {
      --pond-grid-columns: repeat(12, minmax(0, 1fr));
    }

    :host([align="stretch"]) {
      --pond-grid-align: stretch;
    }
    :host([align="start"]) {
      --pond-grid-align: start;
    }
    :host([align="center"]) {
      --pond-grid-align: center;
    }
    :host([align="end"]) {
      --pond-grid-align: end;
    }

    :host([gap="0"]) {
      --pond-grid-gap: 0;
    }
    :host([gap="1"]) {
      --pond-grid-gap: var(--pond-space-1);
    }
    :host([gap="2"]) {
      --pond-grid-gap: var(--pond-space-2);
    }
    :host([gap="3"]) {
      --pond-grid-gap: var(--pond-space-3);
    }
    :host([gap="4"]) {
      --pond-grid-gap: var(--pond-space-4);
    }
    :host([gap="5"]) {
      --pond-grid-gap: var(--pond-space-5);
    }
    :host([gap="6"]) {
      --pond-grid-gap: var(--pond-space-6);
    }
    :host([gap="8"]) {
      --pond-grid-gap: var(--pond-space-8);
    }
    :host([gap="10"]) {
      --pond-grid-gap: var(--pond-space-10);
    }
    :host([gap="12"]) {
      --pond-grid-gap: var(--pond-space-12);
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Equal-width column count (1–4, 6, or 12). Use CSS `--pond-grid-columns` for custom tracks. */
  @property({ reflect: true })
  columns: '1' | '2' | '3' | '4' | '6' | '12' = '1'

  @property({ reflect: true })
  gap: PondGridGap = '4'

  @property({ reflect: true })
  align: 'stretch' | 'start' | 'center' | 'end' = 'stretch'

  override render() {
    return html`<div part="root"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-grid': PondGrid
  }
}
