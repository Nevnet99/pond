import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-avatar.js'
import type { PondAvatar } from './pond-avatar.js'

describe('pond-avatar', () => {
  it('renders initials', async () => {
    const el = await fixture<PondAvatar>(
      html`<pond-avatar initials="LB" label="Luke"></pond-avatar>`
    )
    expect(el.shadowRoot?.textContent).toContain('LB')
  })

  it('supports plain', async () => {
    const el = await fixture<PondAvatar>(
      html`<pond-avatar appearance="plain" initials="X"></pond-avatar>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondAvatar>(
      html`<pond-avatar initials="LB" label="Luke"></pond-avatar>`
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
