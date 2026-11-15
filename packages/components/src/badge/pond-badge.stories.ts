import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-badge.js'

const meta: Meta = { title: 'Components/Badge', component: 'pond-badge' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-badge value="3"></pond-badge>`
}
