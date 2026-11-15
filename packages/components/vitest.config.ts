import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  optimizeDeps: {
    include: [
      'lit',
      'lit/decorators.js',
      'lit/directives/if-defined.js',
      'axe-core'
    ]
  },
  test: {
    name: 'components',
    include: ['src/**/*.test.ts'],
    globals: true,
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium', name: 'chromium' }],
      headless: true
    }
  }
})
