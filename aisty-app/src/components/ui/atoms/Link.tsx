import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props extends LinkProps {
  href: string;
}

export const Link = ({ href, ...props }: Props) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props} />
    </NextLink>
  );
};
