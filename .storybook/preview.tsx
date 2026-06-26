import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import './global.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
        'light-glass': 'light-glass',
        'dark-glass': 'dark-glass'
      },
      defaultTheme: 'light',
      attributeName: 'data-theme'
    }),
    (Story) => (
      <div className="min-h-screen bg-background text-foreground">
        <Story />
      </div>
    )
  ]
};

export default preview;
