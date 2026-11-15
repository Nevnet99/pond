import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-tag.js'

const meta: Meta = { title: 'Components/Tag', component: 'pond-tag' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-tag removable>Design</pond-tag>`
}
