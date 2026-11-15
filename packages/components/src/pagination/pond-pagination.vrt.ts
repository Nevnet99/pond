import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-pagination.js'
import type { PondPagination } from './pond-pagination.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-pagination visual', () => {
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
    const el = await fixture<PondPagination>(
      html`<pond-pagination page="2" page-count="5"></pond-pagination>`
    )
    await matchScreenshotAtViewports('pagination-default', el)
  })
})
