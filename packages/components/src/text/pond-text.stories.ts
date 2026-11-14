import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-text.js'

const meta: Meta = {
  title: 'Primitives/Text',
  component: 'pond-text',
  args: {
    content: 'The quick brown fox jumps over the lazy dog.',
    appearance: 'default',
    size: 'md',
    muted: false
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    }
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

export const Scale: Story = {
  render: () => html`
    <div style="display:grid; gap:1rem; max-width:40rem;">
      <pond-text size="xs">xs · 0.75rem — captions, meta, timestamps</pond-text>
      <pond-text size="sm">sm · 0.875rem — secondary body, helpers</pond-text>
      <pond-text size="md">md · 1rem — default body copy</pond-text>
      <pond-text size="lg">lg · 1.125rem — lead / intro paragraphs</pond-text>
      <pond-text size="xl">xl · 1.25rem — compact title-as-text</pond-text>
      <pond-text size="sm" muted>Muted helper text on the sm step</pond-text>
    </div>
  `
}

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
