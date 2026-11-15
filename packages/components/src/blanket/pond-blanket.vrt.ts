import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-blanket.js'
import type { PondBlanket } from './pond-blanket.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-blanket visual', () => {
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
      await fixture<PondBlanket>(html`<div style="position:relative;width:20rem;height:12rem;overflow:hidden">
      <pond-blanket>
        <div style="margin:auto;padding:1rem;background:var(--pond-color-bg-canvas);border-radius:8px;color:var(--pond-color-fg-default)">Panel</div>
      </pond-blanket>
    </div>`)
    // Force absolute positioning for VRT frame
    const root = el
      .querySelector('pond-blanket')
      ?.shadowRoot?.querySelector('[part="root"]') as HTMLElement | null
    if (root) {
      root.style.position = 'absolute'
    }
    await matchScreenshotAtViewports('blanket-default', el)
  })
})
