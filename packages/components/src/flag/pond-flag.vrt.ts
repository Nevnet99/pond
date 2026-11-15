import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-flag.js'
import type { PondFlag } from './pond-flag.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-flag visual', () => {
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
    const el = await fixture<PondFlag>(
      html`<pond-flag title="Saved" tone="success">Project settings updated.</pond-flag>`
    )
    await matchScreenshotAtViewports('flag-success', el)
  })
})
