/**
 * Pond VRT breakpoints — widths locked for baselines and CI.
 * Heights are stable chrome sizes for the test iframe (not content breakpoints).
 */
export const VRT_VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 }
] as const

export type VrtViewport = (typeof VRT_VIEWPORTS)[number]
export type VrtViewportName = VrtViewport['name']
