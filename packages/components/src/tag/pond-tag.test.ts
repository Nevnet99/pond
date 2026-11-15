import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-tag.js'
import type { PondTag } from './pond-tag.js'

describe('pond-tag', () => {
  it('renders and can remove', async () => {
    let removed = false
    const el = await fixture<PondTag>(
      html`<pond-tag removable>Design</pond-tag>`
    )
    el.addEventListener('pond-remove', () => {
      removed = true
    })
    el.shadowRoot
      ?.querySelector('[part="remove"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(removed).toBe(true)
  })
  it('supports plain', async () => {
    const el = await fixture<PondTag>(
      html`<pond-tag appearance="plain">X</pond-tag>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondTag>(html`<pond-tag>Design</pond-tag>`)
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
