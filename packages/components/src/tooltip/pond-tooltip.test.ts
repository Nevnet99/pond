import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-tooltip.js'
import type { PondTooltip } from './pond-tooltip.js'

describe('pond-tooltip', () => {
  it('shows content on focus', async () => {
    const el = await fixture<PondTooltip>(
      html`<pond-tooltip content="Help"><button>i</button></pond-tooltip>`
    )
    el.shadowRoot
      ?.querySelector('[part="trigger"]')
      ?.dispatchEvent(new Event('focusin'))
    await el.updateComplete
    expect(
      el.shadowRoot?.querySelector('[part="tooltip"]')?.textContent
    ).toContain('Help')
  })
  it('supports plain', async () => {
    const el = await fixture<PondTooltip>(
      html`<pond-tooltip appearance="plain" content="x"><span>t</span></pond-tooltip>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondTooltip>(
      html`<pond-tooltip content="Help"><button type="button">Info</button></pond-tooltip>`
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
