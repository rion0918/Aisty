import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./icon";
import { HStack } from "@chakra-ui/react";
import { FiZap, FiCamera, FiHeart } from "react-icons/fi";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  args: {
    as: FiZap,
    boxSize: 6,
    color: "teal.400",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Basic: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <HStack spacing={4}>
      <Icon {...args} boxSize={4} />
      <Icon {...args} boxSize={6} />
      <Icon {...args} boxSize={8} />
      <Icon {...args} boxSize={10} />
    </HStack>
  ),
};

export const Variants: Story = {
  render: () => (
    <HStack spacing={6}>
      <Icon as={FiZap} boxSize={8} color="teal.400" />
      <Icon as={FiCamera} boxSize={8} color="purple.400" />
      <Icon as={FiHeart} boxSize={8} color="red.400" />
    </HStack>
  ),
  parameters: { controls: { disable: true } },
};
