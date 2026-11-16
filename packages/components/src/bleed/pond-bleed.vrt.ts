import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-bleed.js'
import type { PondBleed } from './pond-bleed.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-bleed visual', () => {
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
    const el = await fixture<HTMLDivElement>(html`
      <div style="padding:1rem;width:12rem;border:1px solid #ccc">
        <pond-bleed inline="4">
          <div style="background:#e8eefc;padding:0.5rem">Bleed</div>
        </pond-bleed>
      </div>
    `)
    await (el.querySelector('pond-bleed') as PondBleed).updateComplete
    await matchScreenshotAtViewports('bleed-default', el)
  })
})
