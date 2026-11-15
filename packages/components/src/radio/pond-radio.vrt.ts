import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-radio.js'
import type { PondRadio } from './pond-radio.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-radio visual', () => {
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
    const el = await fixture<PondRadio>(html`<pond-radio label="Size" value="m"
      .options=${[{ value: 's', label: 'Small' }, { value: 'm', label: 'Medium' }]}></pond-radio>`)
    await matchScreenshotAtViewports('radio-default', el)
  })
})
