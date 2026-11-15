import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../button/pond-button.js'
import '../text/pond-text.js'
import './pond-inline-dialog.js'

const meta: Meta = {
  title: 'Overlays/Inline dialog',
  component: 'pond-inline-dialog'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <div style="min-height: 12rem; padding: 1rem">
      <pond-inline-dialog open heading="Share this page">
        <pond-button slot="trigger" variant="subtle">Share</pond-button>
        <pond-text size="sm">Anyone with the link can view.</pond-text>
        <pond-button slot="actions" variant="primary">Copy link</pond-button>
      </pond-inline-dialog>
    </div>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-inline-dialog appearance="plain" open heading="Plain">
      <button type="button" slot="trigger">Open</button>
      <p>No Pond chrome.</p>
    </pond-inline-dialog>
  `
}
