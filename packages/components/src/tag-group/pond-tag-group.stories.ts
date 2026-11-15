import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../tag/pond-tag.js'
import './pond-tag-group.js'

const meta: Meta = {
  title: 'Data display/Tag group',
  component: 'pond-tag-group'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-tag-group label="Labels">
    <pond-tag>Design</pond-tag><pond-tag>Lit</pond-tag><pond-tag>AA</pond-tag>
  </pond-tag-group>`
}
