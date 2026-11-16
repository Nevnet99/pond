import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-time-picker.js'

const meta: Meta = {
  title: 'Forms/Time picker',
  component: 'pond-time-picker'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-time-picker label="Start time" value="09:30"></pond-time-picker>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-time-picker appearance="plain" label="Plain" value="12:00"></pond-time-picker>
  `
}
