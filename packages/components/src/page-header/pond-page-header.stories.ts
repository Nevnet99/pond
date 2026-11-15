import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../breadcrumbs/pond-breadcrumbs.js'
import '../button/pond-button.js'
import '../tabs/pond-tabs.js'
import './pond-page-header.js'

const meta: Meta = {
  title: 'Components/Page header',
  component: 'pond-page-header'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-page-header heading="Pond">
      <pond-breadcrumbs
        slot="breadcrumbs"
        .items=${[
          { label: 'Home', href: '/' },
          { label: 'Pond', current: true }
        ]}
      ></pond-breadcrumbs>
      <pond-button slot="actions" variant="primary">New</pond-button>
      Fork-first Lit design system
      <pond-tabs
        slot="bottom"
        selected="overview"
        .items=${[
          { value: 'overview', label: 'Overview' },
          { value: 'usage', label: 'Usage' }
        ]}
      >
        <p slot="overview">Overview</p>
        <p slot="usage">Usage</p>
      </pond-tabs>
    </pond-page-header>
  `
}
