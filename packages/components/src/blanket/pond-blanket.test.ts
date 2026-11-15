import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it, vi } from 'vitest'
import './pond-blanket.js'
import type { PondBlanket } from './pond-blanket.js'

describe('pond-blanket', () => {
  it('emits pond-dismiss when backdrop is clicked', async () => {
    const el = await fixture<PondBlanket>(
      html`<pond-blanket><div id="inner">Hi</div></pond-blanket>`
    )
    const spy = vi.fn()
    el.addEventListener('pond-dismiss', spy)
    el.shadowRoot
      ?.querySelector('[part="root"]')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(spy).toHaveBeenCalled()
  })
  it('supports plain', async () => {
    const el = await fixture<PondBlanket>(
      html`<pond-blanket appearance="plain"></pond-blanket>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondBlanket>(
      html`<pond-blanket><button type="button">Ok</button></pond-blanket>`
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
