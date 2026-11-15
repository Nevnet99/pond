import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-side-nav.js'
import type { PondSideNav } from './pond-side-nav.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-side-nav visual', () => {
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
    const el = await fixture<PondSideNav>(html`
      <pond-side-nav
        style="width:15rem;border:1px solid var(--pond-color-border-default);background:var(--pond-color-bg-surface)"
      >
        <pond-side-nav-section heading="Plan">
          <pond-side-nav-item href="#board" current>
            <span slot="icon" aria-hidden="true">▣</span>
            Board
          </pond-side-nav-item>
          <pond-side-nav-item href="#list">List</pond-side-nav-item>
        </pond-side-nav-section>
        <pond-side-nav-section heading="Work">
          <pond-side-nav-item href="#issues">
            Issues
            <pond-side-nav-item slot="nested" href="#mine">Mine</pond-side-nav-item>
          </pond-side-nav-item>
        </pond-side-nav-section>
      </pond-side-nav>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    await matchScreenshotAtViewports('side-nav-default', el)
  })
})
