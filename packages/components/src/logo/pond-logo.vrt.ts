import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-logo.js'
import type { PondLogo } from './pond-logo.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

const mark = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%23256EFF"/><text x="16" y="22" text-anchor="middle" font-size="14" font-family="sans-serif" fill="white">P</text></svg>`
)}`

describe('pond-logo visual', () => {
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
    const el = await fixture<PondLogo>(html`
      <pond-logo src=${mark} alt="">Pond</pond-logo>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('logo-default', el)
  })
})
