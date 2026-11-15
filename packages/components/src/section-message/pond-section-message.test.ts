import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-section-message.js'
import type { PondSectionMessage } from './pond-section-message.js'

describe('pond-section-message', () => {
  it('renders title and tone', async () => {
    const el = await fixture<PondSectionMessage>(
      html`<pond-section-message tone="danger" title="Error">Failed</pond-section-message>`
    )
    expect(el.tone).toBe('danger')
    expect(
      el.shadowRoot?.querySelector('[part="title"]')?.textContent
    ).toContain('Error')
  })
  it('uses alert role for danger', async () => {
    const el = await fixture<PondSectionMessage>(
      html`<pond-section-message tone="danger" title="Error">x</pond-section-message>`
    )
    expect(el.shadowRoot?.querySelector('[role="alert"]')).toBeTruthy()
  })
  it('supports plain', async () => {
    const el = await fixture<PondSectionMessage>(
      html`<pond-section-message appearance="plain">x</pond-section-message>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondSectionMessage>(
      html`<pond-section-message title="Note">Hello</pond-section-message>`
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
