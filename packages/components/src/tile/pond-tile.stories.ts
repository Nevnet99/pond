import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-tile.js'

const meta: Meta = {
  title: 'Media/Tile',
  component: 'pond-tile'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <div style="display:flex;gap:0.75rem">
      <pond-tile label="Document">Doc</pond-tile>
      <pond-tile size="lg" label="Folder">Folder</pond-tile>
    </div>
  `
}

export const Plain: Story = {
  render: () => html`<pond-tile appearance="plain" label="X">X</pond-tile>`
}
