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
            { label: 'Checkbox', slug: 'components/checkbox' },
            { label: 'Toggle', slug: 'components/toggle' },
            { label: 'Select', slug: 'components/select' },
            { label: 'Radio', slug: 'components/radio' }
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
            { label: 'Section message', slug: 'components/section-message' },
            { label: 'Banner', slug: 'components/banner' },
            { label: 'Flag', slug: 'components/flag' },
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
            { label: 'Page header', slug: 'components/page-header' }
          ]
        },
        {
          label: 'Overlays',
          items: [
            { label: 'Tooltip', slug: 'components/tooltip' },
            { label: 'Modal', slug: 'components/modal' },
            { label: 'Menu', slug: 'components/menu' }
          ]
        },
        {
          label: 'Data display',
          items: [
            { label: 'Table', slug: 'components/table' },
            { label: 'Tag', slug: 'components/tag' }
          ]
        },
        {
          label: 'Media',
          items: [
            { label: 'Icon', slug: 'components/icon' },
            { label: 'Avatar', slug: 'components/avatar' }
          ]
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
            { label: 'Phase 5 slice', slug: 'contributing/phase-5-slice' }
          ]
        }
      ]
    })
  ]
})
