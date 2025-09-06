import type { StorybookConfig } from '@storybook/nextjs';
import { mergeConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react-swc';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  docs: {},
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [react()],
      define: {
        'process.env': {},
      },
      optimizeDeps: {
        include: ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
      },
      resolve: {
        alias: {
          '@clerk/nextjs': path.resolve(process.cwd(), '.storybook/mocks/clerk.tsx'),
        },
      },
    });
  },
};

export default config;
