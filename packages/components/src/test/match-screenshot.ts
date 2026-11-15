import { expect } from 'vitest'
import { page } from 'vitest/browser'
import { VRT_VIEWPORTS, type VrtViewport } from './viewports.js'

type ScreenshotTarget = Parameters<typeof expect.element>[0]

/**
 * Assert a screenshot at every Pond breakpoint (375 / 768 / 1280).
 * Baselines are named `{baseName}-{mobile|tablet|desktop}`.
 *
 * Continues after a viewport mismatch so one CI run can emit reference
 * attachments for every missing/failing breakpoint.
 */
export async function matchScreenshotAtViewports(
  baseName: string,
  target: ScreenshotTarget,
  viewports: readonly VrtViewport[] = VRT_VIEWPORTS
): Promise<void> {
  const errors: unknown[] = []
  for (const vp of viewports) {
    await page.viewport(vp.width, vp.height)
    try {
      await expect.element(target).toMatchScreenshot(`${baseName}-${vp.name}`)
    } catch (error) {
      errors.push(error)
    }
  }
  if (errors.length === 1) throw errors[0]
  if (errors.length > 1) {
    throw new AggregateError(
      errors,
      `Screenshot mismatches for ${baseName} (${errors.length} viewports)`
    )
  }
}
