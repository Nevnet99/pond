/** Pond type scale steps (maps to `--pond-font-size-*`). */
export type PondTypeSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'

/** Default visual size for each heading level (semantics stay on `level`). */
export const headingLevelSize: Record<1 | 2 | 3 | 4 | 5 | 6, PondTypeSize> = {
  1: '5xl',
  2: '4xl',
  3: '3xl',
  4: '2xl',
  5: 'xl',
  6: 'lg'
}
