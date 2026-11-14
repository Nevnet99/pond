import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-inline.js'
import type { PondInline } from './pond-inline.js'

describe('pond-inline', () => {
  it('renders an inline part', async () => {
    const el = await fixture<PondInline>(
      html`<pond-inline><span>a</span><span>b</span></pond-inline>`
    )
    expect(el.shadowRoot?.querySelector('[part="inline"]')).toBeTruthy()
  })

  it('reflects gap, wrap, and justify', async () => {
    const el = await fixture<PondInline>(
      html`<pond-inline gap="4" wrap justify="between"
        ><span>a</span><span>b</span></pond-inline
      >`
    )
    expect(el.gap).toBe('4')
    expect(el.wrap).toBe(true)
    expect(el.justify).toBe('between')
  })

  it('supports appearance=plain', async () => {
    const el = await fixture<PondInline>(
      html`<pond-inline appearance="plain"><span>a</span></pond-inline>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondInline>(
      html`<pond-inline><span>a</span><span>b</span></pond-inline>`
    )
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
