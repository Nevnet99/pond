import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../text-field/pond-text-field.js'
import '../button/pond-button.js'
import './pond-form.js'

const meta: Meta = { title: 'Forms/Form', component: 'pond-form' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-form style="max-width:20rem">
    <pond-text-field label="Name"></pond-text-field>
    <pond-button slot="actions" type="submit" label="Save"></pond-button>
  </pond-form>`
}
