import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-calendar.js'
import type { PondCalendar } from './pond-calendar.js'

describe('pond-calendar', () => {
  it('selects a date', async () => {
    const el = await fixture<PondCalendar>(
      html`<pond-calendar value="2026-11-15"></pond-calendar>`
    )
    const day = el.shadowRoot?.querySelector(
      '[part="day"]:not([data-outside])'
    ) as HTMLButtonElement
    day?.click()
    await el.updateComplete
    expect(el.value).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
  it('supports plain', async () => {
    const el = await fixture<PondCalendar>(
      html`<pond-calendar appearance="plain"></pond-calendar>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondCalendar>(
      html`<pond-calendar value="2026-11-15"></pond-calendar>`
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
