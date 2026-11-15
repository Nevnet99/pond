import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../avatar/pond-avatar.js'
import './pond-avatar-group.js'

const meta: Meta = {
  title: 'Media/Avatar group',
  component: 'pond-avatar-group'
}
export default meta
type Story = StoryObj
export const Default: Story = {
  render: () => html`<pond-avatar-group label="Team">
    <pond-avatar initials="AB"></pond-avatar>
    <pond-avatar initials="CD"></pond-avatar>
    <pond-avatar initials="EF"></pond-avatar>
  </pond-avatar-group>`
}
