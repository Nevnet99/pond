import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-range.js'
import type { PondRange } from './pond-range.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-range visual', () => {
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
    const el = await fixture<PondRange>(
      html`<pond-range label="Volume" style="width:16rem" .value=${65}></pond-range>`
    )
    await matchScreenshotAtViewports('range-default', el)
  })
})
