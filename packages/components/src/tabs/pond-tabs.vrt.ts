import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-tabs.js'
import type { PondTabs } from './pond-tabs.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-tabs visual', () => {
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
    const el = await fixture<PondTabs>(
      html`<pond-tabs
        selected="overview"
        .items=${[
          { value: 'overview', label: 'Overview' },
          { value: 'usage', label: 'Usage' }
        ]}
        style="width:20rem"
      >
        <p slot="overview">Overview content</p>
        <p slot="usage">Usage content</p>
      </pond-tabs>`
    )
    await matchScreenshotAtViewports('tabs-default', el)
  })
})
