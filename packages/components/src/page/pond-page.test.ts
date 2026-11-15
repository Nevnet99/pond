import { fixture, html } from '@open-wc/testing-helpers'
import * as axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import './pond-page.js'
import type { PondPage } from './pond-page.js'

describe('pond-page', () => {
  it('renders main content and optional regions', async () => {
    const el = await fixture<PondPage>(html`
      <pond-page>
        <div slot="banner">Banner</div>
        <nav slot="navigation">Nav</nav>
        <div slot="header">Header</div>
        <div slot="panel">Panel</div>
        <p>Body copy</p>
      </pond-page>
    `)
    await el.updateComplete
    // slotchange + updated() apply data-has-*
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    expect(el.hasAttribute('data-has-banner')).toBe(true)
    expect(el.hasAttribute('data-has-navigation')).toBe(true)
    expect(el.hasAttribute('data-has-header')).toBe(true)
    expect(el.hasAttribute('data-has-panel')).toBe(true)
    expect(el.shadowRoot?.querySelector('[part="content"]')).toBeTruthy()
  })

  it('hides unused regions', async () => {
    const el = await fixture<PondPage>(html`
      <pond-page><p>Only main</p></pond-page>
    `)
    await el.updateComplete
    await new Promise<void>((r) => requestAnimationFrame(() => r()))
    expect(el.hasAttribute('data-has-banner')).toBe(false)
    expect(el.hasAttribute('data-has-navigation')).toBe(false)
    expect(el.hasAttribute('data-has-panel')).toBe(false)
  })

  it('supports plain', async () => {
    const el = await fixture<PondPage>(
      html`<pond-page appearance="plain"><p>X</p></pond-page>`
    )
    expect(el.appearance).toBe('plain')
  })

  it('exposes a named size container for responsive stacking', async () => {
    const el = await fixture<PondPage>(html`<pond-page><p>X</p></pond-page>`)
    const style = getComputedStyle(el)
    expect(style.containerType).toBe('inline-size')
    expect(style.containerName).toBe('pond-page')
  })

  it('has no serious axe violations', async () => {
    const el = await fixture<PondPage>(html`
      <pond-page>
        <div slot="header"><h1>Projects</h1></div>
        <p>Catalog body</p>
      </pond-page>
    `)
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
