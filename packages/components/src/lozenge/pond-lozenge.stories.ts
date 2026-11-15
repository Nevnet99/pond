import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-lozenge.js'

const meta: Meta = { title: 'Components/Lozenge', component: 'pond-lozenge' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-lozenge tone="success">Done</pond-lozenge>`
}
