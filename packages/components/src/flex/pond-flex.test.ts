import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-flex.js'
import type { PondFlex } from './pond-flex.js'

describe('pond-flex', () => {
  it('renders root part', async () => {
    const el = await fixture<PondFlex>(
      html`<pond-flex><span>a</span></pond-flex>`
    )
    expect(el.shadowRoot?.querySelector('[part="root"]')).toBeTruthy()
  })

  it('reflects direction and wrap', async () => {
    const el = await fixture<PondFlex>(
      html`<pond-flex direction="column" wrap gap="4"><span>a</span></pond-flex>`
    )
    expect(el.direction).toBe('column')
    expect(el.wrap).toBe(true)
    expect(el.gap).toBe('4')
  })

  it('supports plain', async () => {
    const el = await fixture<PondFlex>(
      html`<pond-flex appearance="plain"><span>a</span></pond-flex>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondFlex>(
      html`<pond-flex><span>a</span><span>b</span></pond-flex>`
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
