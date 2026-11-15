import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-date-time-picker.js'

const meta: Meta = {
  title: 'Forms/Date time picker',
  component: 'pond-date-time-picker'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-date-time-picker label="When" value="2026-11-15T14:30"></pond-date-time-picker>`
}
