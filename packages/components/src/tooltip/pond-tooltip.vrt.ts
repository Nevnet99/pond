import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-tooltip.js'
import type { PondTooltip } from './pond-tooltip.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-tooltip visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())
  it('matches open tooltip at mobile / tablet / desktop', async () => {
    const el = await fixture<PondTooltip>(
      html`<pond-tooltip content="Helpful tip"><button type="button">Info</button></pond-tooltip>`
    )
    el.shadowRoot
      ?.querySelector('[part="trigger"]')
      ?.dispatchEvent(new Event('focusin'))
    await el.updateComplete
    await matchScreenshotAtViewports('tooltip-open', el)
  })
})
