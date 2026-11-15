import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-code.js'
import type { PondCode } from './pond-code.js'

describe('pond-code', () => {
  it('renders inline by default', async () => {
    const el = await fixture<PondCode>(html`<pond-code>const x = 1</pond-code>`)
    expect(el.shadowRoot?.querySelector('code')).toBeTruthy()
    expect(el.shadowRoot?.querySelector('pre')).toBeFalsy()
  })
  it('renders block variant', async () => {
    const el = await fixture<PondCode>(
      html`<pond-code variant="block">const x = 1</pond-code>`
    )
    expect(el.shadowRoot?.querySelector('pre')).toBeTruthy()
  })
  it('supports plain', async () => {
    const el = await fixture<PondCode>(
      html`<pond-code appearance="plain">x</pond-code>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondCode>(
      html`<pond-code>pnpm install</pond-code>`
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
