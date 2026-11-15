import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-link.js'

const meta: Meta = {
  title: 'Forms/Link',
  component: 'pond-link',
  args: { label: 'Read the docs', href: '/docs', appearance: 'default' },
  argTypes: {
    appearance: { control: 'select', options: ['default', 'plain'] }
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-link appearance=${args.appearance} href=${args.href}
      >${args.label}</pond-link
    >
  `
}

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
