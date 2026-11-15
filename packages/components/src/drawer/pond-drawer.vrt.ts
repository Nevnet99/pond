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
    const drawer = el.querySelector('pond-drawer') as PondDrawer | null
    await drawer?.updateComplete
    // Autofocus runs in updated(); wait then drop ring (flaky :focus-visible in CI).
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    ;(drawer?.shadowRoot?.activeElement as HTMLElement | null)?.blur()
    ;(document.activeElement as HTMLElement | null)?.blur()
    // Let enter animation settle so VRT is not mid-slide.
    await new Promise((r) => setTimeout(r, 250))
    const root = drawer?.shadowRoot
      ?.querySelector('pond-blanket')
      ?.shadowRoot?.querySelector('[part="root"]') as HTMLElement | null
    if (root) root.style.position = 'absolute'
    await matchScreenshotAtViewports('drawer-default', el)
  })
})
