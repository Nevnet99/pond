import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-tabs.js'
import type { PondTabs } from './pond-tabs.js'

const items = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
]

describe('pond-tabs', () => {
  it('selects a tab and shows its panel slot', async () => {
    const el = await fixture<PondTabs>(
      html`<pond-tabs
        .items=${items}
        selected="one"
      >
        <span slot="one">Panel one</span>
        <span slot="two">Panel two</span>
      </pond-tabs>`
    )
    const tabs = el.shadowRoot?.querySelectorAll('[part="tab"]')
    expect(tabs?.length).toBe(2)
    expect(el.selected).toBe('one')
    tabs?.[1]?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await el.updateComplete
    expect(el.selected).toBe('two')
  })

  it('supports plain', async () => {
    const el = await fixture<PondTabs>(
      html`<pond-tabs appearance="plain" .items=${items}></pond-tabs>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondTabs>(
      html`<pond-tabs .items=${items} selected="one">
        <span slot="one">Panel one</span>
      </pond-tabs>`
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
