import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-modal.js'
import type { PondModal } from './pond-modal.js'

describe('pond-modal', () => {
  it('renders dialog when open', async () => {
    const el = await fixture<PondModal>(
      html`<pond-modal open title="Confirm">Body</pond-modal>`
    )
    expect(el.shadowRoot?.querySelector('[role="dialog"]')).toBeTruthy()
  })
  it('closes on Escape', async () => {
    const el = await fixture<PondModal>(
      html`<pond-modal open title="Confirm">Body</pond-modal>`
    )
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await el.updateComplete
    expect(el.open).toBe(false)
  })
  it('supports plain', async () => {
    const el = await fixture<PondModal>(
      html`<pond-modal appearance="plain" open title="X">y</pond-modal>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations when open', async () => {
    const el = await fixture<PondModal>(
      html`<pond-modal open title="Confirm"><p>Body</p></pond-modal>`
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
