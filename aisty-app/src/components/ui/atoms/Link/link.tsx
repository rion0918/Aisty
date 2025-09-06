import React from 'react';
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props extends LinkProps {
  href: string;
}

export const Link = ({ href, ...props }: Props) => {
  return (
    <ChakraLink as={NextLink} href={href} {...props} />
  );
};

export type { LinkProps };

