import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-button.js'
import type { PondButton } from './pond-button.js'

describe('pond-button', () => {
  it('renders a native button with slotted label', async () => {
    const el = await fixture<PondButton>(html`<pond-button>Save</pond-button>`)
    const button = el.shadowRoot?.querySelector('[part="button"]')
    expect(button).toBeTruthy()
    expect(el.textContent).toContain('Save')
  })

  it('supports appearance=plain', async () => {
    const el = await fixture<PondButton>(
      html`<pond-button appearance="plain">Plain</pond-button>`
    )
    expect(el.appearance).toBe('plain')
    expect(el.getAttribute('appearance')).toBe('plain')
  })

  it('disables the native button', async () => {
    const el = await fixture<PondButton>(
      html`<pond-button disabled>Nope</pond-button>`
    )
    const button = el.shadowRoot?.querySelector(
      '[part="button"]'
    ) as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondButton>(
      html`<pond-button>Accessible</pond-button>`
    )
    document.body.append(el)
    const results = await axe.run(el, {
      rules: {
        // Host custom elements are fine; region noise off
        region: { enabled: false }
      }
    })
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    )
    expect(serious).toEqual([])
    el.remove()
  })
})
