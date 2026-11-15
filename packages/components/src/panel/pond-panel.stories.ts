import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../button/pond-button.js'
import '../page/pond-page.js'
import '../page-header/pond-page-header.js'
import '../text/pond-text.js'
import './pond-panel.js'

const meta: Meta = {
  title: 'Navigation/Panel',
  component: 'pond-panel'
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => html`
    <pond-panel heading="Details" style="width: 18rem; min-height: 12rem; padding: 1rem; border: 1px solid var(--pond-color-border-default); background: var(--pond-color-bg-surface)">
      <pond-button slot="actions" variant="subtle">Edit</pond-button>
      <pond-text size="sm">Contextual fields and metadata for the selected item.</pond-text>
      <pond-button slot="footer" variant="primary">Save</pond-button>
    </pond-panel>
  `
}

export const InPage: Story = {
  render: () => html`
    <pond-page style="min-height: 20rem; border: 1px solid var(--pond-color-border-default)">
      <pond-page-header slot="header" heading="Projects">Catalog</pond-page-header>
      <pond-panel slot="panel" heading="Filters">
        <pond-text size="sm">Status, owner, and labels.</pond-text>
      </pond-panel>
      <pond-text>Main content</pond-text>
    </pond-page>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-panel appearance="plain" heading="Plain">
      <p>No Pond chrome.</p>
    </pond-panel>
  `
}
