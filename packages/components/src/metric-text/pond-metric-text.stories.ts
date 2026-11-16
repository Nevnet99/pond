import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-metric-text.js'

const meta: Meta = {
  title: 'Foundations/Metric text',
  component: 'pond-metric-text'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <div style="display:flex;gap:1.5rem;align-items:baseline">
      <pond-metric-text size="sm">12</pond-metric-text>
      <pond-metric-text>48</pond-metric-text>
      <pond-metric-text size="xl">1.2k</pond-metric-text>
    </div>
  `
}

export const Plain: Story = {
  render: () => html`<pond-metric-text appearance="plain">99</pond-metric-text>`
}
