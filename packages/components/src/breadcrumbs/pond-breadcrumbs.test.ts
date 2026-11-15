import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-breadcrumbs.js'
import type { PondBreadcrumbs } from './pond-breadcrumbs.js'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Pond', current: true }
]

describe('pond-breadcrumbs', () => {
  it('renders trail with current page', async () => {
    const el = await fixture<PondBreadcrumbs>(
      html`<pond-breadcrumbs .items=${items}></pond-breadcrumbs>`
    )
    const current = el.shadowRoot?.querySelector('[aria-current="page"]')
    expect(current?.textContent?.trim()).toBe('Pond')
    expect(el.shadowRoot?.querySelectorAll('[part="link"]').length).toBe(3)
  })

  it('supports plain', async () => {
    const el = await fixture<PondBreadcrumbs>(
      html`<pond-breadcrumbs appearance="plain" .items=${items}></pond-breadcrumbs>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondBreadcrumbs>(
      html`<pond-breadcrumbs .items=${items}></pond-breadcrumbs>`
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
