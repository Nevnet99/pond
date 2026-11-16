import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-button.js'

const meta: Meta = {
  title: 'Forms/Button',
  component: 'pond-button',
  args: {
    label: 'Save changes',
    appearance: 'default',
    variant: 'primary',
    disabled: false,
    pending: false
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: ['default', 'plain']
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'subtle', 'danger', 'link']
    }
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-button
      appearance=${args.appearance}
      variant=${args.variant}
      ?disabled=${args.disabled}
      ?pending=${args.pending}>
      ${args.label}
    </pond-button>
  `
}

export const Variants: Story = {
  render: () => html`
    <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
      <pond-button variant="primary">Primary</pond-button>
      <pond-button variant="secondary">Secondary</pond-button>
      <pond-button variant="subtle">Subtle</pond-button>
      <pond-button variant="danger">Danger</pond-button>
      <pond-button variant="link">Link action</pond-button>
    </div>
  `
}

export const Primary: Story = {
  args: { variant: 'primary', label: 'Publish' },
  render: Default.render
}

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Cancel' },
  render: Default.render
}

export const Subtle: Story = {
  args: { variant: 'subtle', label: 'More options' },
  render: Default.render
}

export const Danger: Story = {
  args: { variant: 'danger', label: 'Delete project' },
  render: Default.render
}

export const Link: Story = {
  args: { variant: 'link', label: 'Learn more' },
  render: Default.render
}

export const Plain: Story = {
  args: { appearance: 'plain', label: 'Unstyled action' },
  render: Default.render
}

export const Disabled: Story = {
  args: { disabled: true },
  render: Default.render
}

export const Pending: Story = {
  args: { pending: true, label: 'Saving' },
  render: Default.render
}
