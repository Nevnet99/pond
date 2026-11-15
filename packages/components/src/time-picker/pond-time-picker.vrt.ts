import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-time-picker.js'
import type { PondTimePicker } from './pond-time-picker.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-time-picker visual', () => {
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
    const el = await fixture<PondTimePicker>(html`
      <pond-time-picker label="Start" value="09:30"></pond-time-picker>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('time-picker-default', el)
  })
})
