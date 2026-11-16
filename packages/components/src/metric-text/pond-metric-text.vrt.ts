import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-metric-text.js'
import type { PondMetricText } from './pond-metric-text.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-metric-text visual', () => {
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
    const el = await fixture<PondMetricText>(html`
      <pond-metric-text>48</pond-metric-text>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('metric-text-default', el)
  })
})
