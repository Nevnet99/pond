import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-section-message.js'
import type { PondSectionMessage } from './pond-section-message.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-section-message visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())
  it('matches info message at mobile / tablet / desktop', async () => {
    const el = await fixture<PondSectionMessage>(
      html`<pond-section-message title="Tip" style="width:320px">Fork before branding.</pond-section-message>`
    )
    await matchScreenshotAtViewports('section-message-info', el)
  })
})
