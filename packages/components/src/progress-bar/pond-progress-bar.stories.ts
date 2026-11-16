import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-progress-bar.js'

const meta: Meta = {
  title: 'Feedback/Progress bar',
  component: 'pond-progress-bar'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-progress-bar
      style="width:20rem"
      .value=${0.65}
      label="Upload"
    ></pond-progress-bar>`
}
export const Indeterminate: Story = {
  render: () =>
    html`<pond-progress-bar
      style="width:20rem"
      indeterminate
      label="Loading"
    ></pond-progress-bar>`
}
