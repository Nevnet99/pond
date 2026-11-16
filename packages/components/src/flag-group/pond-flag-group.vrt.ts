import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import '../flag/pond-flag.js'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-flag-group.js'
import type { PondFlagGroup } from './pond-flag-group.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-flag-group visual', () => {
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
    const el = await fixture<PondFlagGroup>(html`
      <pond-flag-group>
        <pond-flag tone="success" title="Saved">Changes stored.</pond-flag>
        <pond-flag tone="info" title="Syncing">Pulling updates…</pond-flag>
      </pond-flag-group>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('flag-group-default', el)
  })
})
