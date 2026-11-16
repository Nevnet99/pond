import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../button/pond-button.js'
import '../text/pond-text.js'
import './pond-comment.js'

const meta: Meta = {
  title: 'Data display/Comment',
  component: 'pond-comment'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-comment author="Ada Lovelace" meta="2 hours ago" style="max-width:24rem">
      <pond-text size="sm">Shipping the chart tomorrow — LGTM on the slice.</pond-text>
      <pond-button slot="actions" variant="subtle">Reply</pond-button>
    </pond-comment>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-comment appearance="plain" author="Ada">Plain comment</pond-comment>
  `
}
