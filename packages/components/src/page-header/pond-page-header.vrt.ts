import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import '../breadcrumbs/pond-breadcrumbs.js'
import '../button/pond-button.js'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-page-header.js'
import type { PondPageHeader } from './pond-page-header.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-page-header visual', () => {
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
    const el = await fixture<PondPageHeader>(
      html`<pond-page-header heading="Projects" style="width:24rem">
        <pond-breadcrumbs
          slot="breadcrumbs"
          .items=${[
            { label: 'Home', href: '/' },
            { label: 'Projects', current: true }
          ]}
        ></pond-breadcrumbs>
        <pond-button slot="actions" variant="primary">New</pond-button>
        Design system catalog
      </pond-page-header>`
    )
    await matchScreenshotAtViewports('page-header-default', el)
  })
})
