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
          label: 'Components',
          items: [
            { label: 'Button', slug: 'components/button' },
            { label: 'Link', slug: 'components/link' },
            { label: 'Text field', slug: 'components/text-field' },
            { label: 'Text area', slug: 'components/text-area' },
            { label: 'Checkbox', slug: 'components/checkbox' },
            { label: 'Toggle', slug: 'components/toggle' },
            { label: 'Select', slug: 'components/select' }
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
            { label: 'v1 slice', slug: 'contributing/v1-slice' }
          ]
        }
      ]
    })
  ]
})
