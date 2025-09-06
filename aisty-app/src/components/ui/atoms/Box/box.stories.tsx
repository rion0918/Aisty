import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './box';

const meta: Meta<typeof Box> = {
  title: 'Atoms/Box',
  component: Box,
  args: {
    p: 4,
    bg: 'gray.100',
    children: 'Box',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Basic: Story = {};

