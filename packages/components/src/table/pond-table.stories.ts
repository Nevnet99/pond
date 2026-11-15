import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-table.js'

const meta: Meta = { title: 'Data display/Table', component: 'pond-table' }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () =>
    html`<pond-table
      caption="Team"
      .columns=${[
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'status', label: 'Status' }
      ]}
      .rows=${[
        { name: 'Ada', role: 'Engineer', status: 'Active' },
        { name: 'Grace', role: 'Lead', status: 'Active' },
        { name: 'Alan', role: 'Research', status: 'Away' }
      ]}
    ></pond-table>`
}
