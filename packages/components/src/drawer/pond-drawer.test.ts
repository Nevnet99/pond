import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-drawer.js'
import type { PondDrawer } from './pond-drawer.js'

describe('pond-drawer', () => {
  it('renders panel when open', async () => {
    const el = await fixture<PondDrawer>(
      html`<pond-drawer open title="Menu">Nav</pond-drawer>`
    )
    expect(el.shadowRoot?.querySelector('[role="dialog"]')).toBeTruthy()
  })
  it('closes on Escape', async () => {
    const el = await fixture<PondDrawer>(
      html`<pond-drawer open title="Menu">Nav</pond-drawer>`
    )
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await el.updateComplete
    expect(el.open).toBe(false)
  })
  it('supports plain and side', async () => {
    const el = await fixture<PondDrawer>(
      html`<pond-drawer appearance="plain" side="end" open title="X">y</pond-drawer>`
    )
    expect(el.appearance).toBe('plain')
    expect(el.side).toBe('end')
  })
  it('has no serious axe violations when open', async () => {
    const el = await fixture<PondDrawer>(
      html`<pond-drawer open title="Menu"><p>Nav</p></pond-drawer>`
    )
    document.body.append(el)
    const results = await axe.run(el, { rules: { region: { enabled: false } } })
    expect(
      results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      )
    ).toEqual([])
    el.remove()
  })
})
