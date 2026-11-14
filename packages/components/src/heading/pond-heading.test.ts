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
})
