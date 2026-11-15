import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-avatar.js'

const meta: Meta = { title: 'Components/Avatar', component: 'pond-avatar' }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`<pond-avatar initials="LB" label="Luke"></pond-avatar>`
}
