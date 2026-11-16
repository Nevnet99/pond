import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-grid.js'

const meta: Meta = {
  title: 'Foundations/Grid',
  component: 'pond-grid'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-grid columns="3" gap="3">
      <span>A</span><span>B</span><span>C</span>
    </pond-grid>
  `
}

export const Plain: Story = {
  render: () => html`<pond-grid appearance="plain"><span>a</span></pond-grid>`
}
