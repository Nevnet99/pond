import type { Meta, StoryObj } from '@storybook/web-components-vite'
import { html } from 'lit'
import './pond-logo.js'

const meta: Meta = {
  title: 'Media/Logo',
  component: 'pond-logo'
}
export default meta
type Story = StoryObj

const mark = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%23256EFF"/><text x="16" y="22" text-anchor="middle" font-size="14" font-family="sans-serif" fill="white">P</text></svg>`
)}`

export const Default: Story = {
  render: () => html`
    <div style="display:flex;gap:1.5rem;align-items:center">
      <pond-logo src=${mark} alt="">Pond</pond-logo>
      <pond-logo size="lg" src=${mark} alt="" href="/">Pond</pond-logo>
    </div>
  `
}

export const WordmarkOnly: Story = {
  render: () => html`<pond-logo alt="Pond">Pond</pond-logo>`
}

export const Plain: Story = {
  render: () =>
    html`<pond-logo appearance="plain" src=${mark} alt="">Pond</pond-logo>`
}
