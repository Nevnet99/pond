import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import './pond-button.js'
import type { PondButton } from './pond-button.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-button visual', () => {
  let link: HTMLLinkElement

  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })

  afterEach(() => {
    link.remove()
  })

  it('matches primary button screenshot', async () => {
    const el = await fixture<PondButton>(
      html`<pond-button variant="primary">Save changes</pond-button>`
    )
    await expect.element(el).toMatchScreenshot('button-primary')
  })

  it('matches all variants row', async () => {
    const el = await fixture<HTMLDivElement>(
      html`<div style="display:flex;gap:12px;align-items:center;padding:8px;">
        <pond-button variant="primary">Primary</pond-button>
        <pond-button variant="secondary">Secondary</pond-button>
        <pond-button variant="subtle">Subtle</pond-button>
        <pond-button variant="danger">Danger</pond-button>
        <pond-button variant="link">Link action</pond-button>
      </div>`
    )
    await expect.element(el).toMatchScreenshot('button-variants')
  })
})
