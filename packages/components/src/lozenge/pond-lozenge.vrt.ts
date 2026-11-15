import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-lozenge.js'
import type { PondLozenge } from './pond-lozenge.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-lozenge visual', () => {
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
    const el = await fixture<PondLozenge>(
      html`<pond-lozenge tone="success">Done</pond-lozenge>`
    )
    await matchScreenshotAtViewports('lozenge-success', el)
  })
})
