import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-skeleton.js'
import type { PondSkeleton } from './pond-skeleton.js'

describe('pond-skeleton', () => {
  it('renders shapes', async () => {
    const el = await fixture<PondSkeleton>(
      html`<pond-skeleton shape="circle"></pond-skeleton>`
    )
    expect(el.shape).toBe('circle')
    expect(el.shadowRoot?.querySelector('[part="root"]')).toBeTruthy()
  })
  it('supports plain', async () => {
    const el = await fixture<PondSkeleton>(
      html`<pond-skeleton appearance="plain"></pond-skeleton>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondSkeleton>(
      html`<pond-skeleton></pond-skeleton>`
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
