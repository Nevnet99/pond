import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-breadcrumbs.js'

const meta: Meta = {
  title: 'Components/Breadcrumbs',
  component: 'pond-breadcrumbs'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-breadcrumbs
      .items=${[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Pond', current: true }
      ]}
    ></pond-breadcrumbs>
  `
}
