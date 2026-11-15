import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-date-time-picker.js'
import type { PondDateTimePicker } from './pond-date-time-picker.js'

describe('pond-date-time-picker', () => {
  it('splits value into date and time', async () => {
    const el = await fixture<PondDateTimePicker>(
      html`<pond-date-time-picker value="2026-11-15T14:30"></pond-date-time-picker>`
    )
    const time = el.shadowRoot?.querySelector(
      'input[type="time"]'
    ) as HTMLInputElement
    expect(time?.value).toBe('14:30')
  })
  it('supports plain', async () => {
    const el = await fixture<PondDateTimePicker>(
      html`<pond-date-time-picker appearance="plain"></pond-date-time-picker>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondDateTimePicker>(
      html`<pond-date-time-picker label="When" value="2026-11-15T14:30"></pond-date-time-picker>`
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
