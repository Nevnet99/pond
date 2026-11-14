import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-box.js'
import type { PondBox } from './pond-box.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-box visual', () => {
  let link: HTMLLinkElement

  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    link.remove()
  })

  it('matches surface box at mobile / tablet / desktop', async () => {
    const el = await fixture<PondBox>(
      html`<pond-box padding="4" background="surface">Box content</pond-box>`
    )
    await matchScreenshotAtViewports('box-surface', el)
  })
})
