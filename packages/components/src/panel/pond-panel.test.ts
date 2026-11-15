import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-panel.js'
import type { PondPanel } from './pond-panel.js'

describe('pond-panel', () => {
  it('renders heading and body', async () => {
    const el = await fixture<PondPanel>(html`
      <pond-panel heading="Details">
        <p>Body copy</p>
      </pond-panel>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    expect(el.hasAttribute('data-has-header')).toBe(true)
    expect(el.shadowRoot?.querySelector('[part="heading"]')?.textContent).toBe(
      'Details'
    )
    expect(el.shadowRoot?.querySelector('[part="body"]')).toBeTruthy()
  })

  it('shows actions and footer when slotted', async () => {
    const el = await fixture<PondPanel>(html`
      <pond-panel heading="Filters">
        <button slot="actions" type="button">Clear</button>
        <p>Body</p>
        <div slot="footer">Footer</div>
      </pond-panel>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    expect(el.hasAttribute('data-has-header')).toBe(true)
    expect(el.hasAttribute('data-has-footer')).toBe(true)
  })

  it('hides header and footer when unused', async () => {
    const el = await fixture<PondPanel>(html`
      <pond-panel><p>Only body</p></pond-panel>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    expect(el.hasAttribute('data-has-header')).toBe(false)
    expect(el.hasAttribute('data-has-footer')).toBe(false)
  })

  it('supports plain', async () => {
    const el = await fixture<PondPanel>(
      html`<pond-panel appearance="plain" heading="X"><p>Y</p></pond-panel>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondPanel>(html`
      <pond-panel heading="Context">
        <p>Side content</p>
      </pond-panel>
    `)
    document.body.append(el)
    const results = await axe.run(el)
    expect(
      results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      )
    ).toEqual([])
    el.remove()
  })
})
