import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-table-tree.js'
import type { PondTableTree } from './pond-table-tree.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' }
]
const nodes = [
  {
    id: '1',
    cells: { name: 'Parent', type: 'Folder' },
    children: [
      { id: '1a', cells: { name: 'Child', type: 'File' } },
      { id: '1b', cells: { name: 'Other', type: 'File' } }
    ]
  },
  { id: '2', cells: { name: 'Solo', type: 'File' } }
]

describe('pond-table-tree', () => {
  it('hides children until expanded', async () => {
    const el = await fixture<PondTableTree>(html`
      <pond-table-tree .columns=${columns} .nodes=${nodes}></pond-table-tree>
    `)
    await el.updateComplete
    expect(el.shadowRoot?.querySelectorAll('tbody tr').length).toBe(2)
    el.shadowRoot
      ?.querySelector<HTMLButtonElement>('[part="toggle"]:not([disabled])')
      ?.click()
    await el.updateComplete
    expect(el.shadowRoot?.querySelectorAll('tbody tr').length).toBe(4)
  })

  it('supports plain', async () => {
    const el = await fixture<PondTableTree>(
      html`<pond-table-tree appearance="plain"></pond-table-tree>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondTableTree>(html`
      <pond-table-tree
        caption="Files"
        .columns=${columns}
        .nodes=${nodes}
        .expandedIds=${['1']}
      ></pond-table-tree>
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
