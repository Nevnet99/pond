import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-tooltip.js'

const meta: Meta = { title: 'Components/Tooltip', component: 'pond-tooltip' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-tooltip content="More about this"><button type="button">Hover me</button></pond-tooltip>`
}
