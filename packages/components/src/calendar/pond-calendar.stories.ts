import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-calendar.js'

const meta: Meta = { title: 'Forms/Calendar', component: 'pond-calendar' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-calendar value="2026-11-15"></pond-calendar>`
}
