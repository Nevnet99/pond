import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../button/pond-button.js'
import './pond-modal.js'

const meta: Meta = { title: 'Components/Modal', component: 'pond-modal' }
export default meta
type Story = StoryObj
export const Open: Story = {
  render: () => html`
    <pond-modal open title="Delete project">
      <p>This cannot be undone.</p>
      <pond-button slot="actions" variant="danger">Delete</pond-button>
    </pond-modal>
  `
}
