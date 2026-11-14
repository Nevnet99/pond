import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import '../button/pond-button.js'
import './pond-inline.js'
import type { PondInline } from './pond-inline.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-inline visual', () => {
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

  it('matches button row at mobile / tablet / desktop', async () => {
    const el = await fixture<PondInline>(
      html`<pond-inline gap="2">
        <pond-button variant="primary">Save</pond-button>
        <pond-button variant="secondary">Cancel</pond-button>
      </pond-inline>`
    )
    await matchScreenshotAtViewports('inline-buttons', el)
  })
})
