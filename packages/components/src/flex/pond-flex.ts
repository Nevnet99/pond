import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import type { PondSpace } from '../shared/space.js'

export type PondFlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
export type PondFlexAlign = 'stretch' | 'start' | 'center' | 'end' | 'baseline'
export type PondFlexJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
export type PondFlexGap = PondSpace

/**
 * @summary Flexbox layout primitive.
 * @status stable
 * @since 0.0.0
 *
 * Prefer Stack / Inline when they fit; Grid for equal columns; Box for surface.
 *
 * @csspart root — Flex container.
 */
@customElement('pond-flex')
export class PondFlex extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      display: flex;
      flex-direction: var(--pond-flex-direction, row);
      flex-wrap: var(--pond-flex-wrap, nowrap);
      align-items: var(--pond-flex-align, stretch);
      justify-content: var(--pond-flex-justify, flex-start);
      gap: var(--pond-flex-gap, var(--pond-space-2));
      margin: 0;
    }

    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }

    :host([direction="row"]) {
      --pond-flex-direction: row;
    }
    :host([direction="column"]) {
      --pond-flex-direction: column;
    }
    :host([direction="row-reverse"]) {
      --pond-flex-direction: row-reverse;
    }
    :host([direction="column-reverse"]) {
      --pond-flex-direction: column-reverse;
    }

    :host([wrap]) {
      --pond-flex-wrap: wrap;
    }

    :host([align="stretch"]) {
      --pond-flex-align: stretch;
    }
    :host([align="start"]) {
      --pond-flex-align: flex-start;
    }
    :host([align="center"]) {
      --pond-flex-align: center;
    }
    :host([align="end"]) {
      --pond-flex-align: flex-end;
    }
    :host([align="baseline"]) {
      --pond-flex-align: baseline;
    }

    :host([justify="start"]) {
      --pond-flex-justify: flex-start;
    }
    :host([justify="center"]) {
      --pond-flex-justify: center;
    }
    :host([justify="end"]) {
      --pond-flex-justify: flex-end;
    }
    :host([justify="between"]) {
      --pond-flex-justify: space-between;
    }
    :host([justify="around"]) {
      --pond-flex-justify: space-around;
    }
    :host([justify="evenly"]) {
      --pond-flex-justify: space-evenly;
    }

    :host([gap="0"]) {
      --pond-flex-gap: 0;
    }
    :host([gap="1"]) {
      --pond-flex-gap: var(--pond-space-1);
    }
    :host([gap="2"]) {
      --pond-flex-gap: var(--pond-space-2);
    }
    :host([gap="3"]) {
      --pond-flex-gap: var(--pond-space-3);
    }
    :host([gap="4"]) {
      --pond-flex-gap: var(--pond-space-4);
    }
    :host([gap="5"]) {
      --pond-flex-gap: var(--pond-space-5);
    }
    :host([gap="6"]) {
      --pond-flex-gap: var(--pond-space-6);
    }
    :host([gap="8"]) {
      --pond-flex-gap: var(--pond-space-8);
    }
    :host([gap="10"]) {
      --pond-flex-gap: var(--pond-space-10);
    }
    :host([gap="12"]) {
      --pond-flex-gap: var(--pond-space-12);
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  @property({ reflect: true })
  direction: PondFlexDirection = 'row'

  @property({ type: Boolean, reflect: true })
  wrap = false

  @property({ reflect: true })
  align: PondFlexAlign = 'stretch'

  @property({ reflect: true })
  justify: PondFlexJustify = 'start'

  @property({ reflect: true })
  gap: PondFlexGap = '2'

  override render() {
    return html`<div part="root"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-flex': PondFlex
  }
}
