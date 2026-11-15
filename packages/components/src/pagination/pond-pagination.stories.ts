import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-pagination.js'

const meta: Meta = {
  title: 'Components/Pagination',
  component: 'pond-pagination'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () =>
    html`<pond-pagination page="2" page-count="5"></pond-pagination>`
}
