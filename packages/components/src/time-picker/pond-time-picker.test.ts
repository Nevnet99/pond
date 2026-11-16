import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-time-picker.js'
import type { PondTimePicker } from './pond-time-picker.js'

describe('pond-time-picker', () => {
  it('renders a time input', async () => {
    const el = await fixture<PondTimePicker>(html`
      <pond-time-picker label="Start" value="09:30"></pond-time-picker>
    `)
    const input = el.shadowRoot?.querySelector(
      'input[type="time"]'
    ) as HTMLInputElement
    expect(input.value).toBe('09:30')
  })

  it('emits pond-change', async () => {
    const el = await fixture<PondTimePicker>(
      html`<pond-time-picker value="09:00"></pond-time-picker>`
    )
    let detail = ''
    el.addEventListener('pond-change', ((e: CustomEvent) => {
      detail = e.detail.value
    }) as EventListener)
    const input = el.shadowRoot?.querySelector('input') as HTMLInputElement
    input.value = '10:15'
    input.dispatchEvent(new Event('change'))
    expect(detail).toBe('10:15')
  })

  it('supports plain', async () => {
    const el = await fixture<PondTimePicker>(
      html`<pond-time-picker appearance="plain"></pond-time-picker>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondTimePicker>(html`
      <pond-time-picker label="Start" value="09:30"></pond-time-picker>
    `)
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
