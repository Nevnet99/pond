const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function getFocusable(root: ParentNode): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement
  )
}

/** Cycle Tab within the given focusable list. Call from a keydown handler. */
export function cycleTab(
  event: KeyboardEvent,
  nodes: HTMLElement[],
  fallback?: HTMLElement
) {
  if (event.key !== 'Tab' || nodes.length === 0) {
    if (event.key === 'Tab' && nodes.length === 0 && fallback) {
      event.preventDefault()
      fallback.focus()
    }
    return
  }
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  const active = document.activeElement as HTMLElement | null
  if (event.shiftKey) {
    if (!active || active === first || !nodes.includes(active)) {
      event.preventDefault()
      last.focus()
    }
  } else if (!active || active === last || !nodes.includes(active)) {
    event.preventDefault()
    first.focus()
  }
}
