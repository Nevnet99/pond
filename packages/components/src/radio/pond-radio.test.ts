import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-radio.js'
import type { PondRadio } from './pond-radio.js'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' }
]
describe('pond-radio', () => {
  it('selects a value', async () => {
    const el = await fixture<PondRadio>(
      html`<pond-radio label="Pick" .options=${options} value="a"></pond-radio>`
    )
    const inputs = el.shadowRoot?.querySelectorAll('input')
    inputs?.[1]?.click()
    await el.updateComplete
    expect(el.value).toBe('b')
  })
  it('supports plain', async () => {
    const el = await fixture<PondRadio>(
      html`<pond-radio appearance="plain" .options=${options}></pond-radio>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondRadio>(
      html`<pond-radio label="Pick" .options=${options} value="a"></pond-radio>`
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
