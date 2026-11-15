import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-drawer.js'

const meta: Meta = { title: 'Overlays/Drawer', component: 'pond-drawer' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-drawer open title="Menu">
    <p>Compose your own nav — Pond does not ship a Navigation system.</p>
  </pond-drawer>`
}
