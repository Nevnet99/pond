import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-progress-indicator.js'
import type { PondProgressIndicator } from './pond-progress-indicator.js'

describe('pond-progress-indicator', () => {
  it('renders steps', async () => {
    const el = await fixture<PondProgressIndicator>(
      html`<pond-progress-indicator .steps=${3} .selected=${1}></pond-progress-indicator>`
    )
    expect(el.shadowRoot?.querySelectorAll('[part="dot"]').length).toBe(3)
  })
  it('supports plain', async () => {
    const el = await fixture<PondProgressIndicator>(
      html`<pond-progress-indicator appearance="plain"></pond-progress-indicator>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondProgressIndicator>(
      html`<pond-progress-indicator .steps=${4} .selected=${0}></pond-progress-indicator>`
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
