import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-grid.js'
import type { PondGrid } from './pond-grid.js'

describe('pond-grid', () => {
  it('renders root part', async () => {
    const el = await fixture<PondGrid>(
      html`<pond-grid columns="2"><span>a</span><span>b</span></pond-grid>`
    )
    expect(el.shadowRoot?.querySelector('[part="root"]')).toBeTruthy()
    expect(el.columns).toBe('2')
  })

  it('supports plain', async () => {
    const el = await fixture<PondGrid>(
      html`<pond-grid appearance="plain"><span>a</span></pond-grid>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondGrid>(
      html`<pond-grid columns="2"><span>a</span><span>b</span></pond-grid>`
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
