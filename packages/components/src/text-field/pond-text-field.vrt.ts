import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-text-field.js'
import type { PondTextField } from './pond-text-field.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-text-field visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())

  it('matches default field at mobile / tablet / desktop', async () => {
    const el = await fixture<PondTextField>(
      html`<pond-text-field label="Project name" value="Pond" style="width:280px"></pond-text-field>`
    )
    await matchScreenshotAtViewports('text-field-default', el)
  })
})
