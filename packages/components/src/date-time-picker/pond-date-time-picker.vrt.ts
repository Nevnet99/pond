import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-date-time-picker.js'
import type { PondDateTimePicker } from './pond-date-time-picker.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-date-time-picker visual', () => {
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
    const el = await fixture<PondDateTimePicker>(
      html`<pond-date-time-picker label="When" value="2026-11-15T14:30"></pond-date-time-picker>`
    )
    await matchScreenshotAtViewports('date-time-picker-default', el)
  })
})
