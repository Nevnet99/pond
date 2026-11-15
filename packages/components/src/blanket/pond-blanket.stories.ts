import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-blanket.js'

const meta: Meta = { title: 'Overlays/Blanket', component: 'pond-blanket' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<div style="position:relative;min-height:12rem">
    <pond-blanket style="position:absolute">
      <div style="margin:auto;padding:1rem;background:white;border-radius:8px">Slotted content</div>
    </pond-blanket>
  </div>`
}
