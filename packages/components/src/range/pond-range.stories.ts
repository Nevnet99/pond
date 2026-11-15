import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-range.js'

const meta: Meta = { title: 'Forms/Range', component: 'pond-range' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () =>
    html`<pond-range label="Volume" style="max-width:16rem" .value=${65}></pond-range>`
}
