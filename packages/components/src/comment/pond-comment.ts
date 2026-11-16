import { css, html, LitElement, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { PondAppearance } from '../shared/appearance.js'
import '../avatar/pond-avatar.js'

/**
 * @summary Single discussion item — avatar, author/meta, body, optional actions.
 * @status stable
 * @since 0.0.0
 *
 * @slot avatar — Overrides default Avatar.
 * @slot actions — Footer actions.
 * @slot — Comment body.
 *
 * @csspart root — Article shell.
 * @csspart header — Avatar + author row.
 * @csspart author — Author name.
 * @csspart meta — Timestamp / meta.
 * @csspart body — Body region.
 * @csspart actions — Actions row.
 */
@customElement('pond-comment')
export class PondComment extends LitElement {
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
      box-sizing: border-box;
      padding: var(--pond-space-3);
      border: 1px solid var(--pond-color-border-default);
      border-radius: var(--pond-radius-md);
      background: var(--pond-color-bg-canvas);
      color: var(--pond-color-fg-default);
      font-family: var(--pond-font-family-sans);
    }

    [part="header"] {
      display: flex;
      align-items: center;
      gap: var(--pond-space-3);
      min-width: 0;
    }

    [part="identity"] {
      display: flex;
      flex-direction: column;
      gap: var(--pond-space-1);
      min-width: 0;
    }

    [part="author"] {
      margin: 0;
      font-size: var(--pond-font-size-sm);
      font-weight: var(--pond-font-weight-semibold);
    }

    [part="meta"] {
      margin: 0;
      font-size: var(--pond-font-size-xs);
      color: var(--pond-color-fg-muted);
    }

    [part="body"] {
      margin: 0;
      font-size: var(--pond-font-size-sm);
      line-height: var(--pond-font-line-normal, 1.5);
    }

    [part="actions"] {
      display: flex;
      flex-wrap: wrap;
      gap: var(--pond-space-2);
    }

    :host(:not([data-has-actions])) [part="actions"] {
      display: none;
    }

    :host([appearance="plain"]) [part="root"],
    :host([appearance="plain"]) [part="header"],
    :host([appearance="plain"]) [part="identity"],
    :host([appearance="plain"]) [part="author"],
    :host([appearance="plain"]) [part="meta"],
    :host([appearance="plain"]) [part="body"],
    :host([appearance="plain"]) [part="actions"] {
      all: unset;
    }

    :host([appearance="plain"]) [part="root"] {
      display: contents;
    }
  `

  /** Visual reset — `plain` strips Pond chrome. */
  @property({ reflect: true })
  appearance: PondAppearance = 'default'

  /** Visible author name shown in the header. */
  @property()
  author = ''

  /** Timestamp or secondary meta line under the author. */
  @property()
  meta = ''

  /** Initials for the default Avatar; falls back to first two chars of `author`. */
  @property({ attribute: 'avatar-initials' })
  avatarInitials = ''

  #onActionsSlot = (event: Event) => {
    const slot = event.target as HTMLSlotElement
    const has = slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return true
      return (node.textContent ?? '').trim().length > 0
    })
    this.toggleAttribute('data-has-actions', has)
  }

  override render() {
    return html`
      <article part="root">
        <header part="header">
          <slot name="avatar">
            <pond-avatar
              initials=${this.avatarInitials || this.author.slice(0, 2)}
            ></pond-avatar>
          </slot>
          <div part="identity">
            ${this.author ? html`<p part="author">${this.author}</p>` : nothing}
            ${this.meta ? html`<p part="meta">${this.meta}</p>` : nothing}
          </div>
        </header>
        <div part="body"><slot></slot></div>
        <div part="actions">
          <slot name="actions" @slotchange=${this.#onActionsSlot}></slot>
        </div>
      </article>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pond-comment': PondComment
  }
}
