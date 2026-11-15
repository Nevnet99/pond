import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-checkbox.js'
import type { PondCheckbox } from './pond-checkbox.js'

describe('pond-checkbox', () => {
  it('toggles checked on change', async () => {
    const el = await fixture<PondCheckbox>(
      html`<pond-checkbox label="Accept"></pond-checkbox>`
    )
    const input = el.shadowRoot?.querySelector('input')
    expect(input).toBeTruthy()
    input?.click()
    await el.updateComplete
    expect(el.checked).toBe(true)
  })
  it('supports plain', async () => {
    const el = await fixture<PondCheckbox>(
      html`<pond-checkbox appearance="plain" label="X"></pond-checkbox>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondCheckbox>(
      html`<pond-checkbox label="Accept"></pond-checkbox>`
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
