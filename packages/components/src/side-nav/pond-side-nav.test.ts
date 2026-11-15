import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-side-nav.js'
import type { PondSideNav } from './pond-side-nav.js'
import type { PondSideNavItem } from './pond-side-nav-item.js'
import type { PondSideNavSection } from './pond-side-nav-section.js'

describe('pond-side-nav', () => {
  it('renders nav landmark with sections and current item', async () => {
    const el = await fixture<PondSideNav>(html`
      <pond-side-nav label="App">
        <pond-side-nav-section heading="Plan">
          <pond-side-nav-item href="/board" current>Board</pond-side-nav-item>
          <pond-side-nav-item href="/list">List</pond-side-nav-item>
        </pond-side-nav-section>
      </pond-side-nav>
    `)
    await el.updateComplete
    const nav = el.shadowRoot?.querySelector('[part="root"]')
    expect(nav?.getAttribute('aria-label')).toBe('App')
    const current = el.querySelector<PondSideNavItem>(
      'pond-side-nav-item[current]'
    )
    expect(current?.href).toBe('/board')
  })

  it('collapses a section on toggle', async () => {
    const el = await fixture<PondSideNav>(html`
      <pond-side-nav>
        <pond-side-nav-section heading="Plan">
          <pond-side-nav-item href="/a">A</pond-side-nav-item>
        </pond-side-nav-section>
      </pond-side-nav>
    `)
    const section = el.querySelector(
      'pond-side-nav-section'
    ) as PondSideNavSection
    await section.updateComplete
    expect(section.collapsed).toBe(false)
    section.shadowRoot
      ?.querySelector<HTMLButtonElement>('[part="heading"]')
      ?.click()
    await section.updateComplete
    expect(section.collapsed).toBe(true)
  })

  it('nests one level of items', async () => {
    const el = await fixture<PondSideNav>(html`
      <pond-side-nav>
        <pond-side-nav-section heading="Work">
          <pond-side-nav-item href="/parent">
            Parent
            <pond-side-nav-item slot="nested" href="/child"
              >Child</pond-side-nav-item
            >
          </pond-side-nav-item>
        </pond-side-nav-section>
      </pond-side-nav>
    `)
    const parent = el.querySelector('pond-side-nav-item') as PondSideNavItem
    await parent.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    expect(parent.hasAttribute('data-has-nested')).toBe(true)
  })

  it('supports plain', async () => {
    const el = await fixture<PondSideNav>(
      html`<pond-side-nav appearance="plain"></pond-side-nav>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondSideNav>(html`
      <pond-side-nav>
        <pond-side-nav-section heading="Plan">
          <pond-side-nav-item href="/board" current>
            <span slot="icon" aria-hidden="true">▣</span>
            Board
          </pond-side-nav-item>
        </pond-side-nav-section>
      </pond-side-nav>
    `)
    document.body.append(el)
    const results = await axe.run(el)
    expect(
      results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      )
    ).toEqual([])
    el.remove()
  })
})
