import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../flag/pond-flag.js'
import './pond-flag-group.js'

const meta: Meta = {
  title: 'Feedback/Flag group',
  component: 'pond-flag-group'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-flag-group label="Notifications">
      <pond-flag tone="success" title="Saved">Changes stored.</pond-flag>
      <pond-flag tone="info" title="Syncing">Pulling updates…</pond-flag>
    </pond-flag-group>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-flag-group appearance="plain" label="Notifications">
      <pond-flag appearance="plain" title="A">A</pond-flag>
    </pond-flag-group>
  `
}
