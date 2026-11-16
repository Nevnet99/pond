import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-image.js'

const PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

const meta: Meta = {
  title: 'Media/Image',
  component: 'pond-image'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-image
      src=${PIXEL}
      alt="Sample swatch"
      caption="Theme-aware image"
      style="width: 12rem"
    ></pond-image>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-image appearance="plain" src=${PIXEL} alt="Plain"></pond-image>
  `
}
