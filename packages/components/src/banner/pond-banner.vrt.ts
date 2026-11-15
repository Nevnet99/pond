import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-banner.js'
import type { PondBanner } from './pond-banner.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-banner visual', () => {
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
    const el = await fixture<PondBanner>(
      html`<pond-banner closable style="width:24rem">Maintenance window starts at 18:00 UTC.</pond-banner>`
    )
    await matchScreenshotAtViewports('banner-default', el)
  })
})
