import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import type { PondSpace } from '../shared/space.js'

export type PondBleedSpace = PondSpace

/**
 * @summary Negative-margin layout helper.
 * @status stable
 * @since 0.0.0
 *
 * @csspart root — Bleed wrapper.
 */
@customElement('pond-bleed')
export class PondBleed extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }

    :host([appearance="plain"]) {
      display: contents;
    }

    [part="root"] {
      margin-block: var(--pond-bleed-block, 0);
      margin-inline: var(--pond-bleed-inline, 0);
    }

    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }

    :host([all="1"]) {
      --pond-bleed-block: calc(var(--pond-space-1) * -1);
      --pond-bleed-inline: calc(var(--pond-space-1) * -1);
    }
    :host([all="2"]) {
      --pond-bleed-block: calc(var(--pond-space-2) * -1);
      --pond-bleed-inline: calc(var(--pond-space-2) * -1);
    }
    :host([all="3"]) {
      --pond-bleed-block: calc(var(--pond-space-3) * -1);
      --pond-bleed-inline: calc(var(--pond-space-3) * -1);
    }
    :host([all="4"]) {
      --pond-bleed-block: calc(var(--pond-space-4) * -1);
      --pond-bleed-inline: calc(var(--pond-space-4) * -1);
    }
    :host([all="5"]) {
      --pond-bleed-block: calc(var(--pond-space-5) * -1);
      --pond-bleed-inline: calc(var(--pond-space-5) * -1);
    }
    :host([all="6"]) {
      --pond-bleed-block: calc(var(--pond-space-6) * -1);
      --pond-bleed-inline: calc(var(--pond-space-6) * -1);
    }

    :host([inline="1"]) {
      --pond-bleed-inline: calc(var(--pond-space-1) * -1);
    }
    :host([inline="2"]) {
      --pond-bleed-inline: calc(var(--pond-space-2) * -1);
    }
    :host([inline="3"]) {
      --pond-bleed-inline: calc(var(--pond-space-3) * -1);
    }
    :host([inline="4"]) {
      --pond-bleed-inline: calc(var(--pond-space-4) * -1);
    }
    :host([inline="5"]) {
      --pond-bleed-inline: calc(var(--pond-space-5) * -1);
    }
    :host([inline="6"]) {
      --pond-bleed-inline: calc(var(--pond-space-6) * -1);
    }

    :host([block="1"]) {
      --pond-bleed-block: calc(var(--pond-space-1) * -1);
    }
    :host([block="2"]) {
      --pond-bleed-block: calc(var(--pond-space-2) * -1);
    }
    :host([block="3"]) {
      --pond-bleed-block: calc(var(--pond-space-3) * -1);
    }
    :host([block="4"]) {
      --pond-bleed-block: calc(var(--pond-space-4) * -1);
    }
    :host([block="5"]) {
      --pond-bleed-block: calc(var(--pond-space-5) * -1);
    }
    :host([block="6"]) {
      --pond-bleed-block: calc(var(--pond-space-6) * -1);
    }
  `

  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Bleed on every side. */
  @property({ reflect: true })
  all: PondBleedSpace | '' = ''

  /** Bleed on inline axis. */
  @property({ reflect: true })
  inline: PondBleedSpace | '' = ''

  /** Bleed on block axis. */
  @property({ reflect: true })
  block: PondBleedSpace | '' = ''

  override render() {
    return html`<div part="root"><slot></slot></div>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-bleed': PondBleed
  }
}
