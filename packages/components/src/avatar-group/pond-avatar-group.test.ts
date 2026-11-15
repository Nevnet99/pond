import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import '../avatar/pond-avatar.js'
import './pond-avatar-group.js'
import type { PondAvatarGroup } from './pond-avatar-group.js'

describe('pond-avatar-group', () => {
  it('renders a group', async () => {
    const el =
      await fixture<PondAvatarGroup>(html`<pond-avatar-group label="Team">
      <pond-avatar initials="A"></pond-avatar>
      <pond-avatar initials="B"></pond-avatar>
    </pond-avatar-group>`)
    expect(
      el.shadowRoot?.querySelector('[part="root"]')?.getAttribute('role')
    ).toBe('group')
  })
  it('supports plain', async () => {
    const el = await fixture<PondAvatarGroup>(
      html`<pond-avatar-group appearance="plain"></pond-avatar-group>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el =
      await fixture<PondAvatarGroup>(html`<pond-avatar-group label="Team">
      <pond-avatar initials="A"></pond-avatar>
    </pond-avatar-group>`)
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
