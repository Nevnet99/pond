import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import type { PondSpace } from '../shared/space.js'

export type PondBoxPadding = PondSpace
export type PondBoxBackground = 'transparent' | 'canvas' | 'surface' | 'subtle'

/**
 * @summary Generic layout box with padding and background tokens.
 * @status stable
 * @since 0.0.0
 *
 * @csspart box — The inner layout element.
 */
@customElement('pond-box')
export class PondBox extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance='plain']) {
      display: contents;
    }

    [part='box'] {
      box-sizing: border-box;
      display: block;
      margin: 0;
      padding: var(--pond-box-padding, 0);
      background: var(--pond-box-bg, transparent);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
      border-radius: var(--pond-radius-md);
    }

    :host([appearance='plain']) [part='box'] {
      all: unset;
      display: contents;
    }

    :host([padding='0']) {
      --pond-box-padding: 0;
    }
    :host([padding='1']) {
      --pond-box-padding: var(--pond-space-1);
    }
    :host([padding='2']) {
      --pond-box-padding: var(--pond-space-2);
    }
    :host([padding='3']) {
      --pond-box-padding: var(--pond-space-3);
    }
    :host([padding='4']) {
      --pond-box-padding: var(--pond-space-4);
    }
    :host([padding='6']) {
      --pond-box-padding: var(--pond-space-6);
    }
    :host([padding='8']) {
      --pond-box-padding: var(--pond-space-8);
    }

    :host([background='transparent']) {
      --pond-box-bg: transparent;
    }
    :host([background='canvas']) {
      --pond-box-bg: var(--pond-color-bg-canvas);
    }
    :host([background='surface']) {
      --pond-box-bg: var(--pond-color-bg-surface);
    }
    :host([background='subtle']) {
      --pond-box-bg: var(--pond-color-bg-subtle);
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Uniform padding from the space scale. */
  @property({ reflect: true })
  padding: PondBoxPadding = '0'

  /** Background token. */
  @property({ reflect: true })
  background: PondBoxBackground = 'transparent'

  override render() {
    return html`<div part="box"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-box': PondBox
  }
}
