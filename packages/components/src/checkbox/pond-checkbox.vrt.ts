import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-checkbox.js'
import type { PondCheckbox } from './pond-checkbox.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-checkbox visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())
  it('matches checked checkbox at mobile / tablet / desktop', async () => {
    const el = await fixture<PondCheckbox>(
      html`<pond-checkbox label="Accept terms" checked></pond-checkbox>`
    )
    await matchScreenshotAtViewports('checkbox-checked', el)
  })
})
