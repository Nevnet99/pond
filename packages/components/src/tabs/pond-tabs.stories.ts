import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-tabs.js'

const meta: Meta = { title: 'Components/Tabs', component: 'pond-tabs' }
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-tabs
      selected="overview"
      .items=${[
        { value: 'overview', label: 'Overview' },
        { value: 'usage', label: 'Usage' },
        { value: 'a11y', label: 'Accessibility' }
      ]}
    >
      <p slot="overview">Overview panel</p>
      <p slot="usage">Usage panel</p>
      <p slot="a11y">Accessibility panel</p>
    </pond-tabs>
  `
}
