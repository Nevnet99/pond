import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-progress-bar.js'
import type { PondProgressBar } from './pond-progress-bar.js'

describe('pond-progress-bar', () => {
  it('exposes valueneow from 0–1 value', async () => {
    const el = await fixture<PondProgressBar>(
      html`<pond-progress-bar .value=${0.4}></pond-progress-bar>`
    )
    const root = el.shadowRoot?.querySelector('[part="root"]')
    expect(root?.getAttribute('aria-valuenow')).toBe('40')
  })
  it('supports indeterminate without valuemow', async () => {
    const el = await fixture<PondProgressBar>(
      html`<pond-progress-bar indeterminate></pond-progress-bar>`
    )
    const root = el.shadowRoot?.querySelector('[part="root"]')
    expect(root?.hasAttribute('aria-valuenow')).toBe(false)
  })
  it('supports plain', async () => {
    const el = await fixture<PondProgressBar>(
      html`<pond-progress-bar appearance="plain"></pond-progress-bar>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondProgressBar>(
      html`<pond-progress-bar .value=${0.5} label="Upload"></pond-progress-bar>`
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
