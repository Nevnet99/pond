import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-inline-message.js'

const meta: Meta = {
  title: 'Feedback/Inline message',
  component: 'pond-inline-message'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-inline-message tone="danger" title="Email">Enter a valid address.</pond-inline-message>`
}
