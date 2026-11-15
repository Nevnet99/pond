import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-icon.js'
import type { PondIcon } from './pond-icon.js'

describe('pond-icon', () => {
  it('renders a named path', async () => {
    const el = await fixture<PondIcon>(
      html`<pond-icon name="check"></pond-icon>`
    )
    expect(el.shadowRoot?.querySelector('path')).toBeTruthy()
  })

  it('supports plain', async () => {
    const el = await fixture<PondIcon>(
      html`<pond-icon appearance="plain" name="close"></pond-icon>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations when labelled', async () => {
    const el = await fixture<PondIcon>(
      html`<pond-icon name="info" label="Information"></pond-icon>`
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
