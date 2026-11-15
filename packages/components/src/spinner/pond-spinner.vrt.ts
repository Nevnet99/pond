import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-spinner.js'
import type { PondSpinner } from './pond-spinner.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-spinner visual', () => {
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
    const el = await fixture<PondSpinner>(html`<pond-spinner></pond-spinner>`)
    await matchScreenshotAtViewports('spinner-md', el)
  })
})
