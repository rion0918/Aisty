import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { HStack, VStack } from "@chakra-ui/react";
import { FiZap, FiArrowRight } from "react-icons/fi";
import NextLink from "next/link";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "ボタン",
    colorScheme: "teal",
    variant: "solid",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost", "link"],
    },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    colorScheme: {
      control: "select",
      options: ["teal", "blue", "purple", "red", "green", "gray"],
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Sizes: Story = {
  render: (args) => (
    <HStack spacing={4}>
      <Button {...args} size="xs">
        XS
      </Button>
      <Button {...args} size="sm">
        SM
      </Button>
      <Button {...args} size="md">
        MD
      </Button>
      <Button {...args} size="lg">
        LG
      </Button>
    </HStack>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <HStack spacing={4}>
      <Button {...args} leftIcon={<FiZap size={16} />}>
        左アイコン
      </Button>
      <Button {...args} rightIcon={<FiArrowRight size={16} />}>
        右アイコン
      </Button>
    </HStack>
  ),
};

export const AsNextLink: Story = {
  render: () => (
    <VStack align="stretch" spacing={4}>
      <Button as={NextLink} href="/sign-in" colorScheme="teal">
        サインインへ
      </Button>
      <Button as={NextLink} href="/sign-up" variant="outline">
        サインアップへ
      </Button>
    </VStack>
  ),
  parameters: { controls: { disable: true } },
};
