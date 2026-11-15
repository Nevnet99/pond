import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-menu.js'

const meta: Meta = { title: 'Overlays/Menu', component: 'pond-menu' }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-menu
      open
      label="Actions"
      .items=${[
        { value: 'edit', label: 'Edit' },
        { value: 'duplicate', label: 'Duplicate' },
        { value: 'delete', label: 'Delete', danger: true }
      ]}
    ></pond-menu>
  `
}
