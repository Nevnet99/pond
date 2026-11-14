import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../button/pond-button.js'
import './pond-inline.js'

const meta: Meta = {
  title: 'Primitives/Inline',
  component: 'pond-inline',
  args: {
    gap: '2',
    align: 'center',
    justify: 'start',
    wrap: false,
    appearance: 'default'
  },
  argTypes: {
    appearance: { control: 'select', options: ['default', 'plain'] },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '6', '8']
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline']
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around']
    }
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-inline
      appearance=${args.appearance}
      gap=${args.gap}
      align=${args.align}
      justify=${args.justify}
      ?wrap=${args.wrap}>
      <pond-button variant="primary">Save</pond-button>
      <pond-button variant="secondary">Cancel</pond-button>
      <pond-button variant="subtle">More</pond-button>
    </pond-inline>
  `
}

export const Wrap: Story = {
  args: { wrap: true, gap: '3' },
  render: Default.render
}

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
