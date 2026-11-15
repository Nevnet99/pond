import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-toggle.js'

const meta: Meta = {
  title: 'Forms/Toggle',
  component: 'pond-toggle',
  args: { label: 'Notifications', checked: false }
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: (a) =>
    html`<pond-toggle label=${a.label} ?checked=${a.checked}></pond-toggle>`
}
