import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-breadcrumbs.js'
import type { PondBreadcrumbs } from './pond-breadcrumbs.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-breadcrumbs visual', () => {
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
    const el = await fixture<PondBreadcrumbs>(
      html`<pond-breadcrumbs
        .items=${[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: 'Pond', current: true }
        ]}
      ></pond-breadcrumbs>`
    )
    await matchScreenshotAtViewports('breadcrumbs-default', el)
  })
})
