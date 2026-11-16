import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-object.js'
import type { PondObjectType } from './pond-object.js'

const meta: Meta = {
  title: 'Media/Object',
  component: 'pond-object'
}
export default meta
type Story = StoryObj

const types: PondObjectType[] = [
  'document',
  'folder',
  'link',
  'image',
  'code',
  'person'
]

export const Default: Story = {
  render: () => html`
    <div style="display:flex;gap:0.75rem;align-items:center">
      ${types.map(
        (type) => html`<pond-object type=${type} label=${type}></pond-object>`
      )}
    </div>
  `
}

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:0.75rem;align-items:end">
      <pond-object size="sm" type="folder" label="Folder"></pond-object>
      <pond-object type="folder" label="Folder"></pond-object>
      <pond-object size="lg" type="folder" label="Folder"></pond-object>
    </div>
  `
}

export const Plain: Story = {
  render: () =>
    html`<pond-object appearance="plain" type="document" label="Doc"></pond-object>`
}
