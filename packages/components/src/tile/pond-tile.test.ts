import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-tile.js'
import type { PondTile } from './pond-tile.js'

describe('pond-tile', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PondTile>(html`<pond-tile>Doc</pond-tile>`)
    expect(el.shadowRoot?.querySelector('[part="root"]')).toBeTruthy()
  })

  it('exposes label as img name', async () => {
    const el = await fixture<PondTile>(
      html`<pond-tile label="Document">📄</pond-tile>`
    )
    const root = el.shadowRoot?.querySelector('[part="root"]')
    expect(root?.getAttribute('role')).toBe('img')
    expect(root?.getAttribute('aria-label')).toBe('Document')
  })

  it('supports plain', async () => {
    const el = await fixture<PondTile>(
      html`<pond-tile appearance="plain">X</pond-tile>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondTile>(
      html`<pond-tile label="Doc">Doc</pond-tile>`
    )
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
