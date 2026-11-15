import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-table.js'
import type { PondTable } from './pond-table.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' }
]
const rows = [
  { name: 'Ada', role: 'Engineer' },
  { name: 'Grace', role: 'Lead' }
]

describe('pond-table', () => {
  it('renders headers and rows', async () => {
    const el = await fixture<PondTable>(
      html`<pond-table caption="Team" .columns=${columns} .rows=${rows}></pond-table>`
    )
    const ths = el.shadowRoot?.querySelectorAll('th')
    const tds = el.shadowRoot?.querySelectorAll('td')
    expect(ths?.length).toBe(2)
    expect(tds?.length).toBe(4)
    expect(el.shadowRoot?.querySelector('caption')?.textContent).toBe('Team')
  })
  it('supports plain', async () => {
    const el = await fixture<PondTable>(
      html`<pond-table appearance="plain" .columns=${columns} .rows=${rows}></pond-table>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondTable>(
      html`<pond-table caption="Team" .columns=${columns} .rows=${rows}></pond-table>`
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
