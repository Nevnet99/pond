import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-panel.js'
import type { PondPanel } from './pond-panel.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-panel visual', () => {
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
    const el = await fixture<PondPanel>(html`
      <pond-panel
        heading="Details"
        style="width:18rem;min-height:12rem;padding:1rem;border:1px solid var(--pond-color-border-default);background:var(--pond-color-bg-surface)"
      >
        <button slot="actions" type="button">Edit</button>
        <p>Contextual side content</p>
        <div slot="footer">Footer</div>
      </pond-panel>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    await matchScreenshotAtViewports('panel-default', el)
  })
})
