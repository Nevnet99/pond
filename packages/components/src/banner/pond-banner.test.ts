import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-banner.js'
import type { PondBanner } from './pond-banner.js'

describe('pond-banner', () => {
  it('closes when closable', async () => {
    let closed = false
    const el = await fixture<PondBanner>(
      html`<pond-banner closable>Notice</pond-banner>`
    )
    el.addEventListener('pond-close', () => {
      closed = true
    })
    el.shadowRoot
      ?.querySelector('[part="close"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(closed).toBe(true)
  })
  it('supports plain', async () => {
    const el = await fixture<PondBanner>(
      html`<pond-banner appearance="plain">X</pond-banner>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondBanner>(
      html`<pond-banner>Notice</pond-banner>`
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
