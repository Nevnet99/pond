import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-image.js'
import type { PondImage } from './pond-image.js'

// 1x1 PNG
const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

describe('pond-image', () => {
  it('renders img with alt', async () => {
    const el = await fixture<PondImage>(
      html`<pond-image src=${PIXEL} alt="Dot"></pond-image>`
    )
    const img = el.shadowRoot?.querySelector('img')
    expect(img?.getAttribute('alt')).toBe('Dot')
    expect(img?.getAttribute('src')).toBe(PIXEL)
  })

  it('wraps with caption when provided', async () => {
    const el = await fixture<PondImage>(
      html`<pond-image src=${PIXEL} alt="Dot" caption="A pixel"></pond-image>`
    )
    expect(el.shadowRoot?.querySelector('figure')).toBeTruthy()
    expect(el.shadowRoot?.querySelector('[part="caption"]')?.textContent).toBe(
      'A pixel'
    )
  })

  it('supports plain', async () => {
    const el = await fixture<PondImage>(
      html`<pond-image appearance="plain" src=${PIXEL} alt=""></pond-image>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondImage>(
      html`<pond-image src=${PIXEL} alt="Dot"></pond-image>`
    )
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
