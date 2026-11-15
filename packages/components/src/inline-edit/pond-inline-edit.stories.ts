import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-inline-edit.js'

const meta: Meta = { title: 'Forms/Inline edit', component: 'pond-inline-edit' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-inline-edit style="max-width:16rem" value="Ada Lovelace" label="Name"></pond-inline-edit>`
}
