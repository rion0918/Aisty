import React from 'react';
import { Text as ChakraText, TextProps } from '@chakra-ui/react';

export const Text = (props: TextProps) => {
  return <ChakraText {...props} />;
};

export type { TextProps };

