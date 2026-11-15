import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-empty-state.js'
import type { PondEmptyState } from './pond-empty-state.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-empty-state visual', () => {
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
    const el = await fixture<PondEmptyState>(
      html`<pond-empty-state heading="No projects" style="width:24rem">Create one to start.</pond-empty-state>`
    )
    await matchScreenshotAtViewports('empty-state-default', el)
  })
})
