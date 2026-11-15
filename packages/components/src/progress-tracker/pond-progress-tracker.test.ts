import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-progress-tracker.js'
import type { PondProgressTracker } from './pond-progress-tracker.js'

const steps = [
  { label: 'Details', status: 'done' as const },
  { label: 'Review', status: 'current' as const },
  { label: 'Confirm', status: 'todo' as const }
]
describe('pond-progress-tracker', () => {
  it('renders steps', async () => {
    const el = await fixture<PondProgressTracker>(
      html`<pond-progress-tracker .steps=${steps}></pond-progress-tracker>`
    )
    expect(el.shadowRoot?.querySelectorAll('[part="step"]').length).toBe(3)
  })
  it('supports plain', async () => {
    const el = await fixture<PondProgressTracker>(
      html`<pond-progress-tracker appearance="plain" .steps=${[]}></pond-progress-tracker>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondProgressTracker>(
      html`<pond-progress-tracker .steps=${steps}></pond-progress-tracker>`
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
