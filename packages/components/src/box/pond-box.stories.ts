import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-box.js'

const meta: Meta = {
  title: 'Primitives/Box',
  component: 'pond-box',
  args: {
    padding: '4',
    background: 'surface',
    appearance: 'default'
  },
  argTypes: {
    appearance: { control: 'select', options: ['default', 'plain'] },
    padding: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '6', '8']
    },
    background: {
      control: 'select',
      options: ['transparent', 'canvas', 'surface', 'subtle']
    }
  }
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => html`
    <pond-box
      appearance=${args.appearance}
      padding=${args.padding}
      background=${args.background}>
      Box content
    </pond-box>
  `
}

export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
