import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-lozenge.js'
import type { PondLozenge } from './pond-lozenge.js'

describe('pond-lozenge', () => {
  it('renders', async () => {
    const el = await fixture<PondLozenge>(
      html`<pond-lozenge tone="success">Done</pond-lozenge>`
    )
    expect(el).toBeTruthy()
  })
  it('supports plain', async () => {
    const el = await fixture<PondLozenge>(
      html`<pond-lozenge appearance="plain"></pond-lozenge>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondLozenge>(
      html`<pond-lozenge tone="success">Done</pond-lozenge>`
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
