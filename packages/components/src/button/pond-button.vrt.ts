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

  it('matches default button screenshot', async () => {
    const el = await fixture<PondButton>(
      html`<pond-button>Save changes</pond-button>`
    )
    await expect.element(el).toMatchScreenshot('button-default')
  })
})
