import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-skeleton.js'

const meta: Meta = { title: 'Feedback/Skeleton', component: 'pond-skeleton' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<div style="display:grid;gap:0.75rem;width:20rem">
    <pond-skeleton></pond-skeleton>
    <pond-skeleton shape="rect"></pond-skeleton>
    <pond-skeleton shape="circle"></pond-skeleton>
  </div>`
}
