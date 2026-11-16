import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import type { PondSpace } from '../shared/space.js'

export type PondInlineGap = PondSpace
export type PondInlineAlign = 'start' | 'center' | 'end' | 'baseline'
export type PondInlineJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'

/**
 * @summary Horizontal row with tokenized gap and optional wrap.
 * @status stable
 * @since 0.0.0
 *
 * Toolbars and chip rows. Prefer Stack for columns; Flex for reverse /
 * space-evenly; Grid for equal-width matrices.
 *
 * @slot — Row children (DOM order = tab order).
 * @csspart inline — The flex row container.
 */
@customElement('pond-inline')
export class PondInline extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="inline"] {
      display: flex;
      flex-direction: row;
      flex-wrap: var(--pond-inline-wrap, nowrap);
      align-items: var(--pond-inline-align, center);
      justify-content: var(--pond-inline-justify, flex-start);
      gap: var(--pond-inline-gap, var(--pond-space-2));
      margin: 0;
    }

    :host([appearance="plain"]) [part="inline"] {
      all: unset;
      display: contents;
    }

    :host([wrap]) {
      --pond-inline-wrap: wrap;
    }

    :host([gap="0"]) {
      --pond-inline-gap: 0;
    }
    :host([gap="1"]) {
      --pond-inline-gap: var(--pond-space-1);
    }
    :host([gap="2"]) {
      --pond-inline-gap: var(--pond-space-2);
    }
    :host([gap="3"]) {
      --pond-inline-gap: var(--pond-space-3);
    }
    :host([gap="4"]) {
      --pond-inline-gap: var(--pond-space-4);
    }
    :host([gap="5"]) {
      --pond-inline-gap: var(--pond-space-5);
    }
    :host([gap="6"]) {
      --pond-inline-gap: var(--pond-space-6);
    }
    :host([gap="8"]) {
      --pond-inline-gap: var(--pond-space-8);
    }
    :host([gap="10"]) {
      --pond-inline-gap: var(--pond-space-10);
    }
    :host([gap="12"]) {
      --pond-inline-gap: var(--pond-space-12);
    }

    :host([align="start"]) {
      --pond-inline-align: flex-start;
    }
    :host([align="center"]) {
      --pond-inline-align: center;
    }
    :host([align="end"]) {
      --pond-inline-align: flex-end;
    }
    :host([align="baseline"]) {
      --pond-inline-align: baseline;
    }

    :host([justify="start"]) {
      --pond-inline-justify: flex-start;
    }
    :host([justify="center"]) {
      --pond-inline-justify: center;
    }
    :host([justify="end"]) {
      --pond-inline-justify: flex-end;
    }
    :host([justify="between"]) {
      --pond-inline-justify: space-between;
    }
    :host([justify="around"]) {
      --pond-inline-justify: space-around;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  gap: PondInlineGap = '2'

  @property({ reflect: true })
  align: PondInlineAlign = 'center'

  @property({ reflect: true })
  justify: PondInlineJustify = 'start'

  /** Allow items to wrap onto new rows. */
  @property({ type: Boolean, reflect: true })
  wrap = false

  override render() {
    return html`<div part="inline"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-inline': PondInline
  }
}
