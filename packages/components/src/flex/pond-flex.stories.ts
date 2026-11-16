import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-flex.js'

const meta: Meta = {
  title: 'Foundations/Flex',
  component: 'pond-flex'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-flex gap="3" justify="between">
      <span>Left</span><span>Right</span>
    </pond-flex>
  `
}

export const Plain: Story = {
  render: () => html`<pond-flex appearance="plain"><span>a</span></pond-flex>`
}
