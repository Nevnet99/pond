import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-spinner.js'

const meta: Meta = { title: 'Feedback/Spinner', component: 'pond-spinner' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-spinner label="Loading"></pond-spinner>`
}
