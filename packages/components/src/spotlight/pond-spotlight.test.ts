import { fixture, html, oneEvent } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-spotlight.js'
import type { PondSpotlight } from './pond-spotlight.js'

describe('pond-spotlight', () => {
  it('renders dialog when open', async () => {
    const el = await fixture<PondSpotlight>(html`
      <pond-spotlight open heading="Tip">Body</pond-spotlight>
    `)
    expect(el.shadowRoot?.querySelector('[part="dialog"]')).toBeTruthy()
  })

  it('emits pond-close on dismiss', async () => {
    const el = await fixture<PondSpotlight>(html`
      <pond-spotlight open heading="Tip">Body</pond-spotlight>
    `)
    const btn = el.shadowRoot?.querySelector(
      '[part="actions"] button'
    ) as HTMLButtonElement
    const eventPromise = oneEvent(el, 'pond-close')
    btn.click()
    await eventPromise
    expect(el.open).toBe(false)
  })

  it('emits pond-next', async () => {
    const el = await fixture<PondSpotlight>(html`
      <pond-spotlight open heading="Tip">Body</pond-spotlight>
    `)
    const btn = el.shadowRoot?.querySelector(
      'button[data-primary]'
    ) as HTMLButtonElement
    const eventPromise = oneEvent(el, 'pond-next')
    btn.click()
    await eventPromise
  })

  it('supports plain', async () => {
    const el = await fixture<PondSpotlight>(
      html`<pond-spotlight appearance="plain" open>x</pond-spotlight>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondSpotlight>(html`
      <pond-spotlight open heading="Tip" label="Tip">Body</pond-spotlight>
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
