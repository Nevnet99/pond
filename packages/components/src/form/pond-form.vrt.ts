import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import '../text-field/pond-text-field.js'
import './pond-form.js'
import type { PondForm } from './pond-form.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-form visual', () => {
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
    const el =
      await fixture<PondForm>(html`<pond-form style="width:16rem" error="Check the fields">
      <pond-text-field label="Name"></pond-text-field>
    </pond-form>`)
    await matchScreenshotAtViewports('form-default', el)
  })
})
