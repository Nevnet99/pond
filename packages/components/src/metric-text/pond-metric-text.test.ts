import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-metric-text.js'
import type { PondMetricText } from './pond-metric-text.js'

describe('pond-metric-text', () => {
  it('renders root part', async () => {
    const el = await fixture<PondMetricText>(
      html`<pond-metric-text>42</pond-metric-text>`
    )
    expect(el.shadowRoot?.querySelector('[part="root"]')).toBeTruthy()
  })

  it('supports size and muted', async () => {
    const el = await fixture<PondMetricText>(
      html`<pond-metric-text size="xl" muted>9</pond-metric-text>`
    )
    expect(el.size).toBe('xl')
    expect(el.muted).toBe(true)
  })

  it('supports plain', async () => {
    const el = await fixture<PondMetricText>(
      html`<pond-metric-text appearance="plain">1</pond-metric-text>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondMetricText>(
      html`<pond-metric-text>42</pond-metric-text>`
    )
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
