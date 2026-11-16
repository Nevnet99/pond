import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-comment.js'
import type { PondComment } from './pond-comment.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-comment visual', () => {
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
    const el = await fixture<PondComment>(html`
      <pond-comment
        author="Ada Lovelace"
        meta="2h ago"
        style="width:20rem"
      >
        Shipping the chart tomorrow.
        <button type="button" slot="actions">Reply</button>
      </pond-comment>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    await matchScreenshotAtViewports('comment-default', el)
  })
})
