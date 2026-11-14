/** Space scale steps that map to `--pond-space-*` tokens. */
export type PondSpace = '0' | '1' | '2' | '3' | '4' | '6' | '8'

export const pondSpaceCss = (step: PondSpace): string =>
  step === '0' ? '0' : `var(--pond-space-${step})`
