import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-table.js'
import type { PondTable } from './pond-table.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-table visual', () => {
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
    const el = await fixture<PondTable>(
      html`<pond-table
        caption="Team"
        .columns=${[
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' }
        ]}
        .rows=${[
          { name: 'Ada', role: 'Engineer' },
          { name: 'Grace', role: 'Lead' }
        ]}
      ></pond-table>`
    )
    await matchScreenshotAtViewports('table-default', el)
  })
})
