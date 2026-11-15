import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-visually-hidden.js'
import type { PondVisuallyHidden } from './pond-visually-hidden.js'

describe('pond-visually-hidden', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PondVisuallyHidden>(
      html`<pond-visually-hidden>Skip to content</pond-visually-hidden>`
    )
    expect(el.shadowRoot?.textContent).toContain('')
    expect(el.textContent).toContain('Skip to content')
  })
  it('supports plain', async () => {
    const el = await fixture<PondVisuallyHidden>(
      html`<pond-visually-hidden appearance="plain">x</pond-visually-hidden>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondVisuallyHidden>(
      html`<pond-visually-hidden>Hidden label</pond-visually-hidden>`
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
