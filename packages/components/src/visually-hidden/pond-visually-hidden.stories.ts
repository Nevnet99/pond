import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-visually-hidden.js'

const meta: Meta = {
  title: 'Feedback/Visually hidden',
  component: 'pond-visually-hidden'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <p>
      Visible text
      <pond-visually-hidden>and a screen-reader-only note</pond-visually-hidden>
    </p>
  `
}
