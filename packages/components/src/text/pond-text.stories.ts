import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-text.js'

const meta: Meta = {
  title: 'Primitives/Text',
  component: 'pond-text',
  args: {
    content: 'Body copy for product UI.',
    appearance: 'default',
    size: 'md',
    muted: false
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-text
      appearance=${args.appearance}
      size=${args.size}
      ?muted=${args.muted}>
      ${args.content}
    </pond-text>
  `
}

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
