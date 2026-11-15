import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-drawer.js'
import type { PondDrawer } from './pond-drawer.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-drawer visual', () => {
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
      await fixture<PondDrawer>(html`<div style="position:relative;width:24rem;height:16rem;overflow:hidden">
      <pond-drawer open title="Menu">
        <p>Panel content</p>
      </pond-drawer>
    </div>`)
    const root = el
      .querySelector('pond-drawer')
      ?.shadowRoot?.querySelector('pond-blanket')
      ?.shadowRoot?.querySelector('[part="root"]') as HTMLElement | null
    if (root) root.style.position = 'absolute'
    await matchScreenshotAtViewports('drawer-default', el)
  })
})
