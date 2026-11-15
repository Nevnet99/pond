import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-date-label.js'
import type { PondDateLabel } from './pond-date-label.js'

describe('pond-date-label', () => {
  it('renders a time element', async () => {
    const el = await fixture<PondDateLabel>(
      html`<pond-date-label value="2026-11-15"></pond-date-label>`
    )
    const time = el.shadowRoot?.querySelector('time')
    expect(time?.getAttribute('datetime')).toBe('2026-11-15')
    expect(time?.textContent).toBeTruthy()
  })
  it('supports plain', async () => {
    const el = await fixture<PondDateLabel>(
      html`<pond-date-label appearance="plain" value="2026-11-15"></pond-date-label>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondDateLabel>(
      html`<pond-date-label value="2026-11-15"></pond-date-label>`
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
