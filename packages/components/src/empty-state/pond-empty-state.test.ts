import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-empty-state.js'
import type { PondEmptyState } from './pond-empty-state.js'

describe('pond-empty-state', () => {
  it('renders heading', async () => {
    const el = await fixture<PondEmptyState>(
      html`<pond-empty-state heading="No projects">Create one to start.</pond-empty-state>`
    )
    expect(
      el.shadowRoot?.querySelector('[part="title"]')?.textContent
    ).toContain('No projects')
  })
  it('supports plain', async () => {
    const el = await fixture<PondEmptyState>(
      html`<pond-empty-state appearance="plain"></pond-empty-state>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondEmptyState>(
      html`<pond-empty-state heading="Empty">Nothing here.</pond-empty-state>`
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
