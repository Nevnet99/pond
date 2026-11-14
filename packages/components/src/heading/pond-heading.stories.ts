import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-heading.js'

const meta: Meta = {
  title: 'Primitives/Heading',
  component: 'pond-heading',
  args: {
    content: 'Section title',
    level: 2,
    appearance: 'default'
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-heading appearance=${args.appearance} level=${args.level}>
      ${args.content}
    </pond-heading>
  `
}

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
