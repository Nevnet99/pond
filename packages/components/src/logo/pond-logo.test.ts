import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-logo.js'
import type { PondLogo } from './pond-logo.js'

const mark = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%23256EFF"/></svg>`
)}`

describe('pond-logo', () => {
  it('renders wordmark', async () => {
    const el = await fixture<PondLogo>(html`<pond-logo>Pond</pond-logo>`)
    expect(el.shadowRoot?.querySelector('[part="wordmark"]')).toBeTruthy()
  })

  it('renders image when src is set', async () => {
    const el = await fixture<PondLogo>(
      html`<pond-logo src=${mark} alt="">Pond</pond-logo>`
    )
    const img = el.shadowRoot?.querySelector('[part="image"]')
    expect(img?.getAttribute('src')).toBe(mark)
  })

  it('renders as link when href is set', async () => {
    const el = await fixture<PondLogo>(
      html`<pond-logo href="/">Pond</pond-logo>`
    )
    expect(el.shadowRoot?.querySelector('a[part="root"]')).toBeTruthy()
  })

  it('supports plain', async () => {
    const el = await fixture<PondLogo>(
      html`<pond-logo appearance="plain">Pond</pond-logo>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondLogo>(
      html`<pond-logo src=${mark} alt="">Pond</pond-logo>`
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
