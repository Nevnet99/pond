import { fixture, html } from '@open-wc/testing-helpers'
import { describe, expect, it } from 'vitest'
import './pond-text.js'
import type { PondText } from './pond-text.js'

describe('pond-text', () => {
  it('renders slotted content', async () => {
    const el = await fixture<PondText>(html`<pond-text>Hello pond</pond-text>`)
    expect(el.textContent).toContain('Hello pond')
  })

  it('supports plain appearance', async () => {
    const el = await fixture<PondText>(
      html`<pond-text appearance="plain">x</pond-text>`
    )
    expect(el.appearance).toBe('plain')
  })
})
