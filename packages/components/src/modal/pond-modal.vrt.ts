import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { VRT_VIEWPORTS } from '../test/viewports.js'
import './pond-modal.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-modal visual', () => {
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

  it('matches open modal at mobile / tablet / desktop', async () => {
    await fixture(html`
      <pond-modal open title="Confirm"><p>Are you sure?</p></pond-modal>
    `)
    for (const vp of VRT_VIEWPORTS) {
      await page.viewport(vp.width, vp.height)
      await expect(page).toMatchScreenshot(`modal-open-${vp.name}`)
    }
  })
})
