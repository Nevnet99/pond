import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-spotlight.js'

const meta: Meta = {
  title: 'Feedback/Spotlight',
  component: 'pond-spotlight'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <div style="min-height:12rem;padding:1rem">
      <button type="button" id="spot-target">Create issue</button>
      <pond-spotlight
        open
        target="#spot-target"
        heading="Create an issue"
        label="Create tip"
      >
        Start here when you want a new work item.
      </pond-spotlight>
    </div>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-spotlight appearance="plain" open heading="Tip">Body</pond-spotlight>
  `
}
