import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../inline/pond-inline.js'
import './pond-icon.js'

const meta: Meta = { title: 'Media/Icon', component: 'pond-icon' }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-inline gap="3">
      <pond-icon name="check" label="Check"></pond-icon>
      <pond-icon name="close" label="Close"></pond-icon>
      <pond-icon name="info" label="Info"></pond-icon>
      <pond-icon name="warning" label="Warning"></pond-icon>
    </pond-inline>
  `
}
