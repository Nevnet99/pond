import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-badge.js'
import type { PondBadge } from './pond-badge.js'

describe('pond-badge', () => {
  it('renders', async () => {
    const el = await fixture<PondBadge>(
      html`<pond-badge value="3"></pond-badge>`
    )
    expect(el).toBeTruthy()
  })
  it('supports plain', async () => {
    const el = await fixture<PondBadge>(
      html`<pond-badge appearance="plain"></pond-badge>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondBadge>(
      html`<pond-badge value="3"></pond-badge>`
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
