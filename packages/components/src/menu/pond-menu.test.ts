import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-menu.js'
import type { PondMenu } from './pond-menu.js'

const items = [
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete', danger: true }
]

describe('pond-menu', () => {
  it('opens and selects an item', async () => {
    const el = await fixture<PondMenu>(
      html`<pond-menu label="Actions" .items=${items}></pond-menu>`
    )
    el.shadowRoot
      ?.querySelector('[part="trigger"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await el.updateComplete
    expect(el.open).toBe(true)
    el.shadowRoot
      ?.querySelector('[part="item"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await el.updateComplete
    expect(el.open).toBe(false)
  })

  it('supports plain', async () => {
    const el = await fixture<PondMenu>(
      html`<pond-menu appearance="plain" .items=${items}></pond-menu>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations when open', async () => {
    const el = await fixture<PondMenu>(
      html`<pond-menu open label="Actions" .items=${items}></pond-menu>`
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
