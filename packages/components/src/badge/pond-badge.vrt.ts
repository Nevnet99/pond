import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-badge.js'
import type { PondBadge } from './pond-badge.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-badge visual', () => {
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
    const el = await fixture<PondBadge>(
      html`<pond-badge value="3"></pond-badge>`
    )
    await matchScreenshotAtViewports('badge-count', el)
  })
})
