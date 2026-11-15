import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-popup.js'

const meta: Meta = { title: 'Overlays/Popup', component: 'pond-popup' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-popup open label="Details">
    <button type="button" slot="trigger">Details</button>
    Brief anchored content.
  </pond-popup>`
}
