import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-menu.js'
import type { PondMenu } from './pond-menu.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-menu visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())

  it('matches open menu at mobile / tablet / desktop', async () => {
    const el = await fixture<PondMenu>(
      html`<div style="min-height:10rem;padding:1rem">
        <pond-menu
          open
          label="Actions"
          .items=${[
            { value: 'edit', label: 'Edit' },
            { value: 'delete', label: 'Delete', danger: true }
          ]}
        ></pond-menu>
      </div>`
    )
    await matchScreenshotAtViewports('menu-open', el)
  })
})
