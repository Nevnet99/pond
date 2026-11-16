import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import '../page/pond-page.js'
import '../page-header/pond-page-header.js'
import '../text/pond-text.js'
import './pond-side-nav.js'

const meta: Meta = {
  title: 'Navigation/Side nav',
  component: 'pond-side-nav'
}
export default meta
type Story = StoryObj

const rail = html`
  <pond-side-nav style="width: 15rem; border: 1px solid var(--pond-color-border-default); background: var(--pond-color-bg-surface)">
    <pond-side-nav-section heading="Plan">
      <pond-side-nav-item href="#board" current>
        <span slot="icon" aria-hidden="true">▣</span>
        Board
      </pond-side-nav-item>
      <pond-side-nav-item href="#list">
        <span slot="icon" aria-hidden="true">☰</span>
        List
      </pond-side-nav-item>
    </pond-side-nav-section>
    <pond-side-nav-section heading="Work">
      <pond-side-nav-item href="#issues">
        Issues
        <pond-side-nav-item slot="nested" href="#mine">Mine</pond-side-nav-item>
        <pond-side-nav-item slot="nested" href="#reported"
          >Reported</pond-side-nav-item
        >
      </pond-side-nav-item>
      <pond-side-nav-item>Filters</pond-side-nav-item>
    </pond-side-nav-section>
  </pond-side-nav>
`

export const Default: Story = {
  render: () => rail
}

export const InPage: Story = {
  render: () => html`
    <pond-page style="min-height: 20rem; border: 1px solid var(--pond-color-border-default)">
      <pond-side-nav slot="navigation">
        <pond-side-nav-section heading="Plan">
          <pond-side-nav-item href="#board" current>Board</pond-side-nav-item>
          <pond-side-nav-item href="#list">List</pond-side-nav-item>
        </pond-side-nav-section>
      </pond-side-nav>
      <pond-page-header slot="header" heading="Board">Sprint</pond-page-header>
      <pond-text>Main content</pond-text>
    </pond-page>
  `
}

export const CollapsedRail: Story = {
  render: () => html`
    <pond-side-nav
      collapsed
      style="border: 1px solid var(--pond-color-border-default); background: var(--pond-color-bg-surface)"
    >
      <pond-side-nav-section heading="Plan">
        <pond-side-nav-item href="#board" current>
          <span slot="icon" aria-hidden="true">▣</span>
          Board
        </pond-side-nav-item>
        <pond-side-nav-item href="#list">
          <span slot="icon" aria-hidden="true">☰</span>
          List
        </pond-side-nav-item>
      </pond-side-nav-section>
    </pond-side-nav>
  `
}

export const Plain: Story = {
  render: () => html`
    <pond-side-nav appearance="plain" label="Plain nav">
      <pond-side-nav-section appearance="plain" heading="Only">
        <pond-side-nav-item appearance="plain" href="#a">A</pond-side-nav-item>
      </pond-side-nav-section>
    </pond-side-nav>
  `
}
