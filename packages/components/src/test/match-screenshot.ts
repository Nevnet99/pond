import { expect } from 'vitest'
import { page } from 'vitest/browser'
import { VRT_VIEWPORTS, type VrtViewport } from './viewports.js'

type ScreenshotTarget = Parameters<typeof expect.element>[0]

/**
 * Assert a screenshot at every Pond breakpoint (375 / 768 / 1280).
 * Baselines are named `{baseName}-{mobile|tablet|desktop}`.
 */
export async function matchScreenshotAtViewports(
  baseName: string,
  target: ScreenshotTarget,
  viewports: readonly VrtViewport[] = VRT_VIEWPORTS
): Promise<void> {
  for (const vp of viewports) {
    await page.viewport(vp.width, vp.height)
    await expect.element(target).toMatchScreenshot(`${baseName}-${vp.name}`)
  }
}
