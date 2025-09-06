import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./link";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
  args: {
    href: "/sign-in",
    children: "サインインへ",
    color: "teal.500",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Basic: Story = {};
