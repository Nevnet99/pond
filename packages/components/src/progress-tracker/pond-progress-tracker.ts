import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondProgressTrackerStep = {
  label: string
  status?: 'todo' | 'current' | 'done'
}

/** @summary Labeled multi-step journey. @status stable @since 0.0.0 */
@customElement('pond-progress-tracker')
export class PondProgressTracker extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    [part="root"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
      font-family: var(--pond-font-family-sans);
      color: var(--pond-color-fg-default);
    }
    [part="step"] {
      display: flex;
      align-items: center;
      gap: var(--pond-space-2);
      font-size: var(--pond-font-size-sm);
    }
    [part="marker"] {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--pond-color-border-strong);
      font-size: var(--pond-font-size-xs);
    }
    [part="step"][data-status="done"] [part="marker"] {
      background: var(--pond-color-accent-default);
      border-color: transparent;
      color: var(--pond-color-fg-inverse, #fff);
    }
    [part="step"][data-status="current"] [part="marker"] {
      border-color: var(--pond-color-accent-default);
      font-weight: var(--pond-font-weight-semibold);
    }
    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="step"],
    :host([appearance="plain"]) [part="marker"] {
      all: unset;
    }
    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ type: Array }) steps: PondProgressTrackerStep[] = []
  @property() label = 'Progress'
  override render() {
    return html`<ol part="root" aria-label=${this.label}>
      ${this.steps.map((s, i) => {
        const status = s.status ?? (i === 0 ? 'current' : 'todo')
        return html`<li part="step" data-status=${status}>
          <span part="marker" aria-hidden="true">${status === 'done' ? '✓' : i + 1}</span>
          <span>${s.label}</span>
        </li>`
      })}
    </ol>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-progress-tracker': PondProgressTracker
  }
}
