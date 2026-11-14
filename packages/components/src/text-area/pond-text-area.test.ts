import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-text-area.js'
import type { PondTextArea } from './pond-text-area.js'

describe('pond-text-area', () => {
  it('renders labeled textarea', async () => {
    const el = await fixture<PondTextArea>(
      html`<pond-text-area label="Notes" value="Hello"></pond-text-area>`
    )
    const area = el.shadowRoot?.querySelector(
      '[part="textarea"]'
    ) as HTMLTextAreaElement
    expect(area.value).toBe('Hello')
  })

  it('supports appearance=plain', async () => {
    const el = await fixture<PondTextArea>(
      html`<pond-text-area appearance="plain" label="X"></pond-text-area>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondTextArea>(
      html`<pond-text-area label="Notes"></pond-text-area>`
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
