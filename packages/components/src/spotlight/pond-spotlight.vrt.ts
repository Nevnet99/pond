import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-spotlight.js'
import type { PondSpotlight } from './pond-spotlight.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-spotlight visual', () => {
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
    const wrap = await fixture<HTMLDivElement>(html`
      <div style="min-height:14rem;width:20rem;position:relative">
        <pond-spotlight open heading="Create an issue" label="Tip" show-next>
          Start here when you want a new work item.
        </pond-spotlight>
      </div>
    `)
    const el = wrap.querySelector('pond-spotlight') as PondSpotlight
    await el.updateComplete
    await matchScreenshotAtViewports('spotlight-default', wrap)
  })
})
