import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import type { PondSpace } from '../shared/space.js'

export type PondStackGap = PondSpace
export type PondStackAlign = 'stretch' | 'start' | 'center' | 'end'

/**
 * @summary Vertical stack with tokenized gap.
 * @status stable
 * @since 0.0.0
 *
 * @csspart stack — The flex column container.
 */
@customElement('pond-stack')
export class PondStack extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="stack"] {
      display: flex;
      flex-direction: column;
      align-items: var(--pond-stack-align, stretch);
      gap: var(--pond-stack-gap, var(--pond-space-4));
      margin: 0;
    }

    :host([appearance="plain"]) [part="stack"] {
      all: unset;
      display: contents;
    }

    :host([gap="0"]) {
      --pond-stack-gap: 0;
    }
    :host([gap="1"]) {
      --pond-stack-gap: var(--pond-space-1);
    }
    :host([gap="2"]) {
      --pond-stack-gap: var(--pond-space-2);
    }
    :host([gap="3"]) {
      --pond-stack-gap: var(--pond-space-3);
    }
    :host([gap="4"]) {
      --pond-stack-gap: var(--pond-space-4);
    }
    :host([gap="6"]) {
      --pond-stack-gap: var(--pond-space-6);
    }
    :host([gap="8"]) {
      --pond-stack-gap: var(--pond-space-8);
    }

    :host([align="stretch"]) {
      --pond-stack-align: stretch;
    }
    :host([align="start"]) {
      --pond-stack-align: flex-start;
    }
    :host([align="center"]) {
      --pond-stack-align: center;
    }
    :host([align="end"]) {
      --pond-stack-align: flex-end;
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Gap between children. */
  @property({ reflect: true })
  gap: PondStackGap = '4'

  /** Cross-axis alignment. */
  @property({ reflect: true })
  align: PondStackAlign = 'stretch'

  override render() {
    return html`<div part="stack"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-stack': PondStack
  }
}
