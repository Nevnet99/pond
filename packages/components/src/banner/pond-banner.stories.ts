import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-banner.js'

const meta: Meta = { title: 'Feedback/Banner', component: 'pond-banner' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-banner closable>Maintenance window starts at 18:00 UTC.</pond-banner>`
}
