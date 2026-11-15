import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-toggle.js'
import type { PondToggle } from './pond-toggle.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-toggle visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())
  it('matches on toggle at mobile / tablet / desktop', async () => {
    const el = await fixture<PondToggle>(
      html`<pond-toggle label="Notifications" checked></pond-toggle>`
    )
    await matchScreenshotAtViewports('toggle-on', el)
  })
})
