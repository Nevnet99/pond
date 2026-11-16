import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-object.js'
import type { PondObject } from './pond-object.js'

describe('pond-object', () => {
  it('renders glyph for type', async () => {
    const el = await fixture<PondObject>(
      html`<pond-object type="folder" label="Folder"></pond-object>`
    )
    expect(el.shadowRoot?.querySelector('path')).toBeTruthy()
  })

  it('exposes label as img name', async () => {
    const el = await fixture<PondObject>(
      html`<pond-object type="document" label="Document"></pond-object>`
    )
    const root = el.shadowRoot?.querySelector('[part="root"]')
    expect(root?.getAttribute('role')).toBe('img')
    expect(root?.getAttribute('aria-label')).toBe('Document')
  })

  it('hides unlabeled objects from AT', async () => {
    const el = await fixture<PondObject>(
      html`<pond-object type="code"></pond-object>`
    )
    const root = el.shadowRoot?.querySelector('[part="root"]')
    expect(root?.getAttribute('aria-hidden')).toBe('true')
  })

  it('supports plain', async () => {
    const el = await fixture<PondObject>(
      html`<pond-object appearance="plain" type="link" label="Link"></pond-object>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondObject>(
      html`<pond-object type="person" label="Person"></pond-object>`
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
