import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-progress-indicator.js'
import type { PondProgressIndicator } from './pond-progress-indicator.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-progress-indicator visual', () => {
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
    const el = await fixture<PondProgressIndicator>(
      html`<pond-progress-indicator .steps=${4} .selected=${1}></pond-progress-indicator>`
    )
    await matchScreenshotAtViewports('progress-indicator-default', el)
  })
})
