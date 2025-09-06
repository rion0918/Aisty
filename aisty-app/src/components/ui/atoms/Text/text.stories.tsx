import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  args: {
    children: '本文テキスト',
    color: 'gray.700',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Basic: Story = {};

