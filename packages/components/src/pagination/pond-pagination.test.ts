import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-pagination.js'
import type { PondPagination } from './pond-pagination.js'

describe('pond-pagination', () => {
  it('changes page on next', async () => {
    const el = await fixture<PondPagination>(
      html`<pond-pagination page="1" page-count="3"></pond-pagination>`
    )
    el.shadowRoot
      ?.querySelector('[part="next"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await el.updateComplete
    expect(el.page).toBe(2)
  })

  it('supports plain', async () => {
    const el = await fixture<PondPagination>(
      html`<pond-pagination appearance="plain" page-count="2"></pond-pagination>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondPagination>(
      html`<pond-pagination page="1" page-count="3"></pond-pagination>`
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
