import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-dynamic-table.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'team', label: 'Team' }
]
const rows = [
  { name: 'Ada', role: 'Lead', team: 'Platform' },
  { name: 'Bea', role: 'QA', team: 'Quality' },
  { name: 'Cal', role: 'Dev', team: 'Platform' },
  { name: 'Dee', role: 'PM', team: 'Product' },
  { name: 'Eve', role: 'Dev', team: 'Design' },
  { name: 'Fay', role: 'Dev', team: 'Platform' }
]

const meta: Meta = {
  title: 'Data display/Dynamic table',
  component: 'pond-dynamic-table'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-dynamic-table
      caption="People"
      .columns=${columns}
      .rows=${rows}
      page-size="3"
    ></pond-dynamic-table>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-dynamic-table
      appearance="plain"
      .columns=${columns}
      .rows=${rows.slice(0, 2)}
    ></pond-dynamic-table>
  `
}
