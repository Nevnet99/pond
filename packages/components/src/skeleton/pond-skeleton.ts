import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'

export type PondSkeletonShape = 'text' | 'circle' | 'rect'

/** @summary Content placeholder while loading. @status stable @since 0.0.0 */
@customElement('pond-skeleton')
export class PondSkeleton extends LitElement {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      min-width: 4rem;
      box-sizing: border-box;
    }
    :host([appearance="plain"]) {
      display: contents;
    }
    :host([shape="circle"]) {
      width: var(--pond-skeleton-size, 2.5rem);
      min-width: var(--pond-skeleton-size, 2.5rem);
    }
    [part="root"] {
      display: block;
      width: 100%;
      height: var(--pond-skeleton-height, 1.125rem);
      border-radius: var(--pond-radius-sm);
      background: linear-gradient(
        90deg,
        var(--pond-color-bg-subtle, #e8e8e8) 0%,
        var(--pond-color-border-default) 50%,
        var(--pond-color-bg-subtle, #e8e8e8) 100%
      );
      background-size: 200% 100%;
      animation: pond-skeleton-shimmer var(--pond-motion-duration-slow, 900ms)
        ease-in-out infinite;
    }
    :host([shape="circle"]) [part="root"] {
      width: var(--pond-skeleton-size, 2.5rem);
      height: var(--pond-skeleton-size, 2.5rem);
      border-radius: 50%;
    }
    :host([shape="rect"]) [part="root"] {
      height: var(--pond-skeleton-height, 6rem);
      border-radius: var(--pond-radius-md);
    }
    @keyframes pond-skeleton-shimmer {
      0% {
        background-position: 100% 0;
      }
      100% {
        background-position: -100% 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      [part="root"] {
        animation: none;
      }
    }
    :host([appearance="plain"]) [part="root"] {
      all: unset;
      display: contents;
    }
  `
  @property({ reflect: true }) appearance: PondAppearance = 'default'
  @property({ reflect: true }) shape: PondSkeletonShape = 'text'
  override render() {
    return html`<div part="root" aria-hidden="true"></div>`
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'pond-skeleton': PondSkeleton
  }
}
