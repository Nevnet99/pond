import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-section-message.js'

const meta: Meta = {
  title: 'Components/Section message',
  component: 'pond-section-message'
}
export default meta
type Story = StoryObj
export const Info: Story = {
  render: () =>
    html`<pond-section-message title="Tip">Fork Pond before customizing tokens.</pond-section-message>`
}
export const Danger: Story = {
  render: () =>
    html`<pond-section-message tone="danger" title="Error">Publish failed.</pond-section-message>`
}
