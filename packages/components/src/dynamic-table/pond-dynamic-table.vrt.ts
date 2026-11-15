import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-dynamic-table.js'
import type { PondDynamicTable } from './pond-dynamic-table.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-dynamic-table visual', () => {
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
    const el = await fixture<PondDynamicTable>(html`
      <pond-dynamic-table
        style="width:28rem"
        caption="People"
        .columns=${[
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' }
        ]}
        .rows=${[
          { name: 'Ada', role: 'Lead' },
          { name: 'Bea', role: 'QA' },
          { name: 'Cal', role: 'Dev' }
        ]}
        page-size="2"
      ></pond-dynamic-table>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('dynamic-table-default', el)
  })
})
