import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-page-header.js'
import type { PondPageHeader } from './pond-page-header.js'

describe('pond-page-header', () => {
  it('renders heading and slots', async () => {
    const el = await fixture<PondPageHeader>(
      html`<pond-page-header heading="Projects">
        <span slot="actions">Act</span>
        Subtitle
      </pond-page-header>`
    )
    expect(el.shadowRoot?.querySelector('[part="title"]')?.textContent).toContain(
      'Projects'
    )
    expect(el.appearance).toBe('default')
  })

  it('supports plain', async () => {
    const el = await fixture<PondPageHeader>(
      html`<pond-page-header appearance="plain" heading="X"></pond-page-header>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondPageHeader>(
      html`<pond-page-header heading="Projects">Helpful subtitle</pond-page-header>`
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
