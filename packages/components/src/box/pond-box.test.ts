import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-box.js'
import type { PondBox } from './pond-box.js'

describe('pond-box', () => {
  it('renders a box part with slotted content', async () => {
    const el = await fixture<PondBox>(html`<pond-box>Hello</pond-box>`)
    expect(el.shadowRoot?.querySelector('[part="box"]')).toBeTruthy()
    expect(el.textContent).toContain('Hello')
  })

  it('reflects padding and background', async () => {
    const el = await fixture<PondBox>(
      html`<pond-box padding="4" background="surface">x</pond-box>`
    )
    expect(el.padding).toBe('4')
    expect(el.background).toBe('surface')
  })

  it('supports appearance=plain', async () => {
    const el = await fixture<PondBox>(
      html`<pond-box appearance="plain">x</pond-box>`
    )
    expect(el.getAttribute('appearance')).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondBox>(html`<pond-box padding="4">Ok</pond-box>`)
    document.body.append(el)
    const results = await axe.run(el, {
      rules: { region: { enabled: false } }
    })
    expect(
      results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      )
    ).toEqual([])
    el.remove()
  })
})
