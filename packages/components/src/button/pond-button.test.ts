import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it, vi } from 'vitest'
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

  it('defaults to primary and reflects other variants', async () => {
    const primary = await fixture<PondButton>(
      html`<pond-button>Go</pond-button>`
    )
    expect(primary.variant).toBe('primary')

    const danger = await fixture<PondButton>(
      html`<pond-button variant="danger">Delete</pond-button>`
    )
    expect(danger.variant).toBe('danger')
    expect(danger.getAttribute('variant')).toBe('danger')
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

  it('pending stays focusable, busy, and non-activating', async () => {
    const el = await fixture<PondButton>(
      html`<pond-button pending>Save</pond-button>`
    )
    const button = el.shadowRoot?.querySelector(
      '[part="button"]'
    ) as HTMLButtonElement
    expect(button.disabled).toBe(false)
    expect(button.getAttribute('aria-busy')).toBe('true')
    expect(button.getAttribute('aria-disabled')).toBe('true')
    expect(el.shadowRoot?.querySelector('[part="pending"]')).toBeTruthy()

    const spy = vi.fn()
    el.addEventListener('click', spy)
    button.click()
    expect(spy).not.toHaveBeenCalled()
  })

  it('disabled wins over pending for the native disabled attribute', async () => {
    const el = await fixture<PondButton>(
      html`<pond-button disabled pending>Save</pond-button>`
    )
    const button = el.shadowRoot?.querySelector(
      '[part="button"]'
    ) as HTMLButtonElement
    expect(button.disabled).toBe(true)
    expect(button.getAttribute('aria-busy')).toBeNull()
    expect(el.shadowRoot?.querySelector('[part="pending"]')).toBeNull()
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

  it('pending has no serious axe violations', async () => {
    const el = await fixture<PondButton>(
      html`<pond-button pending>Saving</pond-button>`
    )
    document.body.append(el)
    const results = await axe.run(el, {
      rules: {
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
