import { fixture, html } from '@open-wc/testing-helpers'
import { describe, expect, it } from 'vitest'
import './pond-heading.js'
import type { PondHeading } from './pond-heading.js'

describe('pond-heading', () => {
  it('renders an h2 by default', async () => {
    const el = await fixture<PondHeading>(
      html`<pond-heading>Title</pond-heading>`
    )
    expect(el.shadowRoot?.querySelector('h2')).toBeTruthy()
  })

  it('maps level to the matching heading tag', async () => {
    const el = await fixture<PondHeading>(
      html`<pond-heading level="1">Hero</pond-heading>`
    )
    expect(el.shadowRoot?.querySelector('h1')).toBeTruthy()
  })

  it('defaults data-size from level and allows size override', async () => {
    const el = await fixture<PondHeading>(
      html`<pond-heading level="2">Section</pond-heading>`
    )
    await el.updateComplete
    expect(el.getAttribute('data-size')).toBe('4xl')

    el.size = 'lg'
    await el.updateComplete
    expect(el.getAttribute('data-size')).toBe('lg')
  })
})
