import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/web-components-vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '../../..')

const config: StorybookConfig = {
  stories: [join(root, 'packages/components/src/**/*.stories.ts')],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  async viteFinal(config) {
    config.resolve ??= {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pond/tokens/plain.css': join(root, 'packages/tokens/css/plain.css'),
      '@pond/tokens': join(root, 'packages/tokens/css/plain.css')
    }
    return config
  }
}

export default config
