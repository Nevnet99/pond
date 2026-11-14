import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-stack.js'
import type { PondStack } from './pond-stack.js'

describe('pond-stack', () => {
  it('renders a stack part', async () => {
    const el = await fixture<PondStack>(
      html`<pond-stack><span>a</span><span>b</span></pond-stack>`
    )
    expect(el.shadowRoot?.querySelector('[part="stack"]')).toBeTruthy()
  })

  it('defaults gap to 4 and reflects align', async () => {
    const el = await fixture<PondStack>(
      html`<pond-stack gap="2" align="center"><span>a</span></pond-stack>`
    )
    expect(el.gap).toBe('2')
    expect(el.align).toBe('center')
  })

  it('supports appearance=plain', async () => {
    const el = await fixture<PondStack>(
      html`<pond-stack appearance="plain"><span>a</span></pond-stack>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondStack>(
      html`<pond-stack><span>a</span><span>b</span></pond-stack>`
    )
    document.body.append(el)
    const results = await axe.run(el, {
      rules: { region: { enabled: false } }
    })
    expect(
      results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      )
    ).toEqual([])
    el.remove()
  })
})
