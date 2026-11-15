import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import '../page-header/pond-page-header.js'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-page.js'
import type { PondPage } from './pond-page.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-page visual', () => {
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
    const el = await fixture<PondPage>(html`
      <pond-page style="width:40rem;min-height:16rem">
        <div slot="navigation" style="padding:0.75rem">Nav</div>
        <pond-page-header slot="header" heading="Projects"></pond-page-header>
        <div slot="panel">Panel</div>
        <p>Main content</p>
      </pond-page>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    await matchScreenshotAtViewports('page-default', el)
  })
})
