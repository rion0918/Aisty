import type { Preview } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import '../src/app/globals.css';

// Ensure `process` exists in the browser for Next internals that read process.env
if (typeof window !== 'undefined' && !(window as any).process) {
  (window as any).process = { env: {} } as any;
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;
