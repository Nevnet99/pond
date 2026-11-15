import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../button/pond-button.js'
import './pond-empty-state.js'

const meta: Meta = {
  title: 'Feedback/Empty state',
  component: 'pond-empty-state'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-empty-state heading="No projects">
    Create a project to get started.
    <pond-button slot="actions" variant="primary">New project</pond-button>
  </pond-empty-state>`
}
