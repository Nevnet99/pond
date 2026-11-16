import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import '../flag/pond-flag.js'
import './pond-flag-group.js'
import type { PondFlagGroup } from './pond-flag-group.js'

describe('pond-flag-group', () => {
  it('renders a live region', async () => {
    const el = await fixture<PondFlagGroup>(html`
      <pond-flag-group label="Alerts">
        <pond-flag title="Hi">Hello</pond-flag>
      </pond-flag-group>
    `)
    const root = el.shadowRoot?.querySelector('[part="root"]')
    expect(root?.getAttribute('role')).toBe('region')
    expect(root?.getAttribute('aria-live')).toBe('polite')
    expect(root?.getAttribute('aria-label')).toBe('Alerts')
  })

  it('supports plain', async () => {
    const el = await fixture<PondFlagGroup>(
      html`<pond-flag-group appearance="plain"></pond-flag-group>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondFlagGroup>(html`
      <pond-flag-group>
        <pond-flag title="Ok">Done</pond-flag>
      </pond-flag-group>
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
