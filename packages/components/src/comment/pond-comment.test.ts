import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-comment.js'
import type { PondComment } from './pond-comment.js'

describe('pond-comment', () => {
  it('renders author, meta, and body', async () => {
    const el = await fixture<PondComment>(html`
      <pond-comment author="Ada" meta="2h ago">Hello</pond-comment>
    `)
    expect(el.shadowRoot?.querySelector('[part="author"]')?.textContent).toBe(
      'Ada'
    )
    expect(el.shadowRoot?.querySelector('[part="meta"]')?.textContent).toBe(
      '2h ago'
    )
  })

  it('shows actions when slotted', async () => {
    const el = await fixture<PondComment>(html`
      <pond-comment author="Ada">
        Body
        <button type="button" slot="actions">Reply</button>
      </pond-comment>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    expect(el.hasAttribute('data-has-actions')).toBe(true)
  })

  it('supports plain', async () => {
    const el = await fixture<PondComment>(
      html`<pond-comment appearance="plain" author="A">X</pond-comment>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondComment>(html`
      <pond-comment author="Ada" meta="now">Hello world</pond-comment>
    `)
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
