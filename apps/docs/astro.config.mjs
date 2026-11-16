import path from 'node:path'
import { fileURLToPath } from 'node:url'
import starlight from '@astrojs/starlight'
import { defineConfig, passthroughImageService } from 'astro/config'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  site: 'https://nevnet99.github.io/pond',
  image: {
    service: passthroughImageService()
  },
  vite: {
    resolve: {
      alias: {
        '@pond/tokens/plain.css': path.resolve(
          root,
          '../../packages/tokens/css/plain.css'
        ),
        '@pond/components': path.resolve(
          root,
          '../../packages/components/src/index.ts'
        )
      }
    },
    optimizeDeps: {
      include: ['lit', 'lit/decorators.js']
    },
    esbuild: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
          useDefineForClassFields: false
        }
      }
    }
  },
  integrations: [
    starlight({
      title: 'Pond',
      description: 'Fork-first Lit design system — WCAG AA, brandable tokens.',
      customCss: ['./src/styles/pond-docs.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Nevnet99/pond'
        }
      ],
      sidebar: [
        {
          label: 'Getting started',
          items: [
            { label: 'Introduction', slug: 'index' },
            { label: 'Install / fork', slug: 'getting-started/fork' }
          ]
        },
        {
          label: 'Theming',
          items: [
            { label: 'Tokens & themes', slug: 'theming/tokens' },
            { label: 'Spacing', slug: 'theming/spacing' },
            { label: 'Motion', slug: 'theming/motion' },
            { label: 'Typography', slug: 'theming/typography' }
          ]
        },
        {
          label: 'Primitives',
          items: [
            { label: 'Box', slug: 'primitives/box' },
            { label: 'Stack', slug: 'primitives/stack' },
            { label: 'Inline', slug: 'primitives/inline' },
            { label: 'Text', slug: 'primitives/text' },
            { label: 'Heading', slug: 'primitives/heading' }
          ]
        },
        {
          label: 'Forms',
          items: [
            { label: 'Button', slug: 'components/button' },
            { label: 'Link', slug: 'components/link' },
            { label: 'Text field', slug: 'components/text-field' },
            { label: 'Text area', slug: 'components/text-area' },
            { label: 'Calendar', slug: 'components/calendar' },
            { label: 'Date time picker', slug: 'components/date-time-picker' },
            { label: 'Time picker', slug: 'components/time-picker' },
            { label: 'Checkbox', slug: 'components/checkbox' },
            { label: 'Form', slug: 'components/form' },
            { label: 'Inline edit', slug: 'components/inline-edit' },
            { label: 'Toggle', slug: 'components/toggle' },
            { label: 'Select', slug: 'components/select' },
            { label: 'Radio', slug: 'components/radio' },
            { label: 'Range', slug: 'components/range' }
          ]
        },
        {
          label: 'Feedback',
          items: [
            { label: 'Badge', slug: 'components/badge' },
            { label: 'Lozenge', slug: 'components/lozenge' },
            { label: 'Spinner', slug: 'components/spinner' },
            { label: 'Skeleton', slug: 'components/skeleton' },
            { label: 'Progress bar', slug: 'components/progress-bar' },
            {
              label: 'Progress indicator',
              slug: 'components/progress-indicator'
            },
            { label: 'Progress tracker', slug: 'components/progress-tracker' },
            { label: 'Section message', slug: 'components/section-message' },
            { label: 'Banner', slug: 'components/banner' },
            { label: 'Flag', slug: 'components/flag' },
            { label: 'Flag group', slug: 'components/flag-group' },
            { label: 'Spotlight', slug: 'components/spotlight' },
            { label: 'Inline message', slug: 'components/inline-message' },
            { label: 'Empty state', slug: 'components/empty-state' },
            { label: 'Visually hidden', slug: 'components/visually-hidden' }
          ]
        },
        {
          label: 'Navigation',
          items: [
            { label: 'Tabs', slug: 'components/tabs' },
            { label: 'Breadcrumbs', slug: 'components/breadcrumbs' },
            { label: 'Pagination', slug: 'components/pagination' },
            { label: 'Page', slug: 'components/page' },
            { label: 'Page header', slug: 'components/page-header' },
            { label: 'Panel', slug: 'components/panel' },
            { label: 'Side nav', slug: 'components/side-nav' }
          ]
        },
        {
          label: 'Overlays',
          items: [
            { label: 'Blanket', slug: 'components/blanket' },
            { label: 'Tooltip', slug: 'components/tooltip' },
            { label: 'Modal', slug: 'components/modal' },
            { label: 'Popup', slug: 'components/popup' },
            { label: 'Inline dialog', slug: 'components/inline-dialog' },
            { label: 'Drawer', slug: 'components/drawer' },
            { label: 'Menu', slug: 'components/menu' }
          ]
        },
        {
          label: 'Data display',
          items: [
            { label: 'Code', slug: 'components/code' },
            { label: 'Comment', slug: 'components/comment' },
            { label: 'Date label', slug: 'components/date-label' },
            { label: 'Table', slug: 'components/table' },
            { label: 'Dynamic table', slug: 'components/dynamic-table' },
            { label: 'Table tree', slug: 'components/table-tree' },
            { label: 'Tag', slug: 'components/tag' },
            { label: 'Tag group', slug: 'components/tag-group' }
          ]
        },
        {
          label: 'Media',
          items: [
            { label: 'Icon', slug: 'components/icon' },
            { label: 'Image', slug: 'components/image' },
            { label: 'Tile', slug: 'components/tile' },
            { label: 'Logo', slug: 'components/logo' },
            { label: 'Object', slug: 'components/object' },
            { label: 'Avatar', slug: 'components/avatar' },
            { label: 'Avatar group', slug: 'components/avatar-group' }
          ]
        },
        {
          label: 'Foundations',
          items: [{ label: 'Flex', slug: 'components/flex' }]
        },
        {
          label: 'Patterns',
          items: [{ label: 'Overview', slug: 'patterns/overview' }]
        },
        {
          label: 'Accessibility',
          items: [{ label: 'Definition of done', slug: 'accessibility/dod' }]
        },
        {
          label: 'Contributing',
          items: [
            { label: 'Component DoD', slug: 'contributing/component-dod' },
            { label: 'Forking', slug: 'contributing/forking' },
            { label: 'v1 slice', slug: 'contributing/v1-slice' },
            { label: 'Phase 3 slice', slug: 'contributing/phase-3-slice' },
            { label: 'Phase 4 slice', slug: 'contributing/phase-4-slice' },
            { label: 'Phase 5 slice', slug: 'contributing/phase-5-slice' },
            { label: 'Phase 6 slice', slug: 'contributing/phase-6-slice' },
            { label: 'Phase 8 slice', slug: 'contributing/phase-8-slice' }
          ]
        }
      ]
    })
  ]
})
