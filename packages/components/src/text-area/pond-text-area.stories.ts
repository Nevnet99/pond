import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-text-area.js'

const meta: Meta = {
  title: 'Forms/Text area',
  component: 'pond-text-area',
  args: {
    label: 'Description',
    value: '',
    appearance: 'default',
    disabled: false
  }
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: (args) => html`
    <pond-text-area
      appearance=${args.appearance}
      label=${args.label}
      .value=${args.value}
      ?disabled=${args.disabled}></pond-text-area>
  `
}
export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
