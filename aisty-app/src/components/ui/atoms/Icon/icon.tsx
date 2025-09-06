import React from 'react';
import { Icon as ChakraIcon, IconProps, forwardRef } from '@chakra-ui/react';

// Keep Chakra's polymorphic typing so `as={...}` works (e.g., react-icons)
export const Icon = forwardRef<IconProps, 'svg'>((props, ref) => (
  <ChakraIcon ref={ref} {...props} />
));

Icon.displayName = 'Icon';

export type { IconProps };
