import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-text-area.js'
import type { PondTextArea } from './pond-text-area.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-text-area visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())

  it('matches default area at mobile / tablet / desktop', async () => {
    const el = await fixture<PondTextArea>(
      html`<pond-text-area label="Description" value="Ship the slice" style="width:320px"></pond-text-area>`
    )
    await matchScreenshotAtViewports('text-area-default', el)
  })
})
