import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-calendar.js'
import type { PondCalendar } from './pond-calendar.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-calendar visual', () => {
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
    const el = await fixture<PondCalendar>(
      html`<pond-calendar value="2026-11-15"></pond-calendar>`
    )
    await matchScreenshotAtViewports('calendar-default', el)
  })
})
