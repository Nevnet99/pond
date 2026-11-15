import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it, vi } from 'vitest'
import './pond-form.js'
import type { PondForm } from './pond-form.js'

describe('pond-form', () => {
  it('emits pond-submit', async () => {
    const el = await fixture<PondForm>(html`<pond-form>
      <button type="submit" slot="actions">Save</button>
    </pond-form>`)
    const spy = vi.fn()
    el.addEventListener('pond-submit', spy)
    el.shadowRoot?.querySelector('form')?.requestSubmit()
    expect(spy).toHaveBeenCalled()
  })
  it('shows error alert', async () => {
    const el = await fixture<PondForm>(
      html`<pond-form error="Required"></pond-form>`
    )
    expect(el.shadowRoot?.querySelector('[role="alert"]')?.textContent).toBe(
      'Required'
    )
  })
  it('supports plain', async () => {
    const el = await fixture<PondForm>(
      html`<pond-form appearance="plain"></pond-form>`
    )
    expect(el.appearance).toBe('plain')
  })
  it('has no serious axe violations', async () => {
    const el = await fixture<PondForm>(
      html`<pond-form error="Required"><p>Field</p></pond-form>`
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
