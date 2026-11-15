import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-select.js'

const options = [
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large' }
]
const meta: Meta = {
  title: 'Components/Select',
  component: 'pond-select',
  args: { label: 'Size', value: 'm' }
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: (a) =>
    html`<pond-select label=${a.label} value=${a.value} .options=${options}></pond-select>`
}
