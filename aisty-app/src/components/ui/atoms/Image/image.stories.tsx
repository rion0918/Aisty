import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './image';

const meta: Meta<typeof Image> = {
  title: 'Atoms/Image',
  component: Image,
  args: {
    src: '/images/image.png',
    alt: 'Sample',
    boxSize: '80px',
    borderRadius: 'md',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Basic: Story = {};

