import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-progress-bar.js'
import type { PondProgressBar } from './pond-progress-bar.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-progress-bar visual', () => {
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
    const el = await fixture<PondProgressBar>(
      html`<pond-progress-bar style="width:16rem" .value=${0.65}></pond-progress-bar>`
    )
    await matchScreenshotAtViewports('progress-bar-default', el)
  })
  it('matches indeterminate at mobile / tablet / desktop', async () => {
    const el = await fixture<PondProgressBar>(
      html`<pond-progress-bar style="width:16rem" indeterminate></pond-progress-bar>`
    )
    await matchScreenshotAtViewports('progress-bar-indeterminate', el)
  })
})
