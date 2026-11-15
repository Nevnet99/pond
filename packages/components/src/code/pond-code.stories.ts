import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-code.js'

const meta: Meta = { title: 'Data display/Code', component: 'pond-code' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<p>Run <pond-code>pnpm install</pond-code> to start.</p>`
}
export const Block: Story = {
  render: () => html`<pond-code variant="block">const x = 1
console.log(x)</pond-code>`
}
