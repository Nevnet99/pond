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
  },
  argTypes: {
    level: { control: { type: 'number', min: 1, max: 6, step: 1 } },
    size: {
      control: 'select',
      options: ['', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl']
    }
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) =>
    args.size
      ? html`
          <pond-heading
            appearance=${args.appearance}
            level=${args.level}
            size=${args.size}>
            ${args.content}
          </pond-heading>
        `
      : html`
          <pond-heading appearance=${args.appearance} level=${args.level}>
            ${args.content}
          </pond-heading>
        `
}

export const Levels: Story = {
  render: () => html`
    <div style="display:grid; gap:1rem;">
      <pond-heading level="1">h1 · 5xl — page title</pond-heading>
      <pond-heading level="2">h2 · 4xl — section</pond-heading>
      <pond-heading level="3">h3 · 3xl — subsection</pond-heading>
      <pond-heading level="4">h4 · 2xl</pond-heading>
      <pond-heading level="5">h5 · xl</pond-heading>
      <pond-heading level="6">h6 · lg</pond-heading>
    </div>
  `
}

export const DecoupledSize: Story = {
  name: 'Level vs size',
  render: () => html`
    <div style="display:grid; gap:1rem; max-width:36rem;">
      <pond-heading level="2" size="lg"
        >h2 at lg — keep outline level, shrink visually</pond-heading
      >
      <pond-heading level="3" size="4xl"
        >h3 at 4xl — emphasize without skipping levels</pond-heading
      >
    </div>
  `
}

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
