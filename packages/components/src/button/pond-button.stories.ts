import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-button.js'

const meta: Meta = {
  title: 'Components/Button',
  component: 'pond-button',
  args: {
    label: 'Save changes',
    appearance: 'default',
    disabled: false
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['default', 'plain']
    }
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-button
      appearance=${args.appearance}
      ?disabled=${args.disabled}>
      ${args.label}
    </pond-button>
  `
}

export const Plain: Story = {
  args: { appearance: 'plain', label: 'Unstyled action' },
  render: Default.render
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render
}
