import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-image.js'
import type { PondImage } from './pond-image.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

describe('pond-image visual', () => {
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
    const el = await fixture<PondImage>(html`
      <pond-image
        src=${PIXEL}
        alt="Swatch"
        caption="Sample"
        style="width:8rem;min-height:4rem;background:var(--pond-color-bg-subtle)"
      ></pond-image>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('image-default', el)
  })
})
