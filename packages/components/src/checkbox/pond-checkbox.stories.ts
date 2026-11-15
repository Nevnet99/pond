import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-checkbox.js'

const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'pond-checkbox',
  args: { label: 'Accept terms', checked: false, appearance: 'default' }
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: (a) =>
    html`<pond-checkbox appearance=${a.appearance} label=${a.label} ?checked=${a.checked}></pond-checkbox>`
}
export const Plain: Story = {
  args: { appearance: 'plain' },
  render: Default.render
}
