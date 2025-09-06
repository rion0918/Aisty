import React from 'react';
import { Icon as ChakraIcon, IconProps } from '@chakra-ui/react';

export const Icon = (props: IconProps) => {
  return <ChakraIcon {...props} />;
};

export type { IconProps };

