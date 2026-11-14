import { describe, expect, it } from 'vitest'
import { isPlain } from './appearance.js'

describe('isPlain', () => {
  it('detects plain appearance', () => {
    expect(isPlain('plain')).toBe(true)
    expect(isPlain('default')).toBe(false)
    expect(isPlain(undefined)).toBe(false)
  })
})
