import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-radio.js'

const meta: Meta = { title: 'Forms/Radio', component: 'pond-radio' }
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-radio label="Size" value="m"
    .options=${[{ value: 's', label: 'Small' }, { value: 'm', label: 'Medium' }, { value: 'l', label: 'Large' }]}></pond-radio>`
}
