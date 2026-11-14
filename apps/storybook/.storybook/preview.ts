import type { Preview } from '@storybook/web-components-vite'
import '../../../packages/tokens/css/plain.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Pond color theme',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: 'light'
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme ?? 'light'
      document.documentElement.setAttribute('data-theme', theme)
      document.body.style.background = 'var(--pond-color-bg-canvas, #fff)'
      document.body.style.color = 'var(--pond-color-fg-default, #111)'
      document.body.style.fontFamily = 'var(--pond-font-family-sans, system-ui)'
      document.body.style.padding = '1.5rem'
      return story()
    }
  ],
  parameters: {
    layout: 'centered',
    a11y: {
      test: 'error'
    }
  }
}

export default preview
