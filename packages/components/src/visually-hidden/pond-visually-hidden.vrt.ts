import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-visually-hidden.js'
import type { PondVisuallyHidden } from './pond-visually-hidden.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-visually-hidden visual', () => {
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
    const el = await fixture<PondVisuallyHidden>(
      html`<div style="padding:1rem;font-family:sans-serif">
        Visible
        <pond-visually-hidden>SR only</pond-visually-hidden>
      </div>`
    )
    await matchScreenshotAtViewports('visually-hidden-default', el)
  })
})
