import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

/**
 * VRT config. Breakpoints (375 / 768 / 1280) are applied per assertion via
 * `matchScreenshotAtViewports` — see `src/test/viewports.ts`.
 * Default instance viewport is desktop; tests resize before each shot.
 */
export default defineConfig({
  test: {
    name: 'vrt',
    include: ['src/**/*.vrt.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      screenshotFailures: true,
      instances: [
        {
          browser: 'chromium',
          name: 'chromium',
          viewport: { width: 1280, height: 720 }
        }
      ],
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            threshold: 0.2,
            allowedMismatchedPixelRatio: 0.01
          }
        }
      }
    }
  }
})
