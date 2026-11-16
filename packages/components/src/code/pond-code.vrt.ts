import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-code.js'
import type { PondCode } from './pond-code.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-code visual', () => {
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
    const el = await fixture<PondCode>(
      html`<p style="font-family:sans-serif">Run <pond-code>pnpm install</pond-code></p>`
    )
    await matchScreenshotAtViewports('code-default', el)
  })
})
