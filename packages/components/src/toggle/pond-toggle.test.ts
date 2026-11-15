import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-toggle.js'
import type { PondToggle } from './pond-toggle.js'

describe('pond-toggle', () => {
  it('toggles on click', async () => {
    const el = await fixture<PondToggle>(
      html`<pond-toggle label="Notifications"></pond-toggle>`
    )
    const root = el.shadowRoot?.querySelector('[part="root"]')
    expect(root).toBeTruthy()
    root?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await el.updateComplete
    expect(el.checked).toBe(true)
  })
  it('supports plain', async () => {
    const el = await fixture<PondToggle>(
      html`<pond-toggle appearance="plain" label="X"></pond-toggle>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondToggle>(
      html`<pond-toggle label="Notifications"></pond-toggle>`
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
