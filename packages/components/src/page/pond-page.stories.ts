import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../banner/pond-banner.js'
import '../button/pond-button.js'
import '../page-header/pond-page-header.js'
import '../text/pond-text.js'
import './pond-page.js'

const meta: Meta = {
  title: 'Navigation/Page',
  component: 'pond-page'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  parameters: { layout: 'padded' },
  render: () => html`
    <pond-page
      style="width:100%; min-height:24rem; border:1px solid var(--pond-color-border-default)"
    >
      <pond-banner slot="banner" tone="info">Fork-first Lit design system</pond-banner>
      <div slot="navigation" style="padding: 1rem">
        <pond-text size="sm" muted>Navigation slot</pond-text>
      </div>
      <pond-page-header slot="header" heading="Projects">
        <pond-button slot="actions" variant="primary">New</pond-button>
        Design system catalog
      </pond-page-header>
      <div slot="panel">
        <pond-text size="sm">Contextual panel</pond-text>
      </div>
      <pond-text>Main content lives in the default slot.</pond-text>
    </pond-page>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-page appearance="plain">
      <p>Plain page — no Pond chrome.</p>
    </pond-page>
  `
}
