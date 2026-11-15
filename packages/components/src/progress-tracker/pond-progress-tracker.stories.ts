import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-progress-tracker.js'

const meta: Meta = {
  title: 'Feedback/Progress tracker',
  component: 'pond-progress-tracker'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-progress-tracker .steps=${[
      { label: 'Details', status: 'done' },
      { label: 'Review', status: 'current' },
      { label: 'Confirm', status: 'todo' }
    ]}></pond-progress-tracker>`
}
