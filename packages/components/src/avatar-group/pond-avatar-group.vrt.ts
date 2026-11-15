import { fixture, html } from '@open-wc/testing-helpers'
import { afterEach, beforeEach, describe, it } from 'vitest'
import { matchScreenshotAtViewports } from '../test/match-screenshot.js'
import '../avatar/pond-avatar.js'
import './pond-avatar-group.js'
import type { PondAvatarGroup } from './pond-avatar-group.js'

const tokenHref = new URL('../../../tokens/css/plain.css', import.meta.url).href
describe('pond-avatar-group visual', () => {
  let link: HTMLLinkElement
  beforeEach(() => {
    link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = tokenHref
    document.head.append(link)
    document.documentElement.setAttribute('data-theme', 'light')
  })
  afterEach(() => link.remove())
  it('matches at mobile / tablet / desktop', async () => {
    const el =
      await fixture<PondAvatarGroup>(html`<pond-avatar-group label="Team">
      <pond-avatar initials="AB"></pond-avatar>
      <pond-avatar initials="CD"></pond-avatar>
      <pond-avatar initials="EF"></pond-avatar>
    </pond-avatar-group>`)
    await matchScreenshotAtViewports('avatar-group-default', el)
  })
})
