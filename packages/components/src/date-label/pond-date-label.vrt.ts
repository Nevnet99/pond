import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-date-label.js'
import type { PondDateLabel } from './pond-date-label.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-date-label visual', () => {
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
    const el = await fixture<PondDateLabel>(
      html`<pond-date-label value="2026-11-15"></pond-date-label>`
    )
    await matchScreenshotAtViewports('date-label-default', el)
  })
})
