import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-text-field.js'
import type { PondTextField } from './pond-text-field.js'

describe('pond-text-field', () => {
  it('renders labeled input', async () => {
    const el = await fixture<PondTextField>(
      html`<pond-text-field label="Name" value="Ada"></pond-text-field>`
    )
    const input = el.shadowRoot?.querySelector(
      '[part="input"]'
    ) as HTMLInputElement
    expect(input.value).toBe('Ada')
    expect(
      el.shadowRoot?.querySelector('[part="label"]')?.textContent
    ).toContain('Name')
  })

  it('shows error when invalid', async () => {
    const el = await fixture<PondTextField>(
      html`<pond-text-field label="Email" invalid error-message="Required"></pond-text-field>`
    )
    expect(
      el.shadowRoot?.querySelector('[part="error"]')?.textContent
    ).toContain('Required')
  })

  it('supports appearance=plain', async () => {
    const el = await fixture<PondTextField>(
      html`<pond-text-field appearance="plain" label="X"></pond-text-field>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondTextField>(
      html`<pond-text-field label="Name"></pond-text-field>`
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
