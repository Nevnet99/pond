import starlight from '@astrojs/starlight'
import { defineConfig, passthroughImageService } from 'astro/config'

export default defineConfig({
  site: 'https://nevnet99.github.io/pond',
  image: {
    service: passthroughImageService()
  },
  integrations: [
    starlight({
      title: 'Pond',
      description: 'Fork-first Lit design system — WCAG AA, brandable tokens.',
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
          items: [{ label: 'Tokens & themes', slug: 'theming/tokens' }]
        },
        {
          label: 'Primitives',
          items: [
            { label: 'Text', slug: 'primitives/text' },
            { label: 'Heading', slug: 'primitives/heading' }
          ]
        },
        {
          label: 'Components',
          items: [{ label: 'Button', slug: 'components/button' }]
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
