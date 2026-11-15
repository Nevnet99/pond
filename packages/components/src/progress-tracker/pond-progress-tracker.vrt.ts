import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-progress-tracker.js'
import type { PondProgressTracker } from './pond-progress-tracker.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-progress-tracker visual', () => {
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
    const el = await fixture<PondProgressTracker>(
      html`<pond-progress-tracker .steps=${[
        { label: 'Details', status: 'done' },
        { label: 'Review', status: 'current' },
        { label: 'Confirm', status: 'todo' }
      ]}></pond-progress-tracker>`
    )
    await matchScreenshotAtViewports('progress-tracker-default', el)
  })
})
