import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-inline-edit.js'
import type { PondInlineEdit } from './pond-inline-edit.js'

describe('pond-inline-edit', () => {
  it('enters edit mode and confirms', async () => {
    const el = await fixture<PondInlineEdit>(
      html`<pond-inline-edit value="Ada"></pond-inline-edit>`
    )
    el.shadowRoot?.querySelector<HTMLButtonElement>('[part="read"]')?.click()
    await el.updateComplete
    const input =
      el.shadowRoot?.querySelector<HTMLInputElement>('[part="input"]')
    expect(input).toBeTruthy()
    if (input) {
      input.value = 'Grace'
      input.dispatchEvent(new Event('input'))
    }
    el.shadowRoot?.querySelectorAll('button')[0]?.click()
    await el.updateComplete
    expect(el.value).toBe('Grace')
  })
  it('supports plain', async () => {
    const el = await fixture<PondInlineEdit>(
      html`<pond-inline-edit appearance="plain"></pond-inline-edit>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondInlineEdit>(
      html`<pond-inline-edit value="Ada" label="Name"></pond-inline-edit>`
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
