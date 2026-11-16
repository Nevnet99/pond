import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-table-tree.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type' }
]
const nodes = [
  {
    id: 'src',
    cells: { name: 'src', type: 'Folder' },
    children: [
      { id: 'src-a', cells: { name: 'app.ts', type: 'File' } },
      {
        id: 'src-b',
        cells: { name: 'components', type: 'Folder' },
        children: [
          { id: 'src-b-1', cells: { name: 'button.ts', type: 'File' } }
        ]
      }
    ]
  },
  { id: 'readme', cells: { name: 'README.md', type: 'File' } }
]

const meta: Meta = {
  title: 'Data display/Table tree',
  component: 'pond-table-tree'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-table-tree
      caption="Project"
      .columns=${columns}
      .nodes=${nodes}
      .expandedIds=${['src']}
    ></pond-table-tree>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-table-tree
      appearance="plain"
      .columns=${columns}
      .nodes=${nodes}
    ></pond-table-tree>
  `
}
