import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../text/pond-text.js'
import './pond-stack.js'

const meta: Meta = {
  title: 'Primitives/Stack',
  component: 'pond-stack',
  args: { gap: '4', align: 'stretch', appearance: 'default' },
  argTypes: {
    appearance: { control: 'select', options: ['default', 'plain'] },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '6', '8']
    },
    align: {
      control: 'select',
      options: ['stretch', 'start', 'center', 'end']
    }
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-stack
      appearance=${args.appearance}
      gap=${args.gap}
      align=${args.align}>
      <pond-text>First</pond-text>
      <pond-text>Second</pond-text>
      <pond-text>Third</pond-text>
    </pond-stack>
  `
}

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
