import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-inline-dialog.js'
import type { PondInlineDialog } from './pond-inline-dialog.js'

describe('pond-inline-dialog', () => {
  it('opens from the trigger and shows heading + actions', async () => {
    const el = await fixture<PondInlineDialog>(html`
      <pond-inline-dialog heading="Share">
        <button type="button" slot="trigger">Open</button>
        <p>Body copy</p>
        <button type="button" slot="actions">Copy link</button>
      </pond-inline-dialog>
    `)
    expect(el.open).toBe(false)
    el.shadowRoot
      ?.querySelector('[part="trigger"]')
      ?.dispatchEvent(new Event('click', { bubbles: true }))
    await el.updateComplete
    expect(el.open).toBe(true)
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    expect(el.hasAttribute('data-has-actions')).toBe(true)
    expect(
      el.shadowRoot?.querySelector('[part="heading"]')?.textContent?.trim()
    ).toBe('Share')
  })

  it('closes on Escape', async () => {
    const el = await fixture<PondInlineDialog>(html`
      <pond-inline-dialog open heading="X">
        <button type="button" slot="trigger">T</button>
        Body
      </pond-inline-dialog>
    `)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await el.updateComplete
    expect(el.open).toBe(false)
  })

  it('supports plain', async () => {
    const el = await fixture<PondInlineDialog>(
      html`<pond-inline-dialog appearance="plain"></pond-inline-dialog>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations when open', async () => {
    const el = await fixture<PondInlineDialog>(html`
      <pond-inline-dialog open heading="Details">
        <button type="button" slot="trigger">Open</button>
        Short content
      </pond-inline-dialog>
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
