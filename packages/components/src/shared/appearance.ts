export type PondAppearance = 'default' | 'plain'

export function isPlain(appearance: PondAppearance | undefined): boolean {
  return appearance === 'plain'
}
