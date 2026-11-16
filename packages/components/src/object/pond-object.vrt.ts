import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-object.js'
import type { PondObject } from './pond-object.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-object visual', () => {
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
    const el = await fixture<PondObject>(html`
      <pond-object type="document" label="Document"></pond-object>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('object-default', el)
  })
})
