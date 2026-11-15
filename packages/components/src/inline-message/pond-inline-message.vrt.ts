import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-inline-message.js'
import type { PondInlineMessage } from './pond-inline-message.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-inline-message visual', () => {
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
    const el = await fixture<PondInlineMessage>(
      html`<pond-inline-message tone="danger" title="Email">Enter a valid address.</pond-inline-message>`
    )
    await matchScreenshotAtViewports('inline-message-default', el)
  })
})
