import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../calendar/pond-calendar.js'

/** @summary Combined date + time control. @status stable @since 0.0.0 @fires pond-change */
@customElement('pond-date-time-picker')
export class PondDateTimePicker extends LitElement {
  static override styles = css`
    :host {
      display: block;
      max-width: 18rem;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-3);
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
    }
    [part="label"] {
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-medium);
    }
    [part="time"] {
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: var(--pond-space-2) var(--pond-space-3);
      border: 1px solid var(--pond-color-border-strong);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: inherit;
      font: inherit;
    }
    [part="time"]:focus-visible {
      outline: var(--pond-focus-width) solid var(--pond-color-focus-ring);
      outline-offset: var(--pond-focus-offset);
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="label"],
    :host([appearance="plain"]) [part="time"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property() label = ''
  /** Combined value as YYYY-MM-DDTHH:mm */
  @property() value = ''
  get #date() {
    return this.value.includes('T')
      ? this.value.slice(0, 10)
      : this.value.slice(0, 10) || ''
  }
  get #time() {
    if (this.value.includes('T')) return this.value.slice(11, 16) || '00:00'
    return '00:00'
  }
  #emit(date: string, time: string) {
    this.value = date ? `${date}T${time || '00:00'}` : ''
    this.dispatchEvent(
      new CustomEvent('pond-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    )
  }
  override render() {
    return html`<div part="root">
      ${this.label ? html`<span part="label">${this.label}</span>` : nothing}
      <pond-calendar
        .value=${this.#date}
        @pond-change=${(e: CustomEvent<{ value: string }>) => this.#emit(e.detail.value, this.#time)}
      ></pond-calendar>
      <input part="time" type="time" .value=${this.#time} aria-label="Time"
        @change=${(e: Event) => this.#emit(this.#date, (e.target as HTMLInputElement).value)} />
    </div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-date-time-picker': PondDateTimePicker
  }
}
