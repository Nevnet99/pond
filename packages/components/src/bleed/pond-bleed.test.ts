import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-bleed.js'
import type { PondBleed } from './pond-bleed.js'

describe('pond-bleed', () => {
  it('renders root part', async () => {
    const el = await fixture<PondBleed>(
      html`<pond-bleed inline="4"><span>a</span></pond-bleed>`
    )
    expect(el.shadowRoot?.querySelector('[part="root"]')).toBeTruthy()
    expect(el.inline).toBe('4')
  })

  it('supports plain', async () => {
    const el = await fixture<PondBleed>(
      html`<pond-bleed appearance="plain"><span>a</span></pond-bleed>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondBleed>(
      html`<pond-bleed all="2"><span>a</span></pond-bleed>`
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
