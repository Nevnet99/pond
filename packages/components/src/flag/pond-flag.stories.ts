import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-flag.js'

const meta: Meta = { title: 'Feedback/Flag', component: 'pond-flag' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-flag title="Saved" tone="success">Project settings updated.</pond-flag>`
}
