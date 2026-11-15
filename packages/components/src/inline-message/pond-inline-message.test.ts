import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-inline-message.js'
import type { PondInlineMessage } from './pond-inline-message.js'

describe('pond-inline-message', () => {
  it('renders title and tone', async () => {
    const el = await fixture<PondInlineMessage>(
      html`<pond-inline-message tone="danger" title="Error">Required</pond-inline-message>`
    )
    expect(el.tone).toBe('danger')
    expect(el.shadowRoot?.querySelector('[part="title"]')?.textContent).toBe(
      'Error'
    )
  })
  it('supports plain', async () => {
    const el = await fixture<PondInlineMessage>(
      html`<pond-inline-message appearance="plain"></pond-inline-message>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondInlineMessage>(
      html`<pond-inline-message title="Note">Helpful tip</pond-inline-message>`
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
