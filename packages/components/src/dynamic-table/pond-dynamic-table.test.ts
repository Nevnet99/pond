import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-dynamic-table.js'
import type { PondDynamicTable } from './pond-dynamic-table.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' }
]
const rows = [
  { name: 'Zoe', role: 'Dev' },
  { name: 'Ada', role: 'Lead' },
  { name: 'Bea', role: 'QA' },
  { name: 'Cal', role: 'Dev' },
  { name: 'Dee', role: 'PM' },
  { name: 'Eve', role: 'Dev' }
]

describe('pond-dynamic-table', () => {
  it('paginates rows', async () => {
    const el = await fixture<PondDynamicTable>(html`
      <pond-dynamic-table
        .columns=${columns}
        .rows=${rows}
        page-size="2"
      ></pond-dynamic-table>
    `)
    await el.updateComplete
    expect(el.shadowRoot?.querySelectorAll('tbody tr').length).toBe(2)
  })

  it('sorts by column', async () => {
    const el = await fixture<PondDynamicTable>(html`
      <pond-dynamic-table
        .columns=${columns}
        .rows=${rows}
        page-size="10"
      ></pond-dynamic-table>
    `)
    const sort = el.shadowRoot?.querySelector(
      '[part="sort"]'
    ) as HTMLButtonElement
    sort.click()
    await el.updateComplete
    expect(el.sortKey).toBe('name')
    const first = el.shadowRoot?.querySelector('tbody td')?.textContent
    expect(first).toBe('Ada')
  })

  it('supports plain', async () => {
    const el = await fixture<PondDynamicTable>(
      html`<pond-dynamic-table appearance="plain"></pond-dynamic-table>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondDynamicTable>(html`
      <pond-dynamic-table
        caption="People"
        .columns=${columns}
        .rows=${rows.slice(0, 2)}
        page-size="5"
      ></pond-dynamic-table>
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
