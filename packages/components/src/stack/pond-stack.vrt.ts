import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import '../text/pond-text.js'
import './pond-stack.js'
import type { PondStack } from './pond-stack.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-stack visual', () => {
  let link: HTMLLinkElement

  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    link.remove()
  })

  it('matches stacked text at mobile / tablet / desktop', async () => {
    const el = await fixture<PondStack>(
      html`<pond-stack gap="3">
        <pond-text>First</pond-text>
        <pond-text>Second</pond-text>
        <pond-text>Third</pond-text>
      </pond-stack>`
    )
    await matchScreenshotAtViewports('stack-text', el)
  })
})
