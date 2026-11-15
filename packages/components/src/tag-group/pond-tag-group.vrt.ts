import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import '../tag/pond-tag.js'
import './pond-tag-group.js'
import type { PondTagGroup } from './pond-tag-group.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-tag-group visual', () => {
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
    const el = await fixture<PondTagGroup>(html`<pond-tag-group label="Labels">
      <pond-tag>Design</pond-tag><pond-tag>Lit</pond-tag><pond-tag>AA</pond-tag>
    </pond-tag-group>`)
    await matchScreenshotAtViewports('tag-group-default', el)
  })
})
