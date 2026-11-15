import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-text-field.js'

const meta: Meta = {
  title: 'Forms/Text field',
  component: 'pond-text-field',
  args: {
    label: 'Project name',
    value: '',
    disabled: false,
    invalid: false,
    errorMessage: '',
    appearance: 'default'
  },
  argTypes: {
    appearance: { control: 'select', options: ['default', 'plain'] }
  }
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-text-field
      appearance=${args.appearance}
      label=${args.label}
      .value=${args.value}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
      error-message=${args.errorMessage}></pond-text-field>
  `
}
export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'Enter a project name' },
  render: Default.render
}
export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
