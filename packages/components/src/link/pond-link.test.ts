import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-link.js'
import type { PondLink } from './pond-link.js'

describe('pond-link', () => {
  it('renders an anchor with href', async () => {
    const el = await fixture<PondLink>(
      html`<pond-link href="/docs">Docs</pond-link>`
    )
    const a = el.shadowRoot?.querySelector('[part="link"]') as HTMLAnchorElement
    expect(a.href).toContain('/docs')
    expect(el.textContent).toContain('Docs')
  })

  it('adds noopener for target=_blank', async () => {
    const el = await fixture<PondLink>(
      html`<pond-link href="https://example.com" target="_blank">Ext</pond-link>`
    )
    const a = el.shadowRoot?.querySelector('[part="link"]') as HTMLAnchorElement
    expect(a.rel).toContain('noopener')
  })

  it('supports appearance=plain', async () => {
    const el = await fixture<PondLink>(
      html`<pond-link appearance="plain" href="/x">x</pond-link>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondLink>(
      html`<pond-link href="/a">Accessible</pond-link>`
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
