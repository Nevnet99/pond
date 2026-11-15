import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-lozenge.js'

const meta: Meta = { title: 'Feedback/Lozenge', component: 'pond-lozenge' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-lozenge tone="success">Done</pond-lozenge>`
}
