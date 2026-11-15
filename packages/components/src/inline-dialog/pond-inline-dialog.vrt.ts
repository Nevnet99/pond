import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-inline-dialog.js'
import type { PondInlineDialog } from './pond-inline-dialog.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-inline-dialog visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())

  it('matches at mobile / tablet / desktop', async () => {
    const el = await fixture<PondInlineDialog>(html`
      <div style="min-height:10rem;padding:1rem">
        <pond-inline-dialog open heading="Share">
          <button type="button" slot="trigger">Share</button>
          Anyone with the link can view.
          <button type="button" slot="actions">Copy link</button>
        </pond-inline-dialog>
      </div>
    `)
    const dialog = el.querySelector('pond-inline-dialog') as PondInlineDialog
    await dialog.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    ;(dialog.shadowRoot?.activeElement as HTMLElement | null)?.blur()
    await matchScreenshotAtViewports('inline-dialog-default', el)
  })
})
