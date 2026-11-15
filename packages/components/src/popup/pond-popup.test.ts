import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-popup.js'
import type { PondPopup } from './pond-popup.js'

describe('pond-popup', () => {
  it('opens and closes on Escape', async () => {
    const el = await fixture<PondPopup>(
      html`<pond-popup open label="More">Content</pond-popup>`
    )
    expect(el.shadowRoot?.querySelector('[part="panel"]')).toBeTruthy()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await el.updateComplete
    expect(el.open).toBe(false)
  })
  it('supports plain', async () => {
    const el = await fixture<PondPopup>(
      html`<pond-popup appearance="plain"></pond-popup>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations when open', async () => {
    const el = await fixture<PondPopup>(
      html`<pond-popup open label="More"><button type="button" slot="trigger">Open</button>Hi</pond-popup>`
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
