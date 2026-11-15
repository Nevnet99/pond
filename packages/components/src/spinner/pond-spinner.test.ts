import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-spinner.js'
import type { PondSpinner } from './pond-spinner.js'

describe('pond-spinner', () => {
  it('renders', async () => {
    const el = await fixture<PondSpinner>(
      html`<pond-spinner label="Loading"></pond-spinner>`
    )
    expect(el).toBeTruthy()
  })
  it('supports plain', async () => {
    const el = await fixture<PondSpinner>(
      html`<pond-spinner appearance="plain"></pond-spinner>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondSpinner>(
      html`<pond-spinner label="Loading"></pond-spinner>`
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
