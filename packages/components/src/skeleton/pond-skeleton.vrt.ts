import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-skeleton.js'
import type { PondSkeleton } from './pond-skeleton.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-skeleton visual', () => {
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
    const el = await fixture<PondSkeleton>(
      html`<div style="display:grid;gap:0.75rem;width:16rem">
        <pond-skeleton></pond-skeleton>
        <pond-skeleton shape="rect"></pond-skeleton>
      </div>`
    )
    await matchScreenshotAtViewports('skeleton-default', el)
  })
})
