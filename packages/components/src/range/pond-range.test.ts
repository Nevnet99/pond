import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-range.js'
import type { PondRange } from './pond-range.js'

describe('pond-range', () => {
  it('renders value', async () => {
    const el = await fixture<PondRange>(
      html`<pond-range label="Volume" .value=${40}></pond-range>`
    )
    expect(el.shadowRoot?.querySelector('input')?.value).toBe('40')
  })
  it('supports plain', async () => {
    const el = await fixture<PondRange>(
      html`<pond-range appearance="plain"></pond-range>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondRange>(
      html`<pond-range label="Volume" .value=${40}></pond-range>`
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
