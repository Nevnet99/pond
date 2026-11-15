import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-date-label.js'

const meta: Meta = {
  title: 'Data display/Date label',
  component: 'pond-date-label'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-date-label value="2026-11-15"></pond-date-label>`
}
