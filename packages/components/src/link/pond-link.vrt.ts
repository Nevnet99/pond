import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-link.js'
import type { PondLink } from './pond-link.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-link visual', () => {
  let link: HTMLLinkElement

  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    link.remove()
  })

  it('matches default link at mobile / tablet / desktop', async () => {
    const el = await fixture<PondLink>(
      html`<pond-link href="/docs">Read the docs</pond-link>`
    )
    await matchScreenshotAtViewports('link-default', el)
  })
})
