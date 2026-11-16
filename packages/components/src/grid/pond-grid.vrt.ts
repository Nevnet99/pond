import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-grid.js'
import type { PondGrid } from './pond-grid.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-grid visual', () => {
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
    const el = await fixture<PondGrid>(html`
      <pond-grid columns="3" gap="3" style="width:16rem">
        <span>A</span><span>B</span><span>C</span>
      </pond-grid>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('grid-default', el)
  })
})
