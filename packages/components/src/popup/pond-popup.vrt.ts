import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-popup.js'
import type { PondPopup } from './pond-popup.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-popup visual', () => {
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
    const el =
      await fixture<PondPopup>(html`<div style="min-height:8rem;padding:1rem">
      <pond-popup open label="Details">
        <button type="button" slot="trigger">Details</button>
        Brief anchored content.
      </pond-popup>
    </div>`)
    await matchScreenshotAtViewports('popup-default', el)
  })
})
