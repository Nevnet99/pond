import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-select.js'

const options = [
  { value: 's', label: 'Small' },
  { value: 'm', label: 'Medium' },
  { value: 'l', label: 'Large' }
]

const meta: Meta = { title: 'Forms/Select', component: 'pond-select' }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () =>
    html`<pond-select label="Size" value="m" style="max-width:16rem" .options=${options}></pond-select>`
}

export const Multiple: Story = {
  render: () =>
    html`<pond-select
      label="Sizes"
      multiple
      style="max-width:16rem"
      .options=${options}
      .values=${['s', 'l']}
    ></pond-select>`
}
