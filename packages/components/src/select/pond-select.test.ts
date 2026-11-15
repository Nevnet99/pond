import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-select.js'
import type { PondSelect } from './pond-select.js'

const options = [
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large' }
]

describe('pond-select', () => {
  it('renders options and value', async () => {
    const el = await fixture<PondSelect>(
      html`<pond-select label="Size" .options=${options} value="m"></pond-select>`
    )
    const select = el.shadowRoot?.querySelector('select')
    expect(select).toBeTruthy()
    expect(select?.value).toBe('m')
    expect(select?.options.length).toBe(3)
  })
  it('supports multiple selection', async () => {
    const el = await fixture<PondSelect>(
      html`<pond-select label="Size" multiple .options=${options} .values=${['s', 'l']}></pond-select>`
    )
    const select = el.shadowRoot?.querySelector('select')
    expect(select?.multiple).toBe(true)
    expect(
      Array.from(select?.selectedOptions ?? []).map((o) => o.value)
    ).toEqual(['s', 'l'])
  })
  it('supports plain', async () => {
    const el = await fixture<PondSelect>(
      html`<pond-select appearance="plain" label="X" .options=${[]}></pond-select>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondSelect>(
      html`<pond-select label="Size" multiple .options=${options} .values=${['m']}></pond-select>`
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
