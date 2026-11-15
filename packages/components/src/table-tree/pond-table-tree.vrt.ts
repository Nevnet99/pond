import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import './pond-table-tree.js'
import type { PondTableTree } from './pond-table-tree.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href

describe('pond-table-tree visual', () => {
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
    const el = await fixture<PondTableTree>(html`
      <pond-table-tree
        style="width:28rem"
        caption="Project"
        .columns=${[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' }
        ]}
        .nodes=${[
          {
            id: 'src',
            cells: { name: 'src', type: 'Folder' },
            children: [{ id: 'a', cells: { name: 'app.ts', type: 'File' } }]
          },
          { id: 'r', cells: { name: 'README.md', type: 'File' } }
        ]}
        .expandedIds=${['src']}
      ></pond-table-tree>
    `)
    await el.updateComplete
    await matchScreenshotAtViewports('table-tree-default', el)
  })
})
