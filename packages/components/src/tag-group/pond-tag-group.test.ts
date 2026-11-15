import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import '../tag/pond-tag.js'
import './pond-tag-group.js'
import type { PondTagGroup } from './pond-tag-group.js'

describe('pond-tag-group', () => {
  it('renders a group', async () => {
    const el = await fixture<PondTagGroup>(html`<pond-tag-group label="Labels">
      <pond-tag>Alpha</pond-tag><pond-tag>Beta</pond-tag>
    </pond-tag-group>`)
    expect(
      el.shadowRoot?.querySelector('[part="root"]')?.getAttribute('role')
    ).toBe('group')
  })
  it('supports plain', async () => {
    const el = await fixture<PondTagGroup>(
      html`<pond-tag-group appearance="plain"></pond-tag-group>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondTagGroup>(
      html`<pond-tag-group label="Labels"><pond-tag>A</pond-tag></pond-tag-group>`
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
