import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-flag.js'
import type { PondFlag } from './pond-flag.js'

describe('pond-flag', () => {
  it('closes', async () => {
    let closed = false
    const el = await fixture<PondFlag>(
      html`<pond-flag title="Saved">All good</pond-flag>`
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
    const el = await fixture<PondFlag>(
      html`<pond-flag appearance="plain">X</pond-flag>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondFlag>(
      html`<pond-flag title="Saved">All good</pond-flag>`
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
