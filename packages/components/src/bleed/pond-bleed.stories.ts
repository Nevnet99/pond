import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-bleed.js'

const meta: Meta = {
  title: 'Foundations/Bleed',
  component: 'pond-bleed'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <div style="padding:1rem;border:1px dashed #888">
      <pond-bleed inline="4">
        <div style="background:var(--pond-color-bg-subtle);padding:0.5rem">Bleeds inline</div>
      </pond-bleed>
    </div>
  `
}

export const Plain: Story = {
  render: () => html`<pond-bleed appearance="plain"><span>a</span></pond-bleed>`
}
