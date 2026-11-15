import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-progress-indicator.js'

const meta: Meta = {
  title: 'Feedback/Progress indicator',
  component: 'pond-progress-indicator'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-progress-indicator .steps=${4} .selected=${1}></pond-progress-indicator>`
}
