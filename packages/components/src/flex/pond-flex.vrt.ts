import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-flex.js'
import type { PondFlex } from './pond-flex.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-flex visual', () => {
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
    const el = await fixture<PondFlex>(html`
      <pond-flex gap="3" justify="between" style="width:16rem">
        <span>Left</span><span>Right</span>
      </pond-flex>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('flex-default', el)
  })
})
