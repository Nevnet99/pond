import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-inline-edit.js'
import type { PondInlineEdit } from './pond-inline-edit.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-inline-edit visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())
  it('matches at mobile / tablet / desktop', async () => {
    const el = await fixture<PondInlineEdit>(
      html`<pond-inline-edit style="width:16rem" value="Ada Lovelace" label="Name"></pond-inline-edit>`
    )
    await matchScreenshotAtViewports('inline-edit-default', el)
  })
})
