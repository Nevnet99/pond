import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-select.js'
import type { PondSelect } from './pond-select.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-select visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())
  it('matches select at mobile / tablet / desktop', async () => {
    const el = await fixture<PondSelect>(
      html`<pond-select label="Size" value="m" style="width:220px" .options=${[{ value: 's', label: 'Small' }, { value: 'm', label: 'Medium' }]}></pond-select>`
    )
    await matchScreenshotAtViewports('select-default', el)
  })
})
