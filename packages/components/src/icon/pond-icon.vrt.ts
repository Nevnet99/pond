import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import '../inline/pond-inline.js'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-icon.js'
import type { PondIcon } from './pond-icon.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-icon visual', () => {
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
    const el = await fixture<HTMLElement>(
      html`<pond-inline gap="3" style="color:#111">
        <pond-icon name="check"></pond-icon>
        <pond-icon name="info"></pond-icon>
        <pond-icon name="warning"></pond-icon>
      </pond-inline>`
    )
    await matchScreenshotAtViewports('icon-row', el as unknown as PondIcon)
  })
})
